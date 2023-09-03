interface IValues {
  [key: string]: string;
}

interface IErrors {
  [key: string]: string;
}

type FormType = "login" | "signup";

export const validateForm = (values: IValues, formType: FormType = "login") => {
  const errors: IErrors = {};

  // Only validate the 'name' field for signup
  if (formType === "signup" && !values.name) {
    errors.name = "Name is required";
  }

  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email is invalid";
  }
  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 6) {
    errors.password = "Password must be 6 or more characters";
  }
  return errors;
};
