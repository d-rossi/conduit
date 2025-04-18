const API_URL = import.meta.env.VITE_API_URL || "";

const signUp = async (username, email, password) => {
    try {
        const response = await fetch(`${API_URL}/users/signup`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({username, email, password})
        });
  
        return await response.json();
      } catch (error) {
        console.error('Error during signUp request:', error);
      }
}

const login = async (username, password) => {
    try {
        const response = await fetch(`${API_URL}/users/login`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({username, password})
        });
  
        return await response.json();
      } catch (error) {
        console.error('Error during login request:', error);
      }
}

export default {signUp, login};