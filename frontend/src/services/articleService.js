export const getArticles = () => {
    return fetch("http://localhost:3001/articles")
    .then((response) => response.json())
    .catch((error) => console.error("Error fetching data:", error));
}