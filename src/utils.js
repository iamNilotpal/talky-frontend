import toast from 'react-hot-toast';

export const toastifyErrorMessage = (message) =>
  toast.error(message, {
    duration: 1500,
    position: 'bottom-center',
    style: {
      fontSize: '15px',
      fontWeight: 500,
    },
  });

export const toastifySuccessMessage = (message) =>
  toast.success(message, {
    duration: 1500,
    position: 'bottom-center',
    style: {
      fontSize: '15px',
      fontWeight: 500,
    },
  });
