
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Check,
  CheckCircle2,
  Circle,
  ClipboardList,
  Clock3,
  ListTodo,
  LogOut,
  Plus,
  SquarePen,
  Trash2,
  X,
  Zap,
} from "lucide-react";
import TodoNavbar from "@/components/todo/TodoNavbar";

function Todo() {
  const router = useRouter();

  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [filter, setFilter] = useState("all");
  const [toast, setToast] = useState("");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    const fetchTodos = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/todos", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 401) {
          localStorage.removeItem("token");
          router.push("/login");
          return;
        }

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Unable to load tasks.");
        }

        setTodos(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setToast(error.message || "Unable to load tasks.");
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, [router]);

  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => setToast(""), 2800);
    return () => clearTimeout(timer);
  }, [toast]);

  const addTodo = async () => {
    if (!todo.trim() || saving) return;

    setSaving(true);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: todo.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to add task.");
      }

      setTodos((current) => [...current, data]);
      setTodo("");
      setToast("Task added to your day.");
    } catch (error) {
      console.error("Error adding task:", error);
      setToast(error.message || "Unable to add task.");
    } finally {
      setSaving(false);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`http://localhost:5000/api/todos/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || "Unable to delete task.");
      }

      setTodos((current) => current.filter((item) => item._id !== id));
      setToast("Task removed.");
    } catch (error) {
      console.error("Error deleting task:", error);
      setToast(error.message || "Unable to delete task.");
    }
  };

  const editTodo = (item) => {
    setEditingId(item._id);
    setTodo(item.title);
  };

  const updateTodo = async () => {
    if (!todo.trim() || saving || !editingId) return;

    setSaving(true);

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
          body: JSON.stringify({ title: todo.trim() }),
        }
      );

      const updatedTodo = await response.json();

      if (!response.ok) {
        throw new Error(updatedTodo.message || "Unable to update task.");
      }

      setTodos((current) =>
        current.map((item) => (item._id === editingId ? updatedTodo : item))
      );

      setTodo("");
      setEditingId(null);
      setToast("Task updated successfully.");
    } catch (error) {
      console.error("Error updating task:", error);
      setToast(error.message || "Unable to update task.");
    } finally {
      setSaving(false);
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

      if (!response.ok) {
        throw new Error(updatedTodo.message || "Unable to update task.");
      }

      setTodos((current) =>
        current.map((task) => (task._id === item._id ? updatedTodo : task))
      );

      setToast(
        updatedTodo.completed
          ? "Nice work! Task completed."
          : "Task moved back to your list."
      );
    } catch (error) {
      console.error("Error updating task status:", error);
      setToast(error.message || "Unable to update task.");
    }
  };

  const closeEditModal = () => {
    setEditingId(null);
    setTodo("");
  };

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  const completedCount = todos.filter((item) => item.completed).length;
  const remainingCount = todos.length - completedCount;
  const progress =
    todos.length > 0 ? Math.round((completedCount / todos.length) * 100) : 0;

  const filteredTodos = todos.filter((item) => {
    if (filter === "pending") return !item.completed;
    if (filter === "completed") return item.completed;
    return true;
  });

  const today = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Manila",
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date());

  const progressMessage =
    todos.length === 0
      ? "Start your day with one clear task."
      : progress === 100
        ? "Everything planned for today is done."
        : progress >= 50
          ? "You're making good progress today."
          : "Keep going. One task at a time.";

  return (
    <main className="min-h-screen bg-[#F5F3E8] px-4 py-6 text-gray-900 sm:px-6 sm:py-8 lg:px-8">
      {/* Toast notification */}
      {toast && (
        <div
          role="status"
          className="fixed right-4 top-4 z-[60] flex max-w-[calc(100%-2rem)] items-center gap-3 rounded-xl border-2 border-gray-900 bg-[#DDE3A3] px-4 py-3 text-sm font-bold text-gray-900 shadow-[4px_4px_0px_#202020]"
        >
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-gray-900">
            <Check size={14} />
          </span>
          {toast}
          <button
            type="button"
            onClick={() => setToast("")}
            aria-label="Dismiss notification"
            className="ml-1 rounded-md p-1 hover:bg-black/5"
          >
            <X size={15} />
          </button>
        </div>
      )}

      <div className="mx-auto max-w-6xl">
        <TodoNavbar logout={logout} />

        {/* Welcome */}
        <section className="mb-8 mt-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-lg border-2 border-gray-900 bg-[#DDE3A3] px-3 py-1.5 shadow-[2px_2px_0px_#202020]">
                <span className="h-2 w-2 rounded-full bg-[#687300]" />
                <span className="text-xs font-black uppercase tracking-[0.15em] text-[#465000]">
                  Your daily edition
                </span>
              </div>

              <h2 className="text-3xl font-black tracking-tight text-gray-900 sm:text-4xl">
                Today&apos;s Focus<span className="text-[#8A9500]">.</span>
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500 sm:text-base">
                Focus on what matters today, one task at a time.
              </p>

              <p className="mt-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
                <Clock3 size={14} />
                {today}
              </p>
            </div>

            <div className="flex w-fit items-center gap-3 rounded-xl border-2 border-gray-900 bg-white px-4 py-3 shadow-[3px_3px_0px_#202020]">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#F0F2D8] text-[#687300]">
                <Zap size={21} />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Daily status
                </p>
                <p className="mt-0.5 text-sm font-black text-gray-900">
                  {progress === 100 && todos.length > 0
                    ? "Day conquered"
                    : progress >= 50
                      ? "On a roll"
                      : "Keep moving"}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Daily Overview */}
        <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            {
              label: "Tasks planned",
              value: todos.length,
              note: "On today's list",
              icon: ListTodo,
              accent: "bg-[#F0F2D8] text-[#687300]",
            },
            {
              label: "Completed",
              value: completedCount,
              note: "Wins for today",
              icon: CheckCircle2,
              accent: "bg-[#DDE3A3] text-[#465000]",
            },
            {
              label: "Remaining",
              value: remainingCount,
              note: "Still on your list",
              icon: Clock3,
              accent: "bg-[#F5E6CC] text-[#8A5A20]",
            },
          ].map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="group rounded-xl border-2 border-gray-900/10 bg-white p-5 shadow-[3px_3px_0px_rgba(32,32,32,0.08)] transition-all duration-150 hover:-translate-y-1 hover:border-gray-900/30 hover:shadow-[5px_5px_0px_rgba(32,32,32,0.12)]"
              >
                <div className="flex items-start justify-between">
                  <p className="text-xs font-black uppercase tracking-[0.12em] text-gray-400">
                    {stat.label}
                  </p>
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-lg ${stat.accent}`}
                  >
                    <Icon size={18} />
                  </div>
                </div>

                <p className="mt-3 text-3xl font-black tracking-tight text-gray-900">
                  {stat.value.toString().padStart(2, "0")}
                </p>
                <p className="mt-1 text-xs text-gray-400">{stat.note}</p>
              </div>
            );
          })}
        </section>

        {/* Main Dashboard */}
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
          {/* Task List */}
          <section className="min-w-0 rounded-xl border-2 border-gray-900/10 bg-white p-5 shadow-[4px_4px_0px_rgba(32,32,32,0.08)] sm:p-6">
            <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <ClipboardList size={19} className="text-[#8A9500]" />
                  <h3 className="text-lg font-black tracking-tight text-gray-900">
                    Today&apos;s Tasks
                  </h3>
                </div>
                <p className="mt-1 text-xs text-gray-400">
                  Every little win counts.
                </p>
              </div>

              <span className="rounded-lg border border-gray-200 bg-[#F5F3E8] px-3 py-1.5 text-xs font-black text-gray-600">
                {completedCount}/{todos.length} DONE
              </span>
            </div>

            {/* Task filters */}
            <div className="mb-5 flex flex-wrap gap-2">
              {[
                { label: "All tasks", value: "all" },
                { label: "To do", value: "pending" },
                { label: "Completed", value: "completed" },
              ].map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => setFilter(item.value)}
                  className={`rounded-lg border px-3 py-2 text-xs font-bold transition-all duration-150 ${
                    filter === item.value
                      ? "border-gray-900 bg-gray-900 text-white shadow-[2px_2px_0px_#A0AC00]"
                      : "border-gray-200 bg-white text-gray-500 hover:border-gray-900 hover:text-gray-900"
                  }`}
                >
                  {item.label}
                  {item.value === "all"
                    ? ` (${todos.length})`
                    : item.value === "pending"
                      ? ` (${remainingCount})`
                      : ` (${completedCount})`}
                </button>
              ))}
            </div>

            {/* Add Task */}
            <form
              onSubmit={(event) => {
                event.preventDefault();
                addTodo();
              }}
              className="mb-6 rounded-xl border-2 border-dashed border-[#A0AC00]/50 bg-[#F8F8EF] p-4"
            >
              <label
                htmlFor="new-task"
                className="mb-2 block text-xs font-black uppercase tracking-[0.12em] text-gray-500"
              >
                Add to your day
              </label>

              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  id="new-task"
                  type="text"
                  placeholder="What do you want to get done?"
                  value={todo}
                  onChange={(event) => setTodo(event.target.value)}
                  className="min-w-0 flex-1 rounded-lg border-2 border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#A0AC00] focus:ring-2 focus:ring-[#A0AC00]/10"
                />

                <button
                  type="submit"
                  disabled={saving || !todo.trim()}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-gray-900 bg-[#A0AC00] px-5 py-3 text-sm font-black text-gray-950 shadow-[3px_3px_0px_#202020] transition-all duration-150 hover:-translate-y-0.5 hover:bg-[#B0BF1B] active:translate-y-0 active:shadow-none disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Plus size={17} />
                  {saving ? "Adding..." : "Add Task"}
                </button>
              </div>
              <p className="mt-2 text-[11px] text-gray-400">
                Press Enter to add a task.
              </p>
            </form>

            {/* Task items */}
            <div className="space-y-3">
              {loading ? (
                <div className="rounded-xl border border-gray-200 bg-gray-50 px-5 py-12 text-center">
                  <div className="mx-auto h-6 w-6 animate-spin rounded-full border-2 border-gray-200 border-t-[#A0AC00]" />
                  <p className="mt-3 text-sm text-gray-500">
                    Loading your tasks...
                  </p>
                </div>
              ) : filteredTodos.length > 0 ? (
                filteredTodos.map((item, index) => (
                  <div
                    key={item._id}
                    className={`group flex flex-col gap-3 rounded-xl border-2 p-4 transition-all duration-150 sm:flex-row sm:items-center sm:justify-between ${
                      item.completed
                        ? "border-gray-100 bg-[#FAFAF6]"
                        : "border-gray-200 bg-white hover:-translate-y-0.5 hover:border-[#A0AC00]/50 hover:shadow-[3px_3px_0px_rgba(160,172,0,0.15)]"
                    }`}
                  >
                    <div className="flex min-w-0 items-start gap-3">
                      <button
                        type="button"
                        onClick={() => toggleTodo(item)}
                        aria-label={
                          item.completed
                            ? "Mark task as incomplete"
                            : "Mark task as complete"
                        }
                        className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200 hover:scale-110 ${
                          item.completed
                            ? "border-[#687300] bg-[#687300] text-white"
                            : "border-gray-300 bg-white text-transparent hover:border-[#A0AC00]"
                        }`}
                      >
                        {item.completed ? (
                          <Check size={13} strokeWidth={3} />
                        ) : (
                          <Circle size={9} />
                        )}
                      </button>

                      <span className="hidden h-7 min-w-7 shrink-0 items-center justify-center rounded-md bg-[#F5F3E8] px-1.5 text-[10px] font-black text-gray-400 sm:flex">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <div className="min-w-0">
                        <p
                          className={`break-words text-sm font-semibold transition ${
                            item.completed
                              ? "text-gray-400 line-through"
                              : "text-gray-800"
                          }`}
                        >
                          {item.title}
                        </p>

                        {item.carriedFrom && (
                          <p className="mt-1 inline-flex items-center gap-1 text-[11px] font-semibold text-[#8A9500]">
                            <Clock3 size={12} />
                            Carried over from yesterday
                          </p>
                        )}

                        {item.completed && (
                          <p className="mt-1 text-[10px] font-bold uppercase tracking-wide text-[#8A9500]">
                            Completed
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex shrink-0 items-center gap-2 self-end sm:self-auto">
                      <button
                        type="button"
                        onClick={() => editTodo(item)}
                        aria-label="Edit task"
                        title="Edit task"
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 transition hover:border-[#A0AC00] hover:bg-[#F0F2D8] hover:text-[#687300] active:scale-95"
                      >
                        <SquarePen size={16} />
                      </button>

                      <button
                        type="button"
                        onClick={() => setDeleteId(item._id)}
                        aria-label="Delete task"
                        title="Delete task"
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-400 transition hover:border-red-300 hover:bg-red-50 hover:text-red-600 active:scale-95"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-xl border-2 border-dashed border-gray-200 bg-[#FAFAF6] px-6 py-12 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-gray-200 bg-white text-[#8A9500]">
                    {filter === "completed" ? (
                      <CheckCircle2 size={22} />
                    ) : (
                      <Plus size={22} />
                    )}
                  </div>

                  <h4 className="mt-4 text-sm font-black text-gray-800">
                    {filter === "completed"
                      ? "No completed tasks yet"
                      : filter === "pending"
                        ? "You're all caught up"
                        : "Nothing planned yet"}
                  </h4>

                  <p className="mx-auto mt-1 max-w-xs text-xs leading-5 text-gray-400">
                    {filter === "completed"
                      ? "Complete a task and it will appear here."
                      : filter === "pending"
                        ? "Nice work. There are no remaining tasks on this list."
                        : "Add something you want to accomplish today."}
                  </p>

                  {filter !== "all" && (
                    <button
                      type="button"
                      onClick={() => setFilter("all")}
                      className="mt-4 text-xs font-bold text-[#687300] underline underline-offset-4 hover:text-[#8A9500]"
                    >
                      View all tasks
                    </button>
                  )}
                </div>
              )}
            </div>
          </section>

          {/* Progress Panel */}
          <aside className="rounded-xl border-2 border-gray-900 bg-white p-5 shadow-[4px_4px_0px_#202020] sm:p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.14em] text-gray-400">
                  Daily progress
                </p>
                <h3 className="mt-2 text-4xl font-black tracking-tight text-gray-900">
                  {progress}
                  <span className="text-xl text-[#8A9500]">%</span>
                </h3>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#DDE3A3] text-[#465000]">
                <Zap size={22} />
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-5 h-3 overflow-hidden rounded-full border border-gray-900/10 bg-gray-100">
              <div
                className="h-full rounded-full bg-[#A0AC00] transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="mt-2 flex items-center justify-between text-[10px] font-bold uppercase tracking-wide text-gray-400">
              <span>Day started</span>
              <span>{completedCount} of {todos.length}</span>
            </div>

            {/* Message */}
            <div className="mt-6 rounded-xl border border-[#A0AC00]/20 bg-[#F5F6E8] p-4">
              <p className="text-sm font-black leading-5 text-gray-800">
                {progressMessage}
              </p>
              <p className="mt-2 text-xs leading-5 text-gray-500">
                Focus on today. Tomorrow will have its own tasks.
              </p>
            </div>

            {/* Summary */}
            <div className="mt-6 space-y-4 border-t-2 border-dashed border-gray-200 pt-5">
              <div className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2 text-xs text-gray-500">
                  <span className="h-2 w-2 rounded-full bg-[#A0AC00]" />
                  Completed
                </span>
                <span className="text-sm font-black text-gray-900">
                  {completedCount.toString().padStart(2, "0")}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2 text-xs text-gray-500">
                  <span className="h-2 w-2 rounded-full bg-[#D6B982]" />
                  Remaining
                </span>
                <span className="text-sm font-black text-gray-900">
                  {remainingCount.toString().padStart(2, "0")}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2 text-xs text-gray-500">
                  <span className="h-2 w-2 rounded-full bg-gray-300" />
                  Total planned
                </span>
                <span className="text-sm font-black text-gray-900">
                  {todos.length.toString().padStart(2, "0")}
                </span>
              </div>
            </div>

            {progress === 100 && todos.length > 0 && (
              <div className="mt-5 flex items-center gap-2 rounded-lg bg-[#DDE3A3] p-3 text-xs font-bold text-[#465000]">
                <CheckCircle2 size={16} />
                All tasks completed. Great work!
              </div>
            )}
          </aside>
        </div>

        {/* Footer */}
        <footer className="mt-8 border-t border-gray-300 py-6 text-center">
          <p className="text-xs font-medium text-gray-400">
            TODO POST <span className="mx-1">/</span> Simple. Focused. Built for getting things done.
          </p>
        </footer>
      </div>

      {/* Edit Modal */}
      {editingId !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/40 px-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeEditModal();
          }}
        >
          <div className="w-full max-w-md rounded-xl border-2 border-gray-900 bg-white p-6 shadow-[6px_6px_0px_#202020]">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.15em] text-[#8A9500]">
                  Edit task
                </p>
                <h3 className="mt-1 text-xl font-black text-gray-900">
                  Make an update
                </h3>
              </div>

              <button
                type="button"
                onClick={closeEditModal}
                aria-label="Close edit modal"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
              >
                <X size={18} />
              </button>
            </div>

            <form
              onSubmit={(event) => {
                event.preventDefault();
                updateTodo();
              }}
            >
              <label
                htmlFor="edit-task"
                className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-500"
              >
                Task name
              </label>
              <input
                id="edit-task"
                type="text"
                autoFocus
                value={todo}
                onChange={(event) => setTodo(event.target.value)}
                className="w-full rounded-lg border-2 border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#A0AC00] focus:ring-2 focus:ring-[#A0AC00]/10"
              />

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-bold text-gray-600 transition hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving || !todo.trim()}
                  className="rounded-lg border-2 border-gray-900 bg-[#A0AC00] px-5 py-2.5 text-sm font-black text-gray-950 shadow-[2px_2px_0px_#202020] transition hover:bg-[#B0BF1B] active:translate-y-0.5 active:shadow-none disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteId !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/40 px-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setDeleteId(null);
          }}
        >
          <div className="w-full max-w-sm rounded-xl border-2 border-gray-900 bg-white p-6 shadow-[6px_6px_0px_#202020]">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-red-200 bg-red-50 text-red-600">
                <Trash2 size={20} />
              </div>

              <div>
                <p className="text-xs font-black uppercase tracking-[0.12em] text-red-600">
                  Confirmation
                </p>
                <h3 className="mt-1 text-lg font-black text-gray-900">
                  Delete this task?
                </h3>
                <p className="mt-2 text-sm leading-5 text-gray-500">
                  This action cannot be undone. The task will be removed from your list.
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteId(null)}
                className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-bold text-gray-600 transition hover:bg-gray-50"
              >
                Keep task
              </button>

              <button
                type="button"
                onClick={async () => {
                  const id = deleteId;
                  setDeleteId(null);
                  await deleteTodo(id);
                }}
                className="rounded-lg border-2 border-red-700 bg-red-600 px-4 py-2.5 text-sm font-black text-white shadow-[2px_2px_0px_#7F1D1D] transition hover:bg-red-700 active:translate-y-0.5 active:shadow-none"
              >
                Delete task
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Todo;
