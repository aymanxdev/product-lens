import React from "react";
import "assets/styles/register-page.styles.scss";
import { Signup } from "components/Signup/Signup";
import { Login } from "components/Signup/Login";
const CLASS_PREFIX = "registration-page";

type RegistrationAndLoginProps = {
  isLogin?: boolean;
};
const RegistrationAndLoginPage = (props: RegistrationAndLoginProps) => {
  return (
    <div className={`${CLASS_PREFIX}-container`}>
      <div className={`${CLASS_PREFIX}-left-column`}>
        {props.isLogin ? <Login /> : <Signup />}
      </div>
      <div className={`${CLASS_PREFIX}-right-column`}></div>
    </div>
  );
};

export default RegistrationAndLoginPage;
