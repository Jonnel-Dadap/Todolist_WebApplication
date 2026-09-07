"use client"
import { useEffect, useState } from "react";
function Home() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/todos")
      .then((response) => response.json())
      .then((data) => {
        setTodos(data);
      })
      .catch((error) => {
        console.log("Error fetching: ", error);
      });
  }, []);


  const addTodo = async () => {
    if (todo.trim() === "") return;

    try {
      const response = await fetch("http://localhost:5000/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: todo,
        }),
      });
      const data = await response.json();

      setTodos([...todos, data]);
      setTodo("");
    } catch (error) {
      consol.log("Error adding todo: ", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/todos/${id}`, {
        method: "DELETE",
      });
      setTodos(todos.filter((item) => item._id !== id));
    } catch (error) {
      console.log("Error deleting Todo: ", error);
    }
  };

  const editTodo = (item) => {
    setEditingId(item._id);
    setTodo(item.title);
  };

  const updateTodo = async () => {
    if (todo.trim() === "") return;

    try {
      const response = await fetch(`http://localhost:5000/api/todos/${editingId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: todo,
          }),
        }
      );
      const updateTodo = await response.json();

      if (response.ok) {
        setTodos((currentTodos) =>
          currentTodos.map((item) =>
            item._id === editingId ? updateTodo : item
          )
        );
        setTodo("");
        setEditingId(null);
      }
    } catch (error) {
      console.log("error updating TODO: ", error);
    }
  };

  return (
  <main className="min-h-screen bg-black px-4 py-12 font-sans text-white antialiased selection:bg-white selection:text-black">
    {/* Main Container */}
    <div className="mx-auto max-w-2xl rounded-3xl border border-white/10 bg-zinc-950 p-6 shadow-2xl backdrop-blur-xl sm:p-10">
      
      {/* Header */}
      <header className="mb-10 border-b border-white/10 pb-6">
        <div className="mb-3 flex items-center justify-between">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium tracking-wide text-zinc-400">
            <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
            WORKSPACE
          </span>
          <span className="text-xs font-medium text-zinc-500">
            {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
        </div>

        <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Tasks
        </h1>
        <p className="mt-1 text-sm text-zinc-400">
          Focus on what matters today.
        </p>
      </header>

      {/* New Task Input */}
      <section className="mb-8">
        <label className="mb-2 block text-xs font-medium tracking-wider text-zinc-400 uppercase">
          {editingId === null ? "New Task" : "Edit Task"}
        </label>

        <div className="flex flex-col gap-2.5 sm:flex-row">
          <input
            type="text"
            placeholder="What needs to be done?"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            className="flex-1 rounded-xl border border-white/10 bg-zinc-900/80 px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none transition-all duration-200 focus:border-white focus:bg-zinc-900 focus:ring-1 focus:ring-white"
          />

          <button
            onClick={editingId === null ? addTodo : updateTodo}
            className="rounded-xl bg-white px-6 py-3 text-sm font-medium text-black transition-all duration-200 hover:bg-zinc-200 active:scale-95 shrink-0"
          >
            {editingId === null ? "Add Task" : "Save Task"}
          </button>
        </div>
      </section>

      {/* Task List */}
      <section className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Overview
          </h2>
          <span className="rounded-full border border-white/10 bg-zinc-900 px-2.5 py-0.5 text-xs text-zinc-300">
            {todos.length} {todos.length === 1 ? 'task' : 'tasks'}
          </span>
        </div>

        {/* List Items */}
        <ul className="flex flex-col gap-2">
          {todos.map((item, index) => (
            <li
              key={item._id}
              className="group flex flex-col justify-between gap-3 rounded-2xl border border-white/5 bg-zinc-900/40 p-4 transition-all duration-200 hover:border-white/20 hover:bg-zinc-900/80 sm:flex-row sm:items-center"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-white/10 text-[11px] font-mono text-zinc-400">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="break-words text-sm font-medium text-zinc-200 group-hover:text-white">
                  {item.title}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex shrink-0 items-center gap-2 self-end sm:self-auto">
                <button
                  onClick={() => editTodo(item)}
                  className="rounded-lg border border-white/10 bg-transparent px-3 py-1.5 text-xs font-medium text-zinc-300 transition-all duration-200 hover:border-white/30 hover:bg-white/5 hover:text-white active:scale-95"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteTodo(item._id)}
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-zinc-400 transition-all duration-200 hover:border-white/20 hover:bg-white hover:text-black active:scale-95"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>

        {/* Empty State */}
        {todos.length === 0 && (
          <div className="rounded-2xl border border-dashed border-white/10 bg-zinc-900/20 py-12 text-center">
            <p className="text-sm font-medium text-zinc-300">
              No tasks for today
            </p>
            <p className="mt-1 text-xs text-zinc-500">
              Add a new task above to get started.
            </p>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 pt-4 text-center text-xs text-zinc-500">
        Minimal Task Manager • {todos.length} items remaining
      </footer>

    </div>
  </main>
);
}
export default Home;