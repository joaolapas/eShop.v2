import React, { useEffect } from "react";
import AuthSass from "../Auth.module.sass";
import { Link, useNavigate } from "react-router-dom";
import useProducts from "../../../zustand/store";
import { toast, ToastContainer } from "react-toastify";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { login, notifications, resetNotifications, auth } = useProducts();
  const navigate = useNavigate();

  //console.log(auth);

  useEffect(() => {
    if (notifications.length > 0) {
      const notification = notifications;
      if (notification !== 'Welcome back!') {
        toast.error(notification, {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        toast.success(notification, {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        setTimeout(() => navigate("/"), 2000);
      }
      resetNotifications();
    }
  }, [notifications]);

  const handleSubmit = (event) => {
    event.preventDefault();
    login({email:email, password:password});
  };
  //console.log(auth);
  return (
    <div className={AuthSass.container}>
      <ToastContainer />
      <div className={AuthSass.formContainer}>
        <form className={AuthSass.form} onSubmit={handleSubmit}>
          <h2 className={AuthSass.title}>Login</h2>
          <input
            className={AuthSass.loginFormInput}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            className={AuthSass.loginFormInput}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button type="submit" className={AuthSass.formButton}>
            Login
          </button>
          <h2>Don't have an account?</h2>
          <button
            onClick={() => navigate("/register")}
            className={AuthSass.loginFormRegister}
          >
            Register
          </button>
          <Link className={AuthSass.loginReset} to="/resetPassword">
            <p>Forgot your password?</p>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
