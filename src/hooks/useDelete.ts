import { END_POINT } from "../constanst";

export const useDelete = (removeTodo: RemoveTodo) => {
  const deleteTask = async (id: number) => {
    try {
      await fetch(END_POINT + `/tasks/${id}`, {
        method: "DELETE",
      });
      removeTodo(id);
    } catch {
      console.log("ERROR DELEETING");
    }
  };

  return { deleteTask };
};

type RemoveTodo = (id: number) => void;
