import { useEffect, useState } from "react";
import apiClient from "../services/api";
import type { Tag } from "../types";

export function useTags() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiClient
      .get("/tags/")
      .then((res) => setTags(res.data))
      .catch(() => setError("Error loading tags"))
      .finally(() => setLoading(false));
  }, []);

  return { tags, loading, error };
}
