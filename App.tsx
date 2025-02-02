import React, { useEffect } from 'react';
import {SafeAreaView,StatusBar,useColorScheme} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import { Colors } from './src/utils/Colors';
import Register from './src/screens/Register/Register';
import { makeStyles } from '@rneui/themed';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const {
    container,
    statusBarStyle
  } = useStyles(isDarkMode)

  useEffect(()=>{
    SplashScreen.hide()
  },[])

  return (
    <SafeAreaView style={container}>
      <StatusBar
        backgroundColor={statusBarStyle.backgroundColor}
      />
    <Register/>
    </SafeAreaView>
  );
}

type Props = {
  isDarkMode?: boolean;
};

const useStyles = makeStyles((theme,props: Props)=>({
  container: {
    flex: 1,
    backgroundColor: props.isDarkMode ? Colors.black : Colors.white
  },
  statusBarStyle: {
    backgroundColor: props.isDarkMode ? Colors.black : Colors.blue,
  }
}))

export default App;
