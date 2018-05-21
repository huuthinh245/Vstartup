import { Alert } from 'react-native';

export const _alert = (title = '', message = '', buttons = [], cancelable = false) => {
  if (!Array.isArray(buttons)) {
    buttons = [buttons];
  }
  const actions = buttons.filter(item => {
    const { text, onPress } = item;
    return { text, onPress };
  });

  Alert.alert(title, message, actions, { cancelable });
};
