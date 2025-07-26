import type { Project } from "../types";
import "./ProjectList.css";

interface ProjectListProps {
  projects: Project[];
}

const ProjectList = ({ projects }: ProjectListProps) => {
  return (
    <div className="project-list">
      <h3>Projects</h3>
      <div className="projects">
        {projects.map((project) => (
          <div key={project.id} className="project-card">
            <h4>{project.name}</h4>
            <p>{project.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectList; 