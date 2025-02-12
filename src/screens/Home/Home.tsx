import React from 'react'
import {View,Text} from 'react-native'
import {getStoredObject, removeData } from '../../utils/DataUtils'
import AppButton from '../../components/AppButton/AppButton'
import { useAppDispatch } from '../../store/hooks'
import { setScreenName, setUserData } from '../../store/commonSlice'
import { AppScreenName } from '../../navigation/types'
import { AsyncKeys } from '../../utils/Keys'
import { socialLogout } from '../../utils/socialAuthHandler'

const Home = () => {
    const dispatch = useAppDispatch()

    const redirectToLogin = async() => {
        const loginData = await getStoredObject(AsyncKeys.LOGIN)
        removeData(AsyncKeys.LOGIN)
        socialLogout(loginData?.provider)
        
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