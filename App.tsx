import React from 'react';
import {SafeAreaView,StatusBar,Text,useColorScheme} from 'react-native';

import { Colors } from './src/utils/Colors';
import Register from './src/screens/Register/Register';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.black : Colors.blue,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Register/>
    </SafeAreaView>
  );
}

export default App;
