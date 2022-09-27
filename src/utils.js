import toast from 'react-hot-toast';
import { HEX_COLORS, RGB_COLORS } from './constants';

export const toastifyErrorMessage = (message) =>
  toast.error(message, {
    duration: 1500,
    position: 'bottom-center',
    style: {
      fontSize: '15px',
      fontWeight: 600,
    },
  });

export const toastifySuccessMessage = (message) =>
  toast.success(message, {
    duration: 1500,
    position: 'bottom-center',
    style: {
      fontSize: '15px',
      fontWeight: 600,
    },
  });

export const getRandomColor = (COLORS = HEX_COLORS) => {
  const index = Math.floor(Math.random() * COLORS.length);
  return COLORS[index];
};

export const getRandomTopBorder = (size = '6px') => {
  const color = getRandomColor();
  return { borderTop: `${size} solid ${color}` };
};

export const getRandomBorder = (size = '3px') => {
  const color = getRandomColor(RGB_COLORS);
  const colorsWithCommas = color.split(' ').join(', ');
  return {
    boxShadow: `rgb(${color} / 20%) 0px 10px 40px,
    rgb(${colorsWithCommas}) 0px 0px 0px 2px inset`,
  };
};
