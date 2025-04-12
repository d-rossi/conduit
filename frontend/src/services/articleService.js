const API_URL = import.meta.env.VITE_API_URL;

export const getArticles = () => {
    return fetch(`${API_URL}/articles`)
    .then((response) => response.json())
    .catch((error) => console.error("Error fetching data:", error));
}