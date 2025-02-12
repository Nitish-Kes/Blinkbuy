import {useState} from 'react';
import {View} from 'react-native';
import {FormikProps} from 'formik';

import AppInput from '../../components/AppInput/AppInput';
import AppButton from '../../components/AppButton/AppButton';
import {LoginPayload} from '../../types/Login';
import Strings from '../../utils/StringConstants';
import useStyles from './styles';

const renderLoginForm = ({
  errors,
  values,
  handleBlur,
  handleChange,
  touched,
  setFieldTouched,
  handleSubmit,
}: FormikProps<LoginPayload>) => {
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const styles = useStyles();
  return (
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
};

export default renderLoginForm;
