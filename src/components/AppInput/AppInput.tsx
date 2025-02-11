import React, { useState } from "react"
import { Input } from '@rneui/themed';

import { IAppInput } from "./types";
import useStyles from "./styles"
import { EyeClosedIcon, EyeIcon } from "../../assets/svg";
import { Colors } from "../../utils/Colors";
import AppButton from "../AppButton/AppButton";

const AppInput = (props: IAppInput) => { 
    const {
        label,
        labelStyle,
        placeholder,
        placeholderTextColor=Colors.suvaGrey,
        containerStyle,
        inputContainerStyle,
        inputStyle,
        value='',
        onChangeText,
        isPassword = false,
        keyboardType='default',
        errorMessage='',
        onFocus,
        onBlur,
        renderErrorMessage = false,
        isFocused,
        rightIcon
    } = props

    const [isSecure,setIsSecure] = useState<boolean| undefined>(false)
    const styles = useStyles({isError: errorMessage !== '',isFocused: isFocused})

    return(
       <Input
            label={label}
            labelStyle={[styles.text,labelStyle]}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            containerStyle={[styles.container, containerStyle]}
            inputContainerStyle={[styles.textInputContainer,inputContainerStyle]}
            inputStyle={[styles.inputStyle,inputStyle]}
            secureTextEntry={isPassword && isSecure}
            value={value}
            onChangeText={onChangeText}
            keyboardType={keyboardType}
            renderErrorMessage={renderErrorMessage}
            errorMessage={errorMessage !== '' && errorMessage}
            errorStyle={styles.errorTextColor}
            onBlur={onBlur}
            onFocus={onFocus}
            rightIcon={isPassword ?
                <AppButton
                 icon={isSecure? <EyeClosedIcon/> : <EyeIcon/>}
                 onPress={()=>setIsSecure(!isSecure)}
                 buttonStyle={styles.eyeIconStyle}
                /> 
                :rightIcon}
            {...props}
       />
    )
}

export default AppInput