import React from 'react'
import {View,Text} from 'react-native'
import {removeData } from '../../utils/DataUtils'
import AppButton from '../../components/AppButton/AppButton'
import { useAppDispatch } from '../../store/hooks'
import { setScreenName, setUserData } from '../../store/commonSlice'
import { AppScreenName } from '../../navigation/types'
import { AsyncKeys } from '../../utils/Keys'

const Home = () => {
    const dispatch = useAppDispatch()

    const redirectToLogin = () => {
        removeData(AsyncKeys.LOGIN)
        dispatch(setUserData(null))
        dispatch(setScreenName(AppScreenName.Auth))
    }
    return (
        <View>
            <Text>Home Screen</Text>
            <AppButton 
                title='Logout' 
                onPress={()=>{
                    redirectToLogin()
                }} 
            />
        </View>
    )
}

export default Home