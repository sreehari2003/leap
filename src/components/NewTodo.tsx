import { ElementRef, useRef } from "react";
import { END_POINT } from "../constanst";
import { toast } from "sonner";
import { Task } from "../types";

type NewTod = {
  cancelTodo: React.Dispatch<boolean>;
  setTodo: (data: Task) => void;
  defaultValue?: Omit<Task, "updateDate" | "creationDate" | "complete">;
  updateTodo?: (id: number, updatedTaskProperties: Task) => void;
};

export const NewTodo = ({
  cancelTodo,
  setTodo,
  defaultValue,
  updateTodo,
}: NewTod) => {
  const titleRef = useRef<ElementRef<"input">>(null);
  const descRef = useRef<ElementRef<"input">>(null);
  const dateRef = useRef<ElementRef<"input">>(null);

  const btntext = defaultValue ? "Update" : "Add";

  const addOrUpdate = () => {
    if (defaultValue) {
      // means update
      handleUpdate();
    } else {
      handleAdd();
    }
  };

  const handleUpdate = async () => {
    if (
      !titleRef.current?.value.length ||
      !descRef.current?.value.length ||
      !dateRef.current?.value.length
    ) {
      toast.warning("please fill all the fields");
      return;
    } else {
      try {
        const data = {
          todoTitle: titleRef.current?.value,
          todoDescription: descRef.current?.value,
          todoDate: dateRef.current?.value,
          complete: false,
        };

        const res = await fetch(END_POINT + `/tasks/${defaultValue?.todoId}`, {
          method: "PUT",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },

          //
        });
        const r = await res.json();
        if (updateTodo) {
          updateTodo(defaultValue?.todoId as number, r.data);
        }
        toast.success("task updated successfully");
      } catch {
        toast.error("failed to update task");
      } finally {
        cancelTodo(false);
        titleRef.current.value = "";
        descRef.current.value = "";
        dateRef.current.value = "";
      }
    }
  };

  const handleAdd = async () => {
    if (
      !titleRef.current?.value.length ||
      !descRef.current?.value.length ||
      !dateRef.current?.value.length
    ) {
      toast.warning("please fill all the fields");
      return;
    } else {
      try {
        const data = {
          todoTitle: titleRef.current?.value,
          todoDescription: descRef.current?.value,
          todoDate: dateRef.current?.value,
          complete: false,
        };

        const res = await fetch(END_POINT + "/tasks", {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },

          //
        });
        const r = await res.json();
        setTodo(r.data);
        toast.success("task added successfully");
      } catch {
        toast.error("failed to create task");
      } finally {
        cancelTodo(false);
        titleRef.current.value = "";
        descRef.current.value = "";
        dateRef.current.value = "";
      }
    }
  };

  return (
    <div className="new-todo">
      <label htmlFor="title">title</label>
      <input
        type="text"
        id="title"
        placeholder="title"
        ref={titleRef}
        defaultValue={defaultValue?.todoTitle}
      />
      <label htmlFor="description">description</label>
      <input
        type="text"
        placeholder="description"
        id="description"
        defaultValue={defaultValue?.todoDescription}
        ref={descRef}
      />
      <label htmlFor="date">date</label>
      <input
        type="date"
        placeholder="date"
        ref={dateRef}
        defaultValue={
          defaultValue?.todoDate
            ? new Date(defaultValue.todoDate).toISOString().split("T")[0]
            : ""
        }
      />
      <div className="group">
        <button
          className="btn btn-primary submit"
          onClick={() => cancelTodo(false)}
        >
          Cancel
        </button>
        <button className="btn btn-primary submit" onClick={addOrUpdate}>
          {btntext}
        </button>
      </div>
    </div>
  );
};
