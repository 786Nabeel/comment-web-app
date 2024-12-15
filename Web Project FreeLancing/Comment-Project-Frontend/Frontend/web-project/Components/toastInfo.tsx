import { toast } from "react-toastify";

const toastInfo = (msg: String) => {
  return toast.info(msg, {
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

export default toastInfo;
