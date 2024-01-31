import { END_POINT } from "../constanst";

export const useDelete = () => {
  const deleteTask = async (id: number) => {
    try {
      await fetch(END_POINT + `/tasks/${id}`, {
        method: "DELETE",
      });
    } catch {
      console.log("ERROR DELEETING");
    }
  };

  return { deleteTask };
};
