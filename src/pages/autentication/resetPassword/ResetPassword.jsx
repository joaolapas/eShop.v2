import React from "react";
import AuthSass from "../Auth.module.sass";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  return (
    <div className={AuthSass.container}>
      <div className={AuthSass.formContainer}>
        <div className={AuthSass.form}>
          <h2 className={AuthSass.title}>Reset your password</h2>
          <input className={AuthSass.input} type="email" placeholder="email" />
          <button className={AuthSass.formButton} type="submit">Reset</button>
          <Link className={AuthSass.loginReset}to='/'><p>Back</p></Link>
        </div>
      </div>
    </div>
  );
};


export default ResetPassword
