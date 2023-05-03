import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IAlert {
    message: string
    type: 'error' | 'success' | 'warning' | 'info'
}

interface IAppState {
    alert: IAlert | null
    mode: 'light' | 'dark'
    loading: boolean
}

const initialState: IAppState = {
    alert: null,
    mode: 'light',
    loading: false,
}

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setAlert(state, action: PayloadAction<IAlert>) {
            state.alert = action.payload
        },
        clearAlert(state) {
            state.alert = null
        },
        setMode(state, action: PayloadAction<'light' | 'dark'>) {
            state.mode = action.payload
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload
        },
    },
})

export const { setAlert, clearAlert, setMode, setLoading } = appSlice.actions
export const appState = (state: { app: IAppState }) => state.app
export default appSlice.reducer
