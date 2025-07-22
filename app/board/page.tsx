'use client'

import getData from "@/api/core/getData";
import AddTaskModal from "@/components/AddTaskModal";
import Column from "@/components/Column";
import { useModalStore } from "@/store/useModalStore";
import { useQuery } from "@tanstack/react-query";

const Page = () => {
    const { openModal, isAddModalOpen } = useModalStore()
    const {
        data: tasks,
    } = useQuery({
        queryKey: ['tasks'],
        queryFn: () => getData('/tasks?limit=10')
    })

    return (
        <div className="mt-4 border-1 min-h-[80vh] rounded-sm p-4">
            <button
            onClick={openModal}
                className="px-2 py-1 bg-gray-700 text-white rounded-md text-sm mb-2"
            >
                Add Task
            </button>
            <section className="grid grid-cols-3 gap-4 h-[70vh]">
                <Column name={'todo'} tasks={tasks?.data} />
                <Column name={'pending'} tasks={tasks?.data} />
                <Column name={'done'} tasks={tasks?.data} />
            </section>

            {
                isAddModalOpen && <AddTaskModal />
            }
        </div>
    );
};

export default Page;