const API_URL = import.meta.env.VITE_API_URL || "";

export const getFollowers = () => {
    return fetch(`${API_URL}/followers`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then((response) => response.json())
    .catch((error) => console.error("Error fetching followers:", error));
}