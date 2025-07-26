import React, { useState, useEffect } from "react";
import "./TagManager.css";
import { api } from "../services/api";

export interface Tag {
  id: number;
  name: string;
}

const TagManager: React.FC = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [newTag, setNewTag] = useState({ name: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTags = async () => {
    setLoading(true);
    try {
      const res = await api.get("/tags/");
      setTags(res.data);
    } catch (err) {
      setError("Error al cargar etiquetas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTag({ ...newTag, [e.target.name]: e.target.value });
  };

  const handleCreateTag = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await api.post("/tags/", newTag);
      setTags([...tags, res.data]);
      setNewTag({ name: "" });
    } catch (err) {
      setError("No se pudo crear la etiqueta");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTag = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await api.delete(`/tags/${id}`);
      setTags(tags.filter((tag) => tag.id !== id));
    } catch (err) {
      setError("No se pudo eliminar la etiqueta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tag-manager">
      <h2>Gestión de Etiquetas</h2>
      <form onSubmit={handleCreateTag} className="tag-form">
        <input
          type="text"
          name="name"
          placeholder="Nombre de la etiqueta"
          value={newTag.name}
          onChange={handleInputChange}
          required
        />
        <button type="submit" disabled={loading}>
          Crear
        </button>
      </form>
      {error && <div className="error">{error}</div>}
      <ul className="tag-list">
        {tags.map((tag) => (
          <li key={tag.id}>
            <span>{tag.name}</span>
            <button onClick={() => handleDeleteTag(tag.id)} disabled={loading}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TagManager;
