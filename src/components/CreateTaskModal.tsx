import { useState } from "react";
import apiClient from "../services/api";
import type { TaskCreate, Project } from "../types";
import "./CreateTaskModal.css";
import { useTags } from "../hooks/useTags";

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTaskCreated: () => void;
  projects: Project[];
}

const CreateTaskModal = ({
  isOpen,
  onClose,
  onTaskCreated,
  projects,
}: CreateTaskModalProps) => {
  const { tags, loading: tagsLoading } = useTags();
  const [formData, setFormData] = useState<TaskCreate>({
    title: "",
    description: "",
    project_id: projects.length > 0 ? projects[0].id : undefined,
    tags: [],
  });
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleTagChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setFormData({
      ...formData,
      tags: selected,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiClient.post("/tasks/", formData);
      onTaskCreated();
      onClose();
    } catch {
      setError("Failed to create task. Please try again.");
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Create a new task</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="project_id">Project</label>
            <select
              id="project_id"
              name="project_id"
              value={formData.project_id}
              onChange={handleChange}
              required
            >
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="title">Task title</label>
            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="tags">Tags</label>
            <select
              id="tags"
              name="tags"
              multiple
              value={formData.tags || []}
              onChange={handleTagChange}
              disabled={tagsLoading}
            >
              {tags.map((tag) => (
                <option key={tag.id} value={tag.name}>
                  {tag.name}
                </option>
              ))}
            </select>
          </div>
          {error && <p className="error">{error}</p>}
          <div className="modal-actions">
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTaskModal;
