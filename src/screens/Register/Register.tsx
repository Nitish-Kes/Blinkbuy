import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {Formik} from 'formik';

import {
  generateLoginToken,
  hashedPassword,
  setStoredObject,
} from '../../utils/DataUtils';
import AppLoader from '../../components/AppLoader/AppLoader';
import {signUpFieldsSchema} from '../../utils/Validations';
import {setScreenName, setUserData} from '../../store/commonSlice';
import {AppScreenName} from '../../navigation/types';
import {useDatabase} from '../../context/DatabaseContext';
import {SCREEN_NAMES} from '../../utils/NavigationUtils';
import {addUser} from '../../services/database/Users';
import Header from '../../components/Header/Header';
import {useAppDispatch} from '../../store/hooks';
import Strings from '../../utils/StringConstants';
import {SignUpPayload} from '../../types/Signup';
import {LOGIN_TYPES, LoginResponse} from '../../types/Login';
import renderSignUpForm from './SignupForm';
import {AsyncKeys} from '../../utils/Keys';
import {IRegister} from './types';
import useStyles from './styles';

const Register = (props: IRegister) => {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();
  const styles = useStyles();
  const {db} = useDatabase();

  const {navigation} = props;

  const initialValue: SignUpPayload = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
  };

    const redirectToHome = (res: LoginResponse) => {
      const {token, email, provider} = res
      setStoredObject(AsyncKeys.LOGIN, res);
      dispatch(setUserData({token, email, provider}));
      dispatch(setScreenName(AppScreenName.Home));
    };

  const onSubmit = async(
    finalValues: SignUpPayload,
    {resetForm}: {resetForm: () => void},
  ) => {
    setIsLoading(true);
    const userData = {
      ...finalValues,
      email: finalValues.email.toLowerCase(),
      password: await hashedPassword(finalValues.password),
      provider: LOGIN_TYPES.EMAIL
    }
    const {email ,provider} = userData
    addUser(db,userData, ()=>{
      resetForm();
      const token = generateLoginToken();
      redirectToHome({token, email, provider})
    },
    () => setIsLoading(false),
    )
  };

  return (
    <View
      pointerEvents={isLoading ? 'none' : 'auto'}
      style={styles.mainContainer}>
      <KeyboardAwareScrollView
        style={styles.container}
        extraHeight={50}
        extraScrollHeight={-300}
        enableOnAndroid={true}
        enableAutomaticScroll={true}
        keyboardShouldPersistTaps={'handled'}
        contentContainerStyle={styles.scrollViewContentContainerStyle}>
        <Header title={Strings.signup} />
        <Formik
          initialValues={initialValue}
          onSubmit={(values, {resetForm}) => onSubmit(values, {resetForm})}
          validationSchema={signUpFieldsSchema}>
          {renderSignUpForm}
        </Formik>
      </KeyboardAwareScrollView>
      <View style={styles.alreadyHaveAccountContainer}>
        <Text style={styles.alreadyHaveAccountText}>
          {Strings.alreadyHaveAccount}
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate(SCREEN_NAMES.Login)}>
          <Text style={[styles.alreadyHaveAccountText, styles.loginText]}>
            {Strings.login}
          </Text>
        </TouchableOpacity>
      </View>
      {isLoading && <AppLoader />}
    </View>
  );
};

export default Register;
