import { useState } from "react";
import { IconTickCircle } from "./Complete";
import { IconDelete } from "./Delete";
import { IconEdit } from "./Edit";
import { NewTodo } from "./NewTodo";
import { Task as TaskType } from "../types";
import { toast } from "sonner";
import { END_POINT } from "../constanst";

export const Task = ({
  id,
  title,
  description,
  deleteTask,
  endDate,
  updateTodo,
  getTodo,
}: Prop) => {
  const [isEditable, setEdiatble] = useState(false);

  const setAsComplete = async () => {
    try {
      await fetch(END_POINT + `/tasks/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          todoId: id,
          complete: true,
          todoTitle: title,
          todoDescription: description,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast.success("task completed successfully");
      getTodo();
    } catch {
      toast.error("failed to update task");
    }
  };

  return (
    <div key={id} className="list">
      <div className="title">
        {!isEditable && (
          <>
            <h3>{title}</h3>
            <div className="icons">
              <IconDelete onClick={() => deleteTask(id)} className="delete" />
              <IconTickCircle className="tick" onClick={setAsComplete} />
              <IconEdit className="edit" onClick={() => setEdiatble(true)} />
            </div>
          </>
        )}
      </div>
      <p className={isEditable ? "hidden" : ""}>{description}</p>

      {isEditable && (
        <NewTodo
          setTodo={() => {}}
          cancelTodo={setEdiatble}
          defaultValue={{
            todoTitle: title,
            todoDescription: description,
            todoId: id,
            todoDate: endDate,
          }}
          key={id}
          updateTodo={updateTodo}
        />
      )}
    </div>
  );
};

interface Prop {
  title: string;
  description: string;
  id: number;
  endDate: Date;
  deleteTask: (id: number) => Promise<void>;
  updateTodo: (id: number, updatedTaskProperties: TaskType) => void;
  getTodo: () => Promise<void>;
}
