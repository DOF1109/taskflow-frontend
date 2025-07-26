import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiClient from "../services/api";
import type { Project } from "../types";
import CreateProjectModal from "../components/CreateProjectModal";
import "./ProjectsPage.css";

const ProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshProjects, setRefreshProjects] = useState(false);

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
            </div>
          ))}
        </div>
      </div>
      <CreateProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onProjectCreated={handleProjectCreated}
      />
    </div>
  );
};

export default ProjectsPage; 