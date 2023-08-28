import React from "react";
import { Formik, Form } from "formik";
import { validateForm } from "helpers/validation";

interface SignupFormValues {
  name: string;
  email: string;
  password: string;
}
export const Signup = () => {
  return (
    <div className="container">
      <div className="wrapper">
        <div className="Heading">
          <h1>Sign Up</h1>
          <p>It's quick and easy.</p>
        </div>
        <div className="sign-up-form">
          <Formik
            initialValues={{ name: "", email: "", password: "" }}
            onSubmit={(values: SignupFormValues) => {
              console.log(values);
            }}
            validate={validateForm}
          >
            {({ values, handleChange, handleBlur, errors, touched }) => (
              <Form>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter your name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    className={touched.name && errors.name ? "has-error" : ""}
                  />
                  {touched.name && errors.name ? (
                    <div className="error-message">{errors.name}</div>
                  ) : null}
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    name="email"
                    id="email"
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
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="text"
                    name="password"
                    id="password"
                    placeholder="Enter your password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    className={
                      touched.password && errors.password ? "has-error" : ""
                    }
                  />
                  {touched.password && errors.password ? (
                    <div className="error-message">{errors.password}</div>
                  ) : null}
                </div>
                <div className="form-group">
                  <button type="submit">Sign up</button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};
