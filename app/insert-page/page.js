// app/insert/page.js
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Insert() {
  const [newTodo, setNewTodo] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // ฟังก์ชันเพิ่ม Todo ใหม่
  const handleAddTodo = async () => {
    if (newTodo.trim() === "") {
      setError("Title cannot be empty");
      return;
    }

    const newTodoData = {
      userId: 1, // ค่า userId สามารถเปลี่ยนได้
      title: newTodo,
      completed: false,
    };

    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodoData),
      });

      if (response.ok) {
        router.push("/view-page"); // หลังจากเพิ่มข้อมูลเสร็จ จะไปที่หน้า View
      } else {
        setError("Failed to add Todo");
      }
    } catch (error) {
      console.error("Error adding todo:", error);
      setError("An error occurred");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Add Todo</h1>
      <div>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter Todo title"
          style={{ padding: "10px", width: "300px" }}
        />
        <button onClick={handleAddTodo} style={{ padding: "10px", marginLeft: "10px" }}>
          Add Todo
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
}
