import "../styles/login.css";
import logo from "../assets/images/logo.png";

const Login = () => {
  return (
    <>
      <div className="login-container">
        <div className="login-header">
          <span className="logo">
            <img src={logo} alt="" />
            <h1>
              Perfumes<br></br>
              Mists
            </h1>
          </span>
        </div>
        <input type="email" name="" id="" placeholder="Email" required/>
        <input type="password" name="" id="" placeholder="Password" required/>
        <button className="signup-btn">Login</button>
      </div>
    </>
  );
};

export default Login;
