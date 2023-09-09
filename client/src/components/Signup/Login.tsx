import { useState } from "react";
import { Formik, Form } from "formik";
import { validateForm } from "helpers/validation";
import { Link, useNavigate } from "react-router-dom";
import "./entryForm.style.scss";
import { useAuth } from "hooks/useAuth";
import paths from "routes/paths";
interface LoginFormValues {
  email: string;
  password: string;
}
export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string): Promise<any> => {
    try {
      await loginUser(email, password);
      navigate(paths.MY_DASHBOARD);
    } catch (error) {
      console.error("Error logging in:", error);
      // Show error to user
    }
  };

  return (
    <div className="app-entry-form-wrapper">
      <div className="heading">
        <h1>Login</h1>
        <p>
          Dive back into your projects and teams. Manage your tasks seamlessly
          with Product Lens.
        </p>
      </div>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values: LoginFormValues) => {
          handleLogin(values.email, values.password);
        }}
        validate={(values) => validateForm(values, "login")}
      >
        {({ handleChange, values, errors, touched }) => (
          <Form>
            <div className="form-group">
              <div>email: guest4@email.com password: guest4Password</div>
              <div className="form-field">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  name="email"
                  placeholder="Enter your email"
                  onChange={handleChange}
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
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  onChange={handleChange}
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
                {" "}
                Login{" "}
              </button>
              <div className="separator">
                <span>or</span>
              </div>

              <button className="google-login-button">Login with Google</button>
              <Link to="/register" className="alternate-action-link">
                Don't have an account? Sign up
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
