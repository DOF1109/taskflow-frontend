import { useEffect, useState } from "react";
import apiClient from "../services/api";
import type { Task } from "../types";
import "./TaskList.css";

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await apiClient.get("/tasks/");
        setTasks(response.data);
      } catch {
        setError("Failed to fetch tasks.");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="task-list">
      <h3>Tasks</h3>
      {loading && <p>Loading tasks...</p>}
      {error && <p className="error">{error}</p>}
      <div className="tasks">
        {tasks.map((task) => (
          <div key={task.id} className="task-card">
            <h4>{task.title}</h4>
            <p>{task.description}</p>
            <div className="task-meta">
              <span>{task.status}</span>
              <span>{task.priority}</span>
              <span>
                {task.due_date
                  ? new Date(task.due_date).toLocaleDateString()
                  : "N/A"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList; 