import { Alert } from "@mui/material";

interface Props {
  message: string;
  type: "error" | "success";
}

const Notify = ({ message, type }: Props) => {
  if (!message) {
    return null;
  }
  return (
    <Alert sx={{ my: 2 }} severity={type === "error" ? "error" : "success"}>
      {message}
    </Alert>
  );
};

export default Notify;
