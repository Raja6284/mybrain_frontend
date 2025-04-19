import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../../config";

export function useUsername() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsername() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BACKEND_URL}/api/v1/user`, {
          headers: { Authorization: token }
        });
        setUsername(response.data.username || "User");
      } catch (e) {
        setUsername("User");
      } finally {
        setLoading(false);
      }
    }
    fetchUsername();
  }, []);

  return { username, loading };
}
