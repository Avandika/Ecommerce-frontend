import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.removeItem('username');
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username.trim()) {
      sessionStorage.setItem('username', username);
      navigate('/home');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#e2e2e2]">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <input
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded-md"
          required
        />
        <button
          type="submit"
          className="w-full bg-[#1f160d] text-white py-2 rounded-md hover:bg-[#3a2f24]"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
