const API_URL = import.meta.env.VITE_API_URL || "";

export const getFollowers = () => {
    const user = localStorage.getItem("token")
    console.log("USER", user)
    // return fetch(`${API_URL}/users/${user}/articles`)
    // .then((response) => response.json())
    // .catch((error) => console.error("Error fetching data:", error));
}