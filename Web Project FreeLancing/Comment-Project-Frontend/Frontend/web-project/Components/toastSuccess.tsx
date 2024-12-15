import { toast } from "react-toastify";

const toastSuccess = (msg: String) => {
  return toast.success(msg, {
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

export default toastSuccess;
