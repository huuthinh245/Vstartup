import { AsyncStorage } from 'react-native';

export default setLanguage = (strings) => {
  let language = strings.getInterfaceLanguage().split('_')[0].split('-')[0].toLowerCase();
  AsyncStorage.getItem('language', (error, result) => {
    if (result && result.length > 0) {
      language = result;
    }
    if (availableLanguages.indexOf(language) === -1) {
      strings.setLanguage('eng');
    } else {
      strings.setLanguage(language);
    }
  });
};

export const availableLanguages = ['eng', 'vni'];
export const languages = ['English', 'Việt Nam'];