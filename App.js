import React from 'react';
import AppNavigator from './navigation/AppNavigator';
import { LogBox } from 'react-native';

LogBox.ignoreAllLogs();

const App = () => {
  return <AppNavigator />;
};

export default App;
