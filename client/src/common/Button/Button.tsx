import "./button.styles.scss";

interface ButtonProps {
  variant: "primary" | "secondary" | "default";
  size: "small" | "medium" | "large";
  children: React.ReactNode;
}

export const Button = (props: ButtonProps) => {
  const { variant, size, children, ...rest } = props;

  const classNames = `common-btn ${variant} ${size}`;

  return (
    <button className={classNames} {...rest}>
      {children}
    </button>
  );
};
