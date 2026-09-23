"use client";

import Image from "next/image";
import { Trash2, SquarePen } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function Todo() {
  const router = useRouter();

  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    fetch("http://localhost:5000/api/todos", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setTodos(data);
      })
      .catch((error) => {
        console.log("Error fetching: ", error);
      });
  }, [router]);

  const addTodo = async () => {
    if (todo.trim() === "") return;

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: todo,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setTodos([...todos, data]);
        setTodo("");
      }
    } catch (error) {
      console.log("Error adding todo: ", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/todos/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setTodos((currentTodos) =>
          currentTodos.filter((item) => item._id !== id)
        );
      }
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
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/todos/${editingId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: todo,
          }),
        }
      );

      const updatedTodo = await response.json();

      if (response.ok) {
        setTodos((currentTodos) =>
          currentTodos.map((item) =>
            item._id === editingId ? updatedTodo : item
          )
        );

        setTodo("");
        setEditingId(null);
      }
    } catch (error) {
      console.log("Error updating TODO: ", error);
    }
  };

  const toggleTodo = async (item) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/todos/${item._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            completed: !item.completed,
          }),
        }
      );

      const updatedTodo = await response.json();

      if (response.ok) {
        setTodos((currentTodos) =>
          currentTodos.map((todoItem) =>
            todoItem._id === item._id ? updatedTodo : todoItem
          )
        );
      }
    } catch (error) {
      console.log("Error updating task status: ", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  const completedCount = todos.filter(
    (item) => item.completed
  ).length;

  const remainingCount = todos.length - completedCount;

  const progress =
    todos.length > 0
      ? Math.round((completedCount / todos.length) * 100)
      : 0;

  return (
    <main className="min-h-screen bg-[#F5F6EE] px-4 py-8 text-gray-900 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <header className="mb-8 rounded-2xl border border-gray-200 bg-white px-5 py-4 shadow-sm sm:px-6">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            {/* Brand */}
            <div className="flex items-center gap-3">

              <Image
                src="/todolist logo.png"
                alt="Todo Post Logo"
                width={44}
                height={44}
                className="h-11 w-11 rounded-full object-contain"
              />

              <div>
                <h1 className="text-lg font-bold tracking-tight text-gray-900">
                  Todo Post
                </h1>

                <p className="text-xs text-gray-400">
                  Your personal task workspace
                </p>
              </div>

            </div>

            {/* Right Side */}
            <div className="flex items-center gap-3">

              <div className="hidden text-right sm:block">
                <p className="text-xs font-medium text-gray-400">
                  TODAY
                </p>

                <p className="text-sm font-semibold text-gray-700">
                  {new Date().toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>

              <button
                onClick={logout}
                className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 transition hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900 active:scale-95"
              >
                Logout
              </button>

            </div>

          </div>

        </header>


        {/* Welcome Section */}
        <section className="mb-8">

          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

            <div>

              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#A0AC00]/20 bg-[#A0AC00]/5 px-3 py-1.5">

                <span className="h-2 w-2 animate-pulse rounded-full bg-[#A0AC00]" />

                <span className="text-xs font-semibold tracking-wide text-[#8A9500]">
                  WORKSPACE
                </span>

              </div>

              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                My Tasks
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500 sm:text-base">
                Organize your tasks, track your progress, and stay focused
                on what matters today.
              </p>

            </div>

          </div>

        </section>


        {/* Stats */}
        <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">

          {/* Total */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">

            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Total Tasks
            </p>

            <p className="mt-2 text-3xl font-bold text-gray-900">
              {todos.length}
            </p>

          </div>


          {/* Completed */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">

            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Completed
            </p>

            <p className="mt-2 text-3xl font-bold text-[#8A9500]">
              {completedCount}
            </p>

          </div>


          {/* Remaining */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">

            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Remaining
            </p>

            <p className="mt-2 text-3xl font-bold text-gray-900">
              {remainingCount}
            </p>

          </div>

        </section>


        {/* Main Dashboard */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_300px]">


          {/* Task Section */}
          <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">

            {/* Section Header */}
            <div className="mb-5 flex items-center justify-between">

              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Task List
                </h3>

                <p className="mt-1 text-xs text-gray-400">
                  Manage your daily tasks
                </p>
              </div>

              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-500">
                {todos.length}{" "}
                {todos.length === 1 ? "task" : "tasks"}
              </span>

            </div>


            {/* Add / Edit Task */}
            <div className="mb-6 rounded-xl border border-gray-200 bg-gray-50 p-4">

              <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                {editingId === null ? "Add a new task" : "Edit task"}
              </label>

              <div className="flex flex-col gap-3 sm:flex-row">

                <input
                  type="text"
                  placeholder="What needs to be done?"
                  value={todo}
                  onChange={(e) => setTodo(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      editingId === null
                        ? addTodo()
                        : updateTodo();
                    }
                  }}
                  className="min-w-0 flex-1 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#A0AC00] focus:ring-2 focus:ring-[#A0AC00]/10"
                />

                <button
                  onClick={
                    editingId === null
                      ? addTodo
                      : updateTodo
                  }
                  className="rounded-lg bg-[#A0AC00] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#B0BF1B] hover:shadow-md active:scale-95"
                >
                  {editingId === null
                    ? "Add Task"
                    : "Save Changes"}
                </button>

              </div>

              {editingId !== null && (
                <button
                  onClick={() => {
                    setEditingId(null);
                    setTodo("");
                  }}
                  className="mt-3 text-xs font-medium text-gray-400 transition hover:text-gray-700"
                >
                  Cancel editing
                </button>
              )}

            </div>


            {/* Task List */}
            <div className="space-y-3">

              {todos.map((item, index) => (

                <div
                  key={item._id}
                  className="group flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 transition duration-200 hover:border-[#A0AC00]/30 hover:shadow-sm sm:flex-row sm:items-center sm:justify-between"
                >

                  {/* Task Info */}
                  <div className="flex min-w-0 items-center gap-3">

                    {/* Checkbox */}
                    <button
                      onClick={() => toggleTodo(item)}
                      aria-label={
                        item.completed
                          ? "Mark task as incomplete"
                          : "Mark task as complete"
                      }
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition ${item.completed
                        ? "border-[#A0AC00] bg-[#A0AC00] text-white"
                        : "border-gray-300 bg-white hover:border-[#A0AC00]"
                        }`}
                    >
                      {item.completed && (
                        <span className="text-xs font-bold">
                          ✓
                        </span>
                      )}
                    </button>


                    {/* Number */}
                    <span className="hidden h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gray-50 text-xs font-medium text-gray-400 sm:flex">
                      {String(index + 1).padStart(2, "0")}
                    </span>


                    {/* Title */}
                    <span
                      className={`break-words text-sm transition ${item.completed
                        ? "text-gray-400 line-through"
                        : "text-gray-700 group-hover:text-gray-900"
                        }`}
                    >
                      {item.title}
                    </span>

                  </div>


                  {/* Actions */}
                  <div className="flex shrink-0 items-center gap-2 self-end sm:self-auto">

                    <button
                      onClick={() => editTodo(item)}
                      aria-label="Edit task"
                      title="Edit task"
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-400 transition hover:border-[#A0AC00]/30 hover:bg-[#A0AC00]/10 hover:text-[#8A9500] active:scale-95"
                    >
                      <SquarePen size={16} />
                    </button>

                    <button
                      onClick={() => deleteTodo(item._id)}
                      aria-label="Delete task"
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-400 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 size={16} />
                    </button>

                  </div>

                </div>

              ))}


              {/* Empty State */}
              {todos.length === 0 && (

                <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 px-6 py-12 text-center">

                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#A0AC00]/10 text-xl font-bold text-[#8A9500]">
                    +
                  </div>

                  <h4 className="mt-4 text-sm font-semibold text-gray-700">
                    No tasks yet
                  </h4>

                  <p className="mt-1 text-xs text-gray-400">
                    Add your first task above to get started.
                  </p>

                </div>

              )}

            </div>

          </section>


          {/* Progress Sidebar */}
          <aside className="h-fit rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

            <div className="mb-6">

              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                Daily Progress
              </p>

              <div className="mt-2 flex items-end justify-between">

                <h3 className="text-3xl font-bold text-gray-900">
                  {progress}%
                </h3>

                <span className="text-xs text-gray-400">
                  completed
                </span>

              </div>

            </div>


            {/* Progress Bar */}
            <div className="h-2 overflow-hidden rounded-full bg-gray-100">

              <div
                className="h-full rounded-full bg-[#A0AC00] transition-all duration-500"
                style={{ width: `${progress}%` }}
              />

            </div>


            {/* Progress Message */}
            <div className="mt-6 rounded-xl bg-[#A0AC00]/5 p-4">

              <p className="text-sm font-medium text-gray-700">
                {todos.length === 0
                  ? "Ready when you are."
                  : progress === 100
                    ? "All tasks completed!"
                    : progress >= 50
                      ? "You're making good progress."
                      : "Keep going. One task at a time."}
              </p>

              <p className="mt-1 text-xs leading-5 text-gray-400">
                Stay focused and keep your tasks moving forward.
              </p>

            </div>


            {/* Summary */}
            <div className="mt-6 space-y-3 border-t border-gray-100 pt-5">

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">
                  Completed
                </span>

                <span className="font-medium text-gray-700">
                  {completedCount}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">
                  Remaining
                </span>

                <span className="font-medium text-gray-700">
                  {remainingCount}
                </span>
              </div>

            </div>

          </aside>

        </div>


        {/* Footer */}
        <footer className="mt-8 border-t border-gray-200 py-6 text-center">

          <p className="text-xs text-gray-400">
            Todo Post • Simple. Focused. Built for getting things done.
          </p>

        </footer>

      </div>

    </main>
  );
}

export default Todo;