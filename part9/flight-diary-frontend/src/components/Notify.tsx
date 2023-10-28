interface Props {
  message: string;
  type: "error" | "success";
}

const Notify = ({ message, type }: Props) => {
  if (!message) {
    return null;
  }
  return (
    <div style={{ color: type === "error" ? "red" : "green" }}>{message}</div>
  );
};

export default Notify;
