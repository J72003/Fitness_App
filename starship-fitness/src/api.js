// src/api.js
export const loginUser = async (credentials) => {
    // Simulate an API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (credentials.username === 'user' && credentials.password === 'pass') {
          resolve({ token: 'mockToken', user: { username: 'user' } });
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  };
  
  export const logoutUser = async () => {
    // Simulate an API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  };