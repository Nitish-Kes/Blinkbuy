import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin"
import { GOOGLE_WEB_CLIENT_ID } from "./socialAuthConstant"
import { GoogleLoginResponse, LOGIN_TYPES } from "../types/Login"

export const googleAuthHandler = async() => {
    GoogleSignin.configure({
        webClientId: GOOGLE_WEB_CLIENT_ID,
        forceCodeForRefreshToken: false,
    })
    try{
        await GoogleSignin.hasPlayServices({
            showPlayServicesUpdateDialog: true,
        })
        const signInInfo = await GoogleSignin.signIn();

        if(signInInfo?.data){
            const {idToken} = signInInfo?.data
            const {givenName,familyName,email} = signInInfo?.data?.user
            const payload: GoogleLoginResponse = {
                firstName: givenName,
                lastName: familyName,
                email: email,
                provider: LOGIN_TYPES.GOOGLE,
                idToken: idToken
            }
            return payload
        }
    }
    catch(error: any){
        if(error.code === statusCodes.SIGN_IN_CANCELLED){
            throw new Error('The user canceled the signin request.');
        }
        else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            throw new Error('Play services not available or outdated');
        } 
        else {
            throw error;
        }
    }
}

export const socialLogout = async(provider: LOGIN_TYPES) => {
    switch(provider){
        case LOGIN_TYPES.GOOGLE:
            try {
                await GoogleSignin.revokeAccess();
                await GoogleSignin.signOut(); 
                console.log("Google logout successful");
            } catch (error) {
                console.error("Error during Google logout:", error);
            }
            break;
        default:
            break;
    }
}