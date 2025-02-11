import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {View, Text, TouchableOpacity} from 'react-native';
import {Formik, FormikProps} from 'formik';
import {useState} from 'react';

import Strings from '../../utils/StringConstants';
import {AppleIcon, GoogleIcon, MicrosoftIcon} from '../../assets/svg';
import AppButton from '../../components/AppButton/AppButton';
import {loginFieldSchema} from '../../utils/Validations';
import AppInput from '../../components/AppInput/AppInput';
import {SCREEN_NAMES} from '../../utils/NavigationUtils';
import {useDatabase} from '../../context/DatabaseContext';
import {userLogin} from '../../services/database/Users';
import {
  generateLoginToken,
  hashedPassword,
  storeData,
} from '../../utils/DataUtils';
import AppLoader from '../../components/AppLoader/AppLoader';
import {useAppDispatch} from '../../store/hooks';
import {setScreenName, setUserData} from '../../store/commonSlice';
import {AppScreenName} from '../../navigation/types';
import Header from '../../components/Header/Header';
import {LoginPayload, LoginResponse} from '../../types/Login';
import {AsyncKeys} from '../../utils/Keys';
import {Ilogin} from './types';
import useStyles from './styles';

const Login = (props: Ilogin): JSX.Element => {
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const {db} = useDatabase();
  const styles = useStyles();

  const initialValue: LoginPayload = {
    email: '',
    password: '',
  };

  const {navigation} = props;

  const renderLoginForm = ({
    errors,
    values,
    handleBlur,
    handleChange,
    touched,
    setFieldTouched,
    handleSubmit,
  }: FormikProps<LoginPayload>) => (
    <View>
      <AppInput
        placeholder={Strings.emailAddress}
        onChangeText={handleChange('email')}
        errorMessage={
          (touched.email || focusedField === 'email') && errors.email !== ''
            ? errors.email
            : ''
        }
        onFocus={() => setFocusedField('email')}
        onBlur={() => {
          handleBlur('email');
          setFocusedField(null);
          setFieldTouched('email', true);
        }}
        isFocused={focusedField === 'email'}
        keyboardType={'email-address'}
        value={values.email}
      />
      <AppInput
        placeholder={Strings.password}
        onChangeText={handleChange('password')}
        errorMessage={
          (touched.password || focusedField === 'password') &&
          errors.password !== ''
            ? errors.password
            : ''
        }
        onFocus={() => setFocusedField('password')}
        onBlur={() => {
          handleBlur('password');
          setFocusedField(null);
          setFieldTouched('password', true);
        }}
        isFocused={focusedField === 'password'}
        value={values.password}
        isPassword={true}
      />
      <AppButton
        title={Strings.login}
        onPress={handleSubmit}
        buttonStyle={styles.buttonStyle}
      />
    </View>
  );

  const redirectToHome = (res: LoginResponse) => {
    dispatch(setUserData({token: res?.token}));
    dispatch(setScreenName(AppScreenName.Home));
  };

  const onSubmit = (
    finalValues: LoginPayload,
    {resetForm}: {resetForm: () => void},
  ) => {
    setIsLoading(true);
    if (db) {
      userLogin(
        db,
        {
          ...finalValues,
          email: finalValues.email.toLowerCase(),
        },
        () => {
          setTimeout(() => {
            resetForm();
            const token = generateLoginToken();
            storeData(AsyncKeys.LOGIN, token);
            redirectToHome({token});
            setIsLoading(false);
          }, 1000);
        },
        () => setIsLoading(false),
      );
    }
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
        <AppButton
          title={Strings.continuewithapple}
          icon={<AppleIcon />}
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
