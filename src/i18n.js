import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      problem: 'problem',
      disagree: 'Disagree',
      agree: 'Agree',
      'Your Budgets': 'Your Budgets',
      'Create Budget': 'Create Budget',
      'Are you sure?': 'Are you sure?',
      userNotFound: 'User was not found :(',
    },
  },
  sk: {
    translation: {
      problem: 'problém',
      disagree: 'Nesúhlasím',
      agree: 'Súhlasím',
      'Your Budgets': 'Vaše rozpočty',
      'Create Budget': 'Vytvoriť rozpočet',
      'Are you sure?': 'Ste si istý?',
      userNotFound: 'Užívateľ nebol nájdený :(',
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'en',

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
