import { toast } from "react-toastify";

import Swal from "sweetalert2";
toast.configure();
//toast for error
export const errorFunction = (error) => {
  const errorMessage = typeof error === "string" ? error : "error";

  Swal.fire({
    icon: "error",
    title: `${errorMessage}`,
  });
};

//toast for success
export const successFunction = (data) => {
  const successMessage = typeof data === "string" ? data : "success";
  Swal.fire({
    icon: "Good job!",
    title: `${successMessage}`,
    // text: "success",
  });
};
//toast for info
export const infoFunction = (data) => {
  const infoMessage = typeof data === "string" ? data : "success";
  toast.info(infoMessage, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
//toast for success
export const toastSuccessFunction = (data, time = 3000) => {
  toast.info(data, {
    position: "top-right",
    autoClose: time,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
export const toastErrorFunction = (error) => {
  toast.error(error, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
