import * as Yup from 'yup';
import Strings from './StringConstants';

export const signUpFieldsSchema = Yup.object().shape({
 firstName: Yup.string()
    .trim()
    .required(Strings.firstNameRequired)
    .matches(/^[A-Za-z]+$/, Strings.firstNameMatch)
    .min(2,Strings.firstNameMinLength)
    .max(20,Strings.firstNameMaxLength),
 lastName: Yup.string()
    .trim()
    .required(Strings.lastNameRequired)
    .matches(/^[A-Za-z]+$/, Strings.lastNameMatch)
    .min(2,Strings.lastNameMinLength)
    .max(20, Strings.lastNameMaxLength),
  email: Yup.string()
    .trim()
    .required(Strings.emailRequired)
    .email(Strings.invalidEmail)
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,Strings.emailMustBeValidFormat),
  phone: Yup.string()
    .trim() 
    .required(Strings.phoneRequired)
    .matches(/^[6-9]\d{9}$/, Strings.phoneNumberMatch),
  password: Yup.string()
    .trim()
    .required(Strings.passwordRequired)
    .min(8, Strings.passwordMinLength)
    .matches(/[a-z]/, Strings.passwordSmallLetterMatch)
    .matches(/[A-Z]/, Strings.passwordCapitalLetterMatch)
    .matches(/[0-9]/, Strings.passwordNumberMatch)
    .matches(/[!@#$%^&*]/, Strings.passwordSpecialCharactersMatch),
});

export const loginFieldSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .required(Strings.emailRequired)
    .email(Strings.invalidEmail)
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,Strings.emailMustBeValidFormat),
  password: Yup.string()
    .trim()
    .required(Strings.passwordRequired)
})
