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
  <main className="min-h-screen bg-[#d8d0bd] px-4 py-10 font-serif text-black">

    {/* Main Newspaper */}
    <div className="mx-auto max-w-3xl border-4 border-black bg-[#f3ecd9] px-6 py-8 shadow-[10px_10px_0px_#000]">

      {/* Newspaper Header */}
      <header className="border-b-4 border-black pb-5 text-center">

        <p className="text-xs font-bold uppercase tracking-[0.35em]">
          EST. 2026 • DAILY EDITION
        </p>

        <h1 className="mt-2 text-5xl font-black uppercase tracking-tight sm:text-6xl">
          The Todo Post
        </h1>

        <div className="mt-3 flex items-center justify-between border-t-2 border-black pt-2 text-[10px] font-bold uppercase tracking-widest">
          <span>Task Management</span>
          <span>Vol. 01 • No. 01</span>
          <span>Digital Edition</span>
        </div>

      </header>


      {/* Headline */}
      <section className="border-b-2 border-black py-6 text-center">

        <p className="text-xs font-bold uppercase tracking-[0.25em]">
          Today's Tasks
        </p>

        <h2 className="mt-2 text-3xl font-black uppercase sm:text-4xl">
          Get Things Done.
        </h2>

        <p className="mx-auto mt-2 max-w-xl text-sm italic">
          A simple task manager for keeping track of what matters.
        </p>

      </section>


      {/* New Task */}
      <section className="border-b-2 border-black py-6">

        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-xl font-black uppercase">
            New Task
          </h3>

          <span className="text-xs font-bold uppercase">
            Write it down.
          </span>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">

          <input
            type="text"
            placeholder="Enter a new task..."
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            className="
              flex-1
              border-2 border-black
              bg-[#fffaf0]
              px-4 py-3
              font-sans
              text-sm
              font-bold
              outline-none
              placeholder:text-gray-500
              focus:bg-white
            "
          />

          <button
            onClick={editingId === null ? addTodo : updateTodo}
            className="
              border-2 border-black
              bg-black
              px-7 py-3
              font-sans
              text-sm
              font-black
              uppercase
              tracking-wider
              text-white
              transition-all
              hover:bg-white
              hover:text-black
            "
          >
            {editingId === null ? "Add Task" : "Save Task"}
          </button>

        </div>

      </section>


      {/* Task List */}
      <section className="py-6">

        <div className="mb-4 flex items-end justify-between border-b-4 border-black pb-2">

          <div>
            <p className="text-xs font-bold uppercase tracking-widest">
              Classified
            </p>

            <h3 className="text-3xl font-black uppercase">
              Task List
            </h3>
          </div>

          <p className="text-xs font-bold uppercase">
            Total: {todos.length}
          </p>

        </div>


        {/* Todos */}
        <ul>

          {todos.map((item, index) => (
            <li
              key={item._id}
              className="
                border-b-2
                border-black
                py-4
              "
            >

              <div className="flex items-start justify-between gap-4">

                {/* Number + Title */}
                <div className="flex min-w-0 gap-4">

                  <span className="text-xl font-black">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="break-words text-lg font-bold">
                    {item.title}
                  </span>

                </div>


                {/* Buttons */}
                <div className="flex shrink-0 gap-2">

                  <button
                    onClick={() => editTodo(item)}
                    className="
                      border-2 border-black
                      px-3 py-1
                      font-sans
                      text-xs
                      font-black
                      uppercase
                      transition-all
                      hover:bg-black
                      hover:text-white
                    "
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteTodo(item._id)}
                    className="
                      border-2 border-black
                      bg-black
                      px-3 py-1
                      font-sans
                      text-xs
                      font-black
                      uppercase
                      text-white
                      transition-all
                      hover:bg-white
                      hover:text-black
                    "
                  >
                    Delete
                  </button>

                </div>

              </div>

            </li>
          ))}

        </ul>


        {/* Empty State */}
        {todos.length === 0 && (
          <div className="border-2 border-dashed border-black py-12 text-center">

            <p className="text-2xl font-black uppercase">
              No Tasks Found
            </p>

            <p className="mt-2 text-sm italic">
              Your task list is currently empty.
            </p>

          </div>
        )}

      </section>


      {/* Newspaper Footer */}
      <footer className="border-t-4 border-black pt-4">

        <div className="flex flex-col justify-between gap-2 text-xs font-bold uppercase sm:flex-row">

          <span>
            The Todo Post
          </span>

          <span>
            {todos.length} Tasks • Database Connected
          </span>

          <span>
            © 2026
          </span>

        </div>

      </footer>

    </div>

  </main>
);
}
export default Home;