import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { useDeleteTask, useUpdateTask } from '@/hooks/useTaskMutations';
import { Draggable } from "@hello-pangea/dnd";

interface TaskProps {
  task: {
    id: number;
    name: string;
    status: 'pending' | 'done' | 'todo';
  };
  index: number;
}

const Task: React.FC<TaskProps> = ({ task, index }) => {
  const deleteTask = useDeleteTask();
  const updateTask = useUpdateTask();

  const [currentStatus, setCurrentStatus] = useState(task.status);

  useEffect(() => {
    setCurrentStatus(task.status);
  }, [task.status]);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as typeof currentStatus;
    setCurrentStatus(newStatus);
    updateTask.mutate(
      { id: task.id, status: newStatus },
      {
        onError: () => setCurrentStatus(task.status),
      }
    );
  };

  const statusClass = clsx('px-2 py-1 rounded text-white text-sm', {
    'bg-yellow-500': currentStatus === 'pending',
    'bg-green-600': currentStatus === 'done',
    'bg-blue-500': currentStatus === 'todo',
    'bg-gray-400': updateTask.isPending,
  });

  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided) => (
        <div
          className="flex items-center justify-between p-4 border rounded shadow-sm bg-white"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="flex items-center gap-2">
            <span className="text-lg font-medium">{task.name}</span>
            <select
              value={currentStatus}
              onChange={handleStatusChange}
              className={statusClass}
              disabled={updateTask.isPending}
            >
              <option value="todo">Todo</option>
              <option value="pending">Pending</option>
              <option value="done">Done</option>
            </select>
            {updateTask.isPending && (
              <span className="text-xs text-gray-500 ml-1">(Updating...)</span>
            )}
          </div>

          <button
            onClick={() => deleteTask.mutate(task.id)}
            className="text-red-600 hover:underline disabled:opacity-50"
            disabled={deleteTask.isPending}
          >
            {deleteTask.isPending ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      )}
    </Draggable>
  );
};

export default Task;
