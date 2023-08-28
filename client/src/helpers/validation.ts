interface IValues {
  [key: string]: string;
}

interface IErrors {
  [key: string]: string;
}

export const validateForm = (values: IValues) => {
  const errors: IErrors = {};
  if (!values.name) {
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
