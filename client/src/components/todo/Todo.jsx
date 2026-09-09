"use client"
import { useEffect, useState } from "react";
function Todo() {
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
  <main className="min-h-screen bg-[#0A0A0A] px-4 py-12 font-sans text-stone-200 antialiased selection:bg-white selection:text-black">
    {/* Main Container */}
    <div className="relative mx-auto max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-[#121212] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-xl sm:p-10">
      
      {/* Header */}
      <header className="mb-10 border-b border-white/10 pb-6">
        <div className="mb-4 flex items-center justify-between">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1 text-[10px] font-semibold tracking-widest text-stone-300 uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
            WORKSPACE
          </span>
          <span className="font-serif text-xs italic tracking-wider text-stone-400">
            {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
        </div>

        <h1 className="font-serif text-3xl font-light tracking-wide text-white sm:text-4xl">
          Journal of Tasks
        </h1>
        <p className="mt-1 text-xs tracking-widest text-stone-400 uppercase">
          Curate & Master Your Priorities
        </p>
      </header>

      {/* Input Section */}
      <section className="mb-10 rounded-2xl border border-white/10 bg-[#181818] p-4 sm:p-5">
        <label className="mb-2 block font-serif text-[11px] tracking-widest text-stone-300 uppercase">
          {editingId === null ? "New Entry" : "Modify Entry"}
        </label>

        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            placeholder="What requires your attention?"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            className="flex-1 rounded-xl border border-white/10 bg-[#0A0A0A] px-4 py-3 text-sm text-white placeholder-stone-500 outline-none transition-all duration-300 focus:border-white focus:ring-1 focus:ring-white"
          />

          <button
            onClick={editingId === null ? addTodo : updateTodo}
            className="shrink-0 rounded-xl bg-white px-6 py-3 text-xs font-semibold tracking-wider text-black uppercase transition-all duration-300 hover:bg-stone-200 active:scale-95 shadow-md font-sans"
          >
            {editingId === null ? "Add Task" : "Save Changes"}
          </button>
        </div>
      </section>

      {/* Task List */}
      <section className="mb-8">
        <div className="mb-4 flex items-center justify-between px-1">
          <h2 className="font-serif text-xs font-medium tracking-widest text-stone-400 uppercase">
            Task Overview
          </h2>
          <span className="rounded-full border border-white/10 bg-[#181818] px-3 py-0.5 text-xs font-mono text-stone-300">
            {todos.length} {todos.length === 1 ? 'item' : 'items'}
          </span>
        </div>

        {/* List Items */}
        <ul className="flex flex-col gap-3">
          {todos.map((item, index) => (
            <li
              key={item._id}
              className="group flex flex-col justify-between gap-4 rounded-xl border border-white/10 bg-[#181818] p-4 transition-all duration-300 hover:border-white/30 hover:bg-[#202020] sm:flex-row sm:items-center"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-[#0A0A0A] font-mono text-xs font-bold text-stone-300">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="break-words text-sm font-light text-stone-200 transition-colors group-hover:text-white">
                  {item.title}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex shrink-0 items-center gap-2 self-end sm:self-auto">
                <button
                  onClick={() => editTodo(item)}
                  className="rounded-lg border border-white/10 bg-[#0A0A0A] px-3.5 py-1.5 text-xs font-medium text-stone-300 transition-all duration-200 hover:border-white hover:bg-white hover:text-black active:scale-95"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteTodo(item._id)}
                  className="rounded-lg border border-white/10 bg-[#0A0A0A] px-3.5 py-1.5 text-xs font-medium text-stone-400 transition-all duration-200 hover:border-stone-400 hover:bg-stone-800 hover:text-white active:scale-95"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>

        {/* Empty State */}
        {todos.length === 0 && (
          <div className="rounded-2xl border border-dashed border-white/10 bg-[#181818]/50 py-14 text-center">
            <p className="font-serif text-base text-stone-400 italic">
              Your task ledger is clear.
            </p>
            <p className="mt-1 text-xs tracking-wide text-stone-500 uppercase">
              Add a task above to begin.
            </p>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 pt-4 text-center font-serif text-xs italic text-stone-500">
        Executive Task Manager • {todos.length} pending
      </footer>

    </div>
  </main>
);
}
export default Todo;