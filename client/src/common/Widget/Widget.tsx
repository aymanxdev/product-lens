import "./widget.styles.scss";

interface WidgetProps {
  children: React.ReactNode;
  direction?: "col" | "row";
}
export const Widget = (props: WidgetProps) => {
  const { children, direction } = props;
  const classNames = `widget-wrapper ${direction ? direction : "col"}`;
  return <div className={classNames}>{children}</div>;
};
