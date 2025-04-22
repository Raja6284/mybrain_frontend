

import axios from "axios";
import { useState, useEffect } from "react";
import { BACKEND_URL } from "../../../config";

export type Content = {
  _id: string;
  type: "text" | "randomLink" | "code" | "youtube" | "twitter" | "instagram" | "email" | "image" | "linkedin" | "document";
  title: string;
  url?: string;
  link: string;
  // Add more fields if you use them in your content
};



export function useContent() {
  const [contents, setContents] = useState<Content[]>([]);

  function refresh() {
    const token = localStorage.getItem("token");
    if (!token) {
      // Skip request if no token
      return;
    }

    axios
      .get(`${BACKEND_URL}/api/v1/content`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setContents(response.data.content);
      })
      .catch((error) => {
        console.error("Error fetching content:", error);
        // Optionally handle errors (e.g., clear contents or redirect)
      });
  }

  useEffect(() => {
    refresh();
    const interval = setInterval(() => {
      refresh();
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return { contents, refresh };
}