import I18n from 'react-native-i18n';
import en from '../resources/strings/en';
import es from '../resources/strings/es';

I18n.fallbacks = true;
I18n.translations = {
  en,
  es
};

I18n.defaultLocale = 'es';
I18n.locale = I18n.currentLocale();

export default I18n;

/*
See:
  Setting up:
  https://github.com/AlexanderZaytsev/react-native-i18n

  How to use?:
  https://github.com/fnando/i18n-js#setting-up
*/
