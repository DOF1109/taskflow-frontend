import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiClient from "../services/api";
import type { Project } from "../types";
import CreateProjectModal from "../components/CreateProjectModal";
import ConfirmModal from "../components/ConfirmModal";
import "./ProjectsPage.css";

const ProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshProjects, setRefreshProjects] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await apiClient.get("/projects/");
        setProjects(response.data);
      } catch {
        setError("Failed to fetch projects.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [refreshProjects]);

  const handleProjectCreated = () => {
    setRefreshProjects((prev) => !prev);
  };

  const handleDeleteProject = async (id: number) => {
    setLoading(true);
    setError("");
    try {
      await apiClient.delete(`/projects/${id}`);
      setProjects(projects.filter((p) => p.id !== id));
    } catch {
      setError("No se pudo eliminar el proyecto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="projects-page">
      <div className="container">
        <div className="header">
          <h2>Projects</h2>
          <button onClick={() => setIsModalOpen(true)}>Create Project</button>
        </div>
        {loading && <p>Loading projects...</p>}
        {error && <p className="error">{error}</p>}
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <h4>{project.name}</h4>
              <p>{project.description}</p>
              <Link to={`/projects/${project.id}/tasks`}>View Tasks</Link>
              <button
                className="delete-btn"
                onClick={() => setProjectToDelete(project)}
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
      </div>
      <CreateProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onProjectCreated={handleProjectCreated}
      />
      <ConfirmModal
        isOpen={!!projectToDelete}
        title="Confirmar eliminación"
        message={`¿Seguro que deseas eliminar el proyecto "${projectToDelete?.name}"?`}
        onConfirm={() => {
          if (projectToDelete) handleDeleteProject(projectToDelete.id);
          setProjectToDelete(null);
        }}
        onCancel={() => setProjectToDelete(null)}
      />
    </div>
  );
};

export default ProjectsPage;
