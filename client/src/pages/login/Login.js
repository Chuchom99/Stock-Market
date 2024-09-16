import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logoo.png";
import "./register.scss";
import { AuthContext } from "../../authcontext/authContext";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";


const Login = () => {
  
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [err, setErr] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const { login } = useContext(AuthContext);

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await login(inputs);
  //     navigate("/dashboard");
  //   } catch (err) {
  //     setErr(err.response.data);
  //   }
  // };
  const handleLogin = async (e) => {
  e.preventDefault();
  try {
    await login(inputs);
    navigate("/dashboard");
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      setErr(error.response.data); // Set error message from server response
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
      setErr('No response received from server.');
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error during request setup:', error.message);
      setErr('Error during request setup. Please try again later.');
    }
  }
};

  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  // console.log(err)

  return (
    <div className="regist">
      <div className="cad">
        <div className="left">
          <img src={logo} alt="" />
          <p>Investing smartly for the future. Trade smarter, trade better.</p>
          <span>You don't have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              required
            />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                onChange={handleChange}
                style={{ width: "85%" }}
                required
              />
              <button
                className="show-btn"
                type="button"
                onClick={handleTogglePassword}
                style={{ color: "#000" }}
              >
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </button>
            </div>
            {err && err}
            <button onClick={handleLogin}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
