"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function View() {
  const [todos, setTodos] = useState([]);
  const router = useRouter();

  // ฟังก์ชันดึงข้อมูล Todo จาก API
  const fetchTodos = async () => {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/todos");
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  // เรียกใช้ API เมื่อคอมโพเนนท์ถูกโหลด
  useEffect(() => {
    fetchTodos();
  }, []);

  // ฟังก์ชันลบ Todo
  const handleDeleteTodo = async (id) => {
    try {
      await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: "DELETE",
      });
      setTodos(todos.filter(todo => todo.id !== id)); // ลบ Todo ที่ถูกเลือก
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Todo List</h1>
      <ul>
        {todos.slice(0, 10).map(todo => (
          <li key={todo.id} style={{ marginBottom: "10px" }}>

            <h3>{todo.title}</h3>
            <p><strong>User ID:</strong> {todo.userId}</p>
            <p><strong>Todo ID:</strong> {todo.id}</p>
            <p><strong>Status:</strong> {todo.completed ? 'Completed' : 'Pending'}</p>

            <button onClick={() => router.push("/delete-page")} style={{ padding: "5px", backgroundColor: "red", color: "white", cursor: "pointer" }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      <button onClick={() => router.push("/insert-page")} style={{ padding: "10px", marginTop: "20px" }}>
        Add New Todo
      </button>
    </div>
  );
}
