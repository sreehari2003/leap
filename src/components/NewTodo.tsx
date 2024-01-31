import { ElementRef, useRef } from "react";
import { END_POINT } from "../constanst";
import { Task } from "../types";

export const NewTodo = ({ cancelTodo, setTodo }: NewTod) => {
  const titleRef = useRef<ElementRef<"input">>(null);
  const descRef = useRef<ElementRef<"input">>(null);
  const dateRef = useRef<ElementRef<"input">>(null);

  const handleAdd = async () => {
    if (
      !titleRef.current?.value.length ||
      !descRef.current?.value.length ||
      !dateRef.current?.value.length
    ) {
      console.log("FILL ALL INPUT");
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
      } catch {
        console.log("ERRROR");
      } finally {
        cancelTodo(false);
      }
    }
  };

  return (
    <div className="new-todo">
      <label htmlFor="title">title</label>
      <input type="text" id="title" placeholder="title" ref={titleRef} />
      <label htmlFor="description">description</label>
      <input
        type="text"
        placeholder="description"
        id="description"
        ref={descRef}
      />
      <label htmlFor="date">date</label>
      <input type="date" placeholder="date" ref={dateRef} />
      <div className="group">
        <button
          className="btn btn-primary submit"
          onClick={() => cancelTodo(false)}
        >
          Cancel
        </button>
        <button className="btn btn-primary submit" onClick={handleAdd}>
          Add
        </button>
      </div>
    </div>
  );
};

type NewTod = {
  cancelTodo: React.Dispatch<boolean>;
  setTodo: React.Dispatch<Task[]>;
};
