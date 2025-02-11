import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppScreenName } from "../navigation/types";
import { LoginResponse } from "../types/Login";

export interface CommonState {
    user?: LoginResponse | null,
    screenName: AppScreenName
}

const initialState: CommonState = {
    user: null,
    screenName: AppScreenName.Auth
}

const commonSlice = createSlice({
    name: 'commonSlice',
    initialState,
    reducers: {
        setUserData : (state,action: PayloadAction<LoginResponse | null>) => {
            state.user = action.payload
        },
        setScreenName: (state,action: PayloadAction<AppScreenName>) => {
            state.screenName = action.payload
        }
    }
})

export const {setUserData,setScreenName} = commonSlice.actions

export default commonSlice.reducer