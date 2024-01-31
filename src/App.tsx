import { useCallback, useMemo, useState } from "react";
import "./App.css";
import { NewTodo } from "./components/NewTodo";
import { useTask } from "./hooks/useTask";
import { useDelete } from "./hooks/useDelete";
import type { Task } from "./types";
import { Task as TaskList } from "./components/Task";

function App() {
  const [newTodoOpen, setOpen] = useState(false);
  const { isLoading, data, setTask, removeTodo, updateTodo, getTodo } =
    useTask();
  const { deleteTask } = useDelete(removeTodo);

  const handleUpdate = useCallback((info: Task) => {
    setTask((prev) => [...prev, info]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const listIsEmpty = useMemo(() => {
    return !data.length || data.every((el) => el.complete);
  }, [data]);

  if (isLoading) {
    return (
      <div className="container">
        <main className="main">
          <h3>Loading</h3>
        </main>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Task App</h1>
      <main className="main">
        {!newTodoOpen && (
          <button className="btn btn-primary" onClick={() => setOpen(true)}>
            New Task
          </button>
        )}
        {newTodoOpen && <NewTodo cancelTodo={setOpen} setTodo={handleUpdate} />}
        <section>
          {!listIsEmpty && <h4 className="sub-head">Todos</h4>}
          <div className="todo-list">
            {data.length &&
              data.map((el) => {
                if (!el.complete) {
                  return (
                    <TaskList
                      title={el.todoTitle}
                      description={el.todoDescription}
                      id={el.todoId}
                      endDate={el.todoDate}
                      deleteTask={deleteTask}
                      key={el.todoId}
                      updateTodo={updateTodo}
                      getTodo={getTodo}
                    />
                  );
                }
              })}
            {listIsEmpty && <h4>No task left</h4>}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
