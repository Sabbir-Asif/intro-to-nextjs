import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { useDeleteTask, useUpdateTask } from '@/hooks/useTaskMutations';

interface TaskProps {
  id: number;
  name: string;
  status: 'pending' | 'done' | 'todo';
}

const Task: React.FC<TaskProps> = ({ id, name, status }) => {
  const deleteTask = useDeleteTask();
  const updateTask = useUpdateTask();

  const [currentStatus, setCurrentStatus] = useState<TaskProps['status']>(status);

  useEffect(() => {
    setCurrentStatus(status);
  }, [status]);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as TaskProps['status'];
    setCurrentStatus(newStatus);
    updateTask.mutate(
      { id, status: newStatus },
      {
        onError: () => {
          setCurrentStatus(status);
        },
      }
    );
  };

  const statusClass = clsx('px-2 py-1 rounded font-semibold text-white', {
    'bg-yellow-500': currentStatus === 'pending',
    'bg-green-600': currentStatus === 'done',
    'bg-blue-500': currentStatus === 'todo',
  });

  return (
    <div className="flex items-center justify-between p-4 border rounded shadow-sm mb-2">
      <div className="flex items-center gap-2">
        <span className="text-lg font-medium">{name}</span>
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
        onClick={() => deleteTask.mutate(id)}
        className="text-red-600 hover:underline disabled:opacity-50"
        disabled={deleteTask.isPending}
      >
        {deleteTask.isPending ? 'Deleting...' : 'Delete'}
      </button>
    </div>
  );
};

export default Task;
