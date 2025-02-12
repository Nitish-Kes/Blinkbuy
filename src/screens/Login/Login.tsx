import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {View, Text, TouchableOpacity} from 'react-native';
import {Formik} from 'formik';
import {useState} from 'react';

import Strings from '../../utils/StringConstants';
import {FacebookIcon, GoogleIcon, MicrosoftIcon} from '../../assets/svg';
import AppButton from '../../components/AppButton/AppButton';
import {loginFieldSchema} from '../../utils/Validations';
import {SCREEN_NAMES} from '../../utils/NavigationUtils';
import {useDatabase} from '../../context/DatabaseContext';
import {
  userLogin,
  userSocialLogin,
} from '../../services/database/Users';
import {generateLoginToken, setStoredObject, storeData} from '../../utils/DataUtils';
import {LOGIN_TYPES, LoginPayload, LoginResponse} from '../../types/Login';
import {setScreenName, setUserData} from '../../store/commonSlice';
import {googleAuthHandler} from '../../utils/socialAuthHandler';
import AppLoader from '../../components/AppLoader/AppLoader';
import {AppScreenName} from '../../navigation/types';
import Header from '../../components/Header/Header';
import {useAppDispatch} from '../../store/hooks';
import {AsyncKeys} from '../../utils/Keys';
import renderLoginForm from './LoginForm';
import {Ilogin} from './types';
import useStyles from './styles';

const Login = (props: Ilogin): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const {db} = useDatabase();
  const styles = useStyles();

  const initialValue: LoginPayload = {
    email: '',
    password: '',
  };

  const {navigation} = props;

  const redirectToHome = (res: LoginResponse) => {
    const {token, email, provider} = res
    setStoredObject(AsyncKeys.LOGIN, res);
    dispatch(setUserData({token, email, provider}));
    dispatch(setScreenName(AppScreenName.Home));
  };

  const handleGoogleSignin = async () => {
    setIsLoading(true);
    const userData = await googleAuthHandler();
    if(userData){
      const {idToken: token, provider, ...userInfo} = userData
      userSocialLogin(db, userInfo, () => {
        redirectToHome({email: userInfo?.email,token,provider})
      })
    }
    setIsLoading(false)
  };

  const onSubmit = (
    finalValues: LoginPayload,
    {resetForm}: {resetForm: () => void},
  ) => {
    setIsLoading(true);
    const userData = {
      ...finalValues,
      email: finalValues.email.toLowerCase(),
      provider: LOGIN_TYPES.EMAIL
    }
    const {email, provider} = userData
    userLogin(db, userData,()=>{
      resetForm();
      const token = generateLoginToken();
      redirectToHome({token,email,provider})
    },
    () => setIsLoading(false)
  ) 
  };

  return (
    <View style={styles.mainContainer}>
      <KeyboardAwareScrollView style={styles.container}>
        <Header title={Strings.login} />
        <Formik
          initialValues={initialValue}
          onSubmit={(values, {resetForm}) => onSubmit(values, {resetForm})}
          validationSchema={loginFieldSchema}>
          {renderLoginForm}
        </Formik>
        <View style={styles.lineContainer}>
          <View style={styles.line} />
          <Text style={styles.orTextStyle}>{Strings.or}</Text>
          <View style={styles.line} />
        </View>
        <AppButton
          title={Strings.continuewithGoogle}
          icon={<GoogleIcon />}
          onPress={handleGoogleSignin}
          buttonStyle={styles.socialSignInButton}
          titleStyle={styles.socialSignInButtonTitle}
        />
         <AppButton
          title={Strings.continuewithfacebook}
          icon={<FacebookIcon />}
          onPress={() => {}}
          buttonStyle={styles.socialSignInButton}
          titleStyle={styles.socialSignInButtonTitle}
        />
        <AppButton
          title={Strings.continuewithMicrosoft}
          icon={<MicrosoftIcon />}
          onPress={() => {}}
          buttonStyle={styles.socialSignInButton}
          titleStyle={styles.socialSignInButtonTitle}
        />
      </KeyboardAwareScrollView>
      <View style={styles.newUserContainer}>
        <Text style={styles.newUserText}>{Strings.newUser}</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate(SCREEN_NAMES.Register)}>
          <Text style={[styles.newUserText, styles.registerText]}>
            {Strings.signup}
          </Text>
        </TouchableOpacity>
      </View>
      {isLoading && <AppLoader />}
    </View>
  );
};

export default Login;
