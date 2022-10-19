export default function Notification(props) {
  const type = `notification is-${props.type || "info"}`;
  return <div className={type}>{props.children}</div>;
}
