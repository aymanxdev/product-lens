import { useState } from "react";
import { Formik, Form } from "formik";
import { validateForm } from "helpers/validation";
import "./entryForm.style.scss";
interface LoginFormValues {
  name: string;
  email: string;
  password: string;
}
export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="app-entry-form-wrapper">
      <div className="heading">
        <h1>Login</h1>
        <p>It's quick and easy.</p>
      </div>
      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        onSubmit={(values: LoginFormValues) => {
          console.log(values);
        }}
        validate={validateForm}
        validateOnBlur={false}
      >
        {({ values, handleChange, handleBlur, errors, touched }) => (
          <Form>
            <div className="form-group">
              <div className="form-field">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  name="email"
                  placeholder="Enter your email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  className={touched.email && errors.email ? "has-error" : ""}
                />
                {touched.email && errors.email ? (
                  <div className="error-message">{errors.email}</div>
                ) : null}
              </div>
              <div className="form-field">
                <label htmlFor="password">Password</label>
                <input
                  //   type={showPassword ? 'text' : 'password'}
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  className={
                    touched.password && errors.password ? "has-error" : ""
                  }
                />
                <div className="show-password-checkbox">
                  <input
                    type="checkbox"
                    id="show-password-login"
                    name="show-password"
                    checked={showPassword}
                    onChange={() => setShowPassword(!showPassword)}
                  />
                  <span className="show-password-text">Show password</span>
                </div>
                {touched.password && errors.password ? (
                  <div className="error-message">{errors.password}</div>
                ) : null}
              </div>
              <button className="submit-button" type="submit">
                Login
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
