import { useState } from "react";
import apiClient from "../services/api";
import type { Task, TaskUpdate } from "../types";
import "./EditTaskModal.css";
import { useTags } from "../hooks/useTags";
import Select from "react-select";

interface EditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task;
  onTaskUpdated: () => void;
}

const EditTaskModal = ({
  isOpen,
  onClose,
  task,
  onTaskUpdated,
}: EditTaskModalProps) => {
  const { tags, loading: tagsLoading } = useTags();
  const [formData, setFormData] = useState<TaskUpdate>({
    title: task.title,
    description: task.description,
    status: task.status,
    priority: task.priority,
    due_date: task.due_date,
    tags: task.tags.map((t) => (typeof t === "string" ? t : t.name)),
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

  const tagOptions = tags.map((tag) => ({ value: tag.name, label: tag.name }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiClient.put(`/tasks/${task.id}`, formData);
      onTaskUpdated();
      onClose();
    } catch {
      setError("Failed to update task. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
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
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="priority">Priority</label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              required
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="due_date">Due Date</label>
            <input
              id="due_date"
              name="due_date"
              type="date"
              value={formData.due_date ? formData.due_date.slice(0, 10) : ""}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="tags">Tags</label>
            <Select
              id="tags"
              name="tags"
              isMulti
              options={tagOptions}
              value={tagOptions.filter((opt) =>
                formData.tags?.includes(opt.value)
              )}
              onChange={(selected) =>
                setFormData({
                  ...formData,
                  tags: selected ? selected.map((opt) => opt.value) : [],
                })
              }
              isLoading={tagsLoading}
              classNamePrefix="react-select"
              placeholder="Select tags..."
            />
            <div className="selected-tags">
              {formData.tags && formData.tags.length > 0 ? (
                formData.tags.map((tag) => (
                  <span className="selected-tag" key={tag}>
                    {tag}
                  </span>
                ))
              ) : (
                <span className="selected-tag none">No tags selected</span>
              )}
            </div>
          </div>
          {error && <p className="error">{error}</p>}
          <div className="modal-actions">
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTaskModal;
