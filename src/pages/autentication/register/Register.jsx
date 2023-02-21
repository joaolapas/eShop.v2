import React, { useEffect } from "react";
import AuthSass from "../Auth.module.sass";
import useProducts from "../../../zustand/store";
import { useNavigate } from "react-router";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const { registerUser, notifications, resetNotifications, auth } =
    useProducts();
  const navigate = useNavigate();

  useEffect(() => {
    if (notifications.length > 0) {
      const notification = notifications;
      if (notification !== "Successfully registered!") {
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
      }
      resetNotifications();
      setTimeout(()=>navigate("/login"), 2000);
    }
  }, [notifications]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;
    if (password === confirmPassword) {
      registerUser({ name: name, email: email, password: password });
    }
  };

  return (
    <div className={AuthSass.container}>
      <ToastContainer />
      <div className={AuthSass.formContainer}>
        <form onSubmit={handleSubmit} className={AuthSass.form}>
          <h2 className={AuthSass.title}>Register</h2>

          <input
            className={AuthSass.input}
            type="text"
            placeholder="Username"
            name="name"
          />
          <input
            className={AuthSass.input}
            type="email"
            placeholder="email"
            name="email"
          />
          <input
            className={AuthSass.input}
            type="password"
            placeholder="Password"
            name="password"
          />
          <input
            className={AuthSass.input}
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
          />
          <button className={AuthSass.formButton} type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
