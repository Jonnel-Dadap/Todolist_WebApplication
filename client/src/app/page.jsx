"use client"
import { useEffect, useState } from "react";
function Home() {
  const [todo, setTodo] =useState("");
  const [todos, setTodos] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

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

    try{
      const response = await fetch("http://localhost:5000/api/todos",{
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

  const deleteTodo =  async (id) => {
   try {
    await fetch(`"http://localhost:5000/api/todos/${id}`, {
      method: "DELETE",
    });
    setTodos(todos.filter((item) => item._id !== id));
   } catch (error){
    console.log("Error deleting Todo: ", error);
   }
  };

  const editTodo = (index) => {
  setEditingIndex(index);
  setTodo(todos[index]);
};

const updateTodo = () => {
  if (todo.trim() === "") return;

  const updatedTodos = [...todos];
  updatedTodos[editingIndex] = todo;

  setTodos(updatedTodos);
  setTodo("");
  setEditingIndex(null);
};

  return(
    <main>
      <h1>My Todo list.</h1>
      <input type="text" placeholder="Enter a Todo..." value={todo} onChange={(e) => setTodo(e.target.value)}/>
      <button onClick={editingIndex === null ? addTodo : updateTodo}>
          {editingIndex == null ? "add todo" : "Save"}
      </button>

      <ul>
        {todos.map((item) => (
          <li key={item._id}>{item.title} 
                <button onClick={() => editTodo(item._id)}>edit</button>
                <button onClick={() => deleteTodo(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </main>
  );
}
export default Home;