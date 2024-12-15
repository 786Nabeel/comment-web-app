import { toast } from "react-toastify";

const toastError = (msg: String) => {
  return toast.error(msg, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};
export default toastError;
