import React, { useEffect } from 'react';
import {SafeAreaView,StatusBar,Text,useColorScheme} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import { Colors } from './src/utils/Colors';
import Register from './src/screens/Register/Register';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.black : Colors.blue,
  };

  useEffect(()=>{
    SplashScreen.hide()
  },[])

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Register/>
    </SafeAreaView>
  );
}

export default App;
