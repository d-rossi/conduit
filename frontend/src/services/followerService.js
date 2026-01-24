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

export const getFollowing = () => {
    return fetch(`${API_URL}/following`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then((response) => response.json())
    .catch((error) => console.error("Error fetching following:", error));
}

export const follow = (targetUserId) => {
    return fetch(`${API_URL}/following/${targetUserId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then((response) => response.json())
    .catch((error) => console.error("Error fetching following:", error));
}

export const unfollow = (targetUserId) => {
    return fetch(`${API_URL}/following/${targetUserId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then((response) => response.json())
    .catch((error) => console.error("Error fetching following:", error));
}