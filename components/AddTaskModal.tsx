'use client';

import { useCreateTask } from '@/hooks/useTaskMutations';
import { useModalStore } from '@/store/useModalStore';
import { useState } from 'react';

const AddTaskModal = () => {
    const { closeModal } = useModalStore();
    const { mutate } = useCreateTask();
    const [name, setName] = useState('');
    const [status, setStatus] = useState<'todo'| 'done' | 'pending'>('todo');
    const [description, setDescription] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutate({ name, status, description });
        closeModal();
    };

    return (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-md z-20 flex justify-center items-center p-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-lg shadow-xl border border-gray-100 w-full max-w-md p-6 space-y-5"
            >
                <h2 className="text-lg font-medium text-gray-900 mb-6">Add new task</h2>

                <div className="space-y-4">
                    <input
                        type="text"
                        placeholder="Enter task name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors text-sm"
                        required
                    />

                    <input
                        type="text"
                        placeholder="Enter description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors text-sm"
                        required
                    />

                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value as 'todo' | 'done' | 'pending')}
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors text-sm bg-white"
                    >
                        <option value="todo">To Do</option>
                        <option value="pending">Pending</option>
                        <option value="done">Done</option>
                    </select>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                    <button
                        type="button"
                        onClick={closeModal}
                        className="px-2 py-1 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors"
                    >
                        Add Task
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddTaskModal;