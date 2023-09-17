import "./tag.styles.scss";
interface TagProps {
  children: React.ReactNode;
  colour:
    | "primary"
    | "secondary"
    | "danger"
    | "warning"
    | "success"
    | "default";
  isSelected?: boolean;
}

export const Tag = (props: TagProps) => {
  const { children, colour, isSelected } = props;

  const classNames = `tag-item ${colour} ${isSelected ? "selected" : ""}`;
  return <div className={classNames}>{children}</div>;
};
