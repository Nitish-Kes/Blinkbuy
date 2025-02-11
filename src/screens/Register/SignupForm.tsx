import React, {useState} from 'react';
import {FormikProps} from 'formik';
import {View} from 'react-native';

import {SignUpPayload} from '../../types/Signup';
import AppInput from '../../components/AppInput/AppInput';
import Strings from '../../utils/StringConstants';
import AppButton from '../../components/AppButton/AppButton';
import useStyles from './styles';

const renderSignUpForm = ({
  errors,
  values,
  handleBlur,
  handleChange,
  touched,
  setFieldTouched,
  handleSubmit,
}: FormikProps<SignUpPayload>) => {
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const styles = useStyles();
  return (
    <View style={styles.form}>
      <AppInput
        placeholder={Strings.firstName}
        onChangeText={handleChange('firstName')}
        errorMessage={
          (touched.firstName || focusedField === 'firstName') &&
          errors.firstName !== ''
            ? errors.firstName
            : ''
        }
        onBlur={() => {
          handleBlur('firstName');
          setFocusedField(null);
          setFieldTouched('firstName', true);
        }}
        onFocus={() => setFocusedField('firstName')}
        isFocused={focusedField === 'firstName'}
        value={values.firstName}
      />
      <AppInput
        placeholder={Strings.lastName}
        onChangeText={handleChange('lastName')}
        errorMessage={
          (touched.lastName || focusedField === 'lastName') &&
          errors.lastName !== ''
            ? errors.lastName
            : ''
        }
        onFocus={() => setFocusedField('lastName')}
        onBlur={() => {
          handleBlur('lastName');
          setFocusedField(null);
          setFieldTouched('lastName', true);
        }}
        isFocused={focusedField === 'lastName'}
        value={values.lastName}
      />
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
        placeholder={Strings.phoneNumber}
        onChangeText={handleChange('phone')}
        errorMessage={
          (touched.phone || focusedField === 'phone') && errors.phone !== ''
            ? errors.phone
            : ''
        }
        onFocus={() => setFocusedField('phone')}
        onBlur={() => {
          handleBlur('phone');
          setFocusedField(null);
          setFieldTouched('phone', true);
        }}
        isFocused={focusedField === 'phone'}
        keyboardType={'phone-pad'}
        value={values.phone}
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
        title={Strings.signup}
        onPress={handleSubmit}
        buttonStyle={styles.buttonStyle}
      />
    </View>
  );
};

export default renderSignUpForm;
