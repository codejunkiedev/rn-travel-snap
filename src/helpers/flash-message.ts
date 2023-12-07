import { showMessage } from 'react-native-flash-message';

// these are helper functions to show flash messages

export const successFlash = (message: string, description: string = '') => {
  showMessage({
    message: message,
    description: description,
    type: 'success',
    icon: 'success',
  });
};

export const errorFlash = (message: string, description: string = '') => {
  showMessage({
    message: message,
    description: description,
    type: 'danger',
    icon: 'danger',
  });
};

export const warningFlash = (message: string, description: string = '') => {
  showMessage({
    message: message,
    description: description,
    type: 'warning',
    icon: 'warning',
  });
};

export const infoFlash = (message: string, description: string = '') => {
  showMessage({
    message: message,
    description: description,
    type: 'info',
    icon: 'info',
  });
};
