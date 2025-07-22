import Task from "./Task";
import type { Task as TaskType } from "@/app/board/modules/Task";
import { Droppable } from "@hello-pangea/dnd";

const Column: React.FC<{ name: string; tasks: TaskType[] }> = ({ name, tasks }) => {
  return (
    <Droppable droppableId={name}>
      {(provided) => (
        <div
          className="bg-gray-200 p-2 rounded-lg h-full"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <h2 className="text-xl font-bold mb-2">{name.toUpperCase()}</h2>
          <div className="space-y-2">
            {tasks
              ?.filter((task) => task.status === name)
              .map((task, index) => (
                <Task key={task.id} task={task} index={index} />
              ))}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
};

export default Column;
