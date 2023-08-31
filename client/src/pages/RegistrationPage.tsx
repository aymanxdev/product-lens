import React from "react";
import "assets/styles/register-page.styles.scss";
import { Signup } from "components/Signup/Signup";
const CLASS_PREFIX = "registration-page";
const RegistrationPage = () => {
  return (
    <div className={`${CLASS_PREFIX}-container`}>
      <div className={`${CLASS_PREFIX}-left-column`}>
        <Signup />
      </div>
      <div className={`${CLASS_PREFIX}-right-column`}></div>
    </div>
  );
};

export default RegistrationPage;
