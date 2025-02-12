import React, { useEffect } from 'react';
import {StatusBar,useColorScheme} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import Toast from 'react-native-toast-message';
import { makeStyles } from '@rneui/themed';
import { Provider } from 'react-redux';

import { Colors } from './src/utils/Colors';
import { DatabaseProvider } from './src/context/DatabaseContext';
import { store } from './src/store/store';
import Navigation from './src/navigation';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const {statusBarStyle} = useStyles({isDarkMode})

  return (
    <Provider store={store}>
      <DatabaseProvider>
        <StatusBar backgroundColor={statusBarStyle.backgroundColor}/>
        <Navigation/>
        <Toast/>
      </DatabaseProvider>
    </Provider>
  );
}

type Props = {
  isDarkMode?: boolean;
};

const useStyles = makeStyles((_ , props: Props)=>({
  statusBarStyle: {
    backgroundColor: props.isDarkMode ? Colors.black : Colors.blue,
  }
}))

export default App;
