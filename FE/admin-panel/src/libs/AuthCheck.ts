import axios from 'axios';

const AuthCheck = async () => {
  try {
    const token = localStorage.getItem('authToken');
    if (token) {
      const response = await axios.get('http://192.168.18.174:8000/api/auth/check', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.data.message !== 'valid') {
        window.location.href = '/login';
      }
    } else {
      window.location.href = '/login';
    }
    console.log('Authentication checked successfully');
  } catch (error) {
    console.error('Error occurred during authentication check:', error);
    // Handle error as per your requirement
  }
};

const checkInterval = 15 * 60 * 1000; // 15 minutes in milliseconds
setInterval(() => {
  AuthCheck();
  console.log('Authentication checked at', new Date());
}, checkInterval);

export default AuthCheck;