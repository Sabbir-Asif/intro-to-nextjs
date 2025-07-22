import React from 'react';
import clsx from 'clsx';

interface TaskProps {
  name: string;
  status: 'pending' | 'done' | 'todo';
}

const Task: React.FC<TaskProps> = ({ name, status }) => {
  const statusClass = clsx(
    'px-4 py-2 rounded font-semibold',
    {
      'bg-yellow-500': status === 'pending',
      'bg-green-600': status === 'done',
      'bg-blue-500': status === 'todo',
    }
  );

  return (
    <div className="flex items-center justify-between p-4 border rounded shadow-sm mb-2">
      <span className="text-lg font-medium">{name}</span>
      <span className={statusClass}>{status}</span>
    </div>
  );
};

export default Task;
