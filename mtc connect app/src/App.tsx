import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import * as Localization from 'expo-localization';
import store from '@store/index';
import { setLanguage } from '@store/slices/localizationSlice';
import Navigation from '@navigation/RootNavigator';
import { setupNotifications } from '@services/notificationService';

const App = () => {
  useEffect(() => {
    // Initialize localization
    const locale = Localization.locale;
    store.dispatch(setLanguage(locale.split('-')[0]));

    // Setup push notifications
    setupNotifications();
  }, []);

  return (
    <Provider store={store}>
      <StatusBar barStyle="dark-content" />
      <Navigation />
    </Provider>
  );
};

export default App;
