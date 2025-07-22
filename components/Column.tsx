import { tasks } from "@/api/memory/tasks";
import Task from "./Task";


const Column: React.FC<{name: string}> = ({name}) => {
    return (
        <div className="bg-gray-200 p-2 rounded-lg h-full">
            <h2 className="text-xl font-bold mb-2">{name}</h2>
            <div className="">
                {
                    tasks.filter(task => task.status === name).map(task => <Task key={task.name} name={task.name} status={task.status} />)
                }
            </div>
        </div>
    );
};

export default Column;