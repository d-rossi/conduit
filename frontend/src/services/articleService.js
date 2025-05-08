const API_URL = import.meta.env.VITE_API_URL || "";

export const getArticles = () => {
    return fetch(`${API_URL}/articles`)
    .then((response) => response.json())
    .catch((error) => console.error("Error fetching data:", error));
}

export const createArticle = async (title, imgUrl, content) => {
    try {
      const response = await fetch(`${API_URL}/articles`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({title, userId: "u3", imgUrl, content}),
      });
  
      return await response.json();
    } catch (error) {
      console.error("Error creating article:", error);
    }
  }