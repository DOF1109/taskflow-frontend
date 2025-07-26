import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../services/api";
import type { Project, Task } from "../types";
import CreateTaskModal from "../components/CreateTaskModal";
import EditTaskModal from "../components/EditTaskModal";
import "./ProjectTasksPage.css";

const ProjectTasksPage = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshTasks, setRefreshTasks] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(null);

  useEffect(() => {
    const fetchProjectAndTasks = async () => {
      try {
        const [projectResponse, tasksResponse] = await Promise.all([
          apiClient.get(`/projects/${projectId}`),
          apiClient.get(`/projects/${projectId}/tasks`),
        ]);
        setProject(projectResponse.data);
        setTasks(tasksResponse.data);
      } catch {
        setError("Failed to fetch project and tasks.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjectAndTasks();
  }, [projectId, refreshTasks]);

  const handleTaskCreated = () => {
    setRefreshTasks((prev) => !prev);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className="project-tasks-page">
      <div className="container">
        <div className="header">
          <h2>{project?.name}</h2>
          <button onClick={() => setIsModalOpen(true)}>Create Task</button>
        </div>
        <div className="tasks-grid">
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
              <div className="task-tags">
                {task.tags && task.tags.length > 0 ? (
                  task.tags.map((tag) => (
                    <span
                      className="task-tag"
                      key={typeof tag === "string" ? tag : tag.id}
                    >
                      {typeof tag === "string" ? tag : tag.name}
                    </span>
                  ))
                ) : (
                  <span className="task-tag none">No tags</span>
                )}
              </div>
              <button className="edit-btn" onClick={() => setEditTask(task)}>
                Edit
              </button>
            </div>
          ))}
        </div>
      </div>
      {project && (
        <CreateTaskModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onTaskCreated={handleTaskCreated}
          projects={[project]}
        />
      )}
      {editTask && (
        <EditTaskModal
          isOpen={!!editTask}
          onClose={() => setEditTask(null)}
          task={editTask}
          onTaskUpdated={handleTaskCreated}
        />
      )}
    </div>
  );
};

export default ProjectTasksPage;
