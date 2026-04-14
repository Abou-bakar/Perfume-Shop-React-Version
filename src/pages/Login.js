import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { FiEye, FiEyeOff } from "react-icons/fi";
import "../styles/login.css";
import logo from "../assets/images/logo.png";

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false)
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(email, password);
      toast.success('Login successful!');
      navigate('/admin')
    } catch (error) {
      console.error('Login error:', error);
      if (error.code === 'auth/invalid-credential') {
        toast.error('Invalid email or password');
      } else if (error.code === 'auth/user-not-found') {
        toast.error('No account found with this email');
      } else if (error.code === 'auth/wrong-password') {
        toast.error('Incorrect password');
      } else {
        toast.error('Failed to login. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <div className="logo-wrapper">
              <img src={logo} alt="Perfumes Mists" className="logo-image" />
            </div>
            <h1 className="login-title">Perfumes Mists</h1>
            <p className="login-subtitle">Welcome back</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group-login">
              <input
                type="email"
                placeholder="your@perfumesmists.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-input"
              />
            </div>
            
            <div className="password-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="form-input"
              />

              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                {showPassword ?<FiEyeOff /> : <FiEye />}
              </button>
            </div>

            <button
              type="submit"
              className="login-btn"
              disabled={loading}
            >
              {loading ? (
                <span className="spinner-container">
                  <span className="spinner"></span>
                </span>
              ) : (
                'Sign in'
              )}
            </button>
          </form>

          <div className="login-footer">
            <p>© 2026 Perfumes Mists. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
