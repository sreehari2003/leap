import { useState } from "react";
import "./App.css";
import { NewTodo } from "./components/NewTodo";
import { useTask } from "./hooks/useTask";
import { IconDelete } from "./components/Delete";
import { useDelete } from "./hooks/useDelete";
import { IconTickCircle } from "./components/Complete";

function App() {
  const [newTodoOpen, setOpen] = useState(false);
  const { isLoading, data, setTask } = useTask();
  const { deleteTask } = useDelete();

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
        {newTodoOpen && <NewTodo cancelTodo={setOpen} setTodo={setTask} />}
        <section>
          <h4 className="sub-head">Todos</h4>
          <div className="todo-list">
            {data.length &&
              data.map((el) => (
                <div key={el.todoId} className="list">
                  <div className="title">
                    <h3>{el.todoTitle}</h3>
                    <div className="icons">
                      <IconDelete
                        onClick={() => deleteTask(el.todoId)}
                        className="delete"
                      />
                      <IconTickCircle className="tick" />
                    </div>
                  </div>
                  <p>{el.todoDescription}</p>
                </div>
              ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
