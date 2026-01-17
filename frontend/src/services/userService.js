const API_URL = import.meta.env.VITE_API_URL || "";

export const getUser = () => {
    return fetch(`${API_URL}/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then((response) => response.json())
    .catch((error) => console.error("Error fetching data:", error));
}

export const updateUserEmail = (email) => {
    return fetch(`${API_URL}/users`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({email})
    })
    .then((response) => response.json())
    .catch((error) => console.error("Error fetching data:", error));
}

export const updateUserDescription = (description) => {
    return fetch(`${API_URL}/users`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({description})
    })
    .then((response) => response.json())
    .catch((error) => console.error("Error fetching data:", error));
}

export const deleteUser = () => {
    return fetch(`${API_URL}/users`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then((response) => response.json())
    .catch((error) => console.error("Error deleting user:", error));
}
