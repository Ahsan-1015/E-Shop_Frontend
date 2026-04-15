import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
});

export const swal = {
  success: (title, text) => {
    return Swal.fire({ title, text, icon: "success", timer: 2000, showConfirmButton: false });
  },
  error: (title, text) => {
    return Swal.fire({ title, text, icon: "error" });
  },
  warning: (title, text) => {
    return Swal.fire({ title, text, icon: "warning" });
  },
  info: (title, text) => {
    return Swal.fire({ title, text, icon: "info" });
  },
  confirm: async (title, text, confirmText = "Yes", cancelText = "Cancel") => {
    const result = await Swal.fire({
      title,
      text,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: confirmText,
      cancelButtonText: cancelText,
      reverseButtons: true,
    });
    return result.isConfirmed;
  },
  delete: async (itemName = "this item") => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `You want to delete ${itemName}. This action cannot be undone!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });
    return result.isConfirmed;
  },
  toast: (title, icon = "success") => {
    return Toast.fire({ title, icon });
  },
};

export default Swal;