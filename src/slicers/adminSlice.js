import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import AdminService from '../services/adminService'

const initialState = {
    notificationEmailAdress: "",
    loading: false,
    error: '',
    enableEmailAdressNotifications: false,
    configID : ""
}

export const getAdminData = createAsyncThunk('admin/getAdminData', async () => AdminService.getAdmin());

export const updateAdmin = createAsyncThunk('admin/updateAdmin', async (adminDTO) => AdminService.updateAdmin(adminDTO))

export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setEmailAdressNotifications: (state, value) => {
            state.enableEmailAdressNotifications = value;
        },
        setEmailAdress: (state, value) => {
            state.notificationEmailAdress = value;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAdminData.pending, (state) => {
            state.loading = true
        });
        builder.addCase(getAdminData.fulfilled, (state, action) => {
            state.loading = false
            state.error = ''
            state.notificationEmailAdress = action.payload.notificationEmailAdress
            state.enableEmailAdressNotifications = action.payload.enableEmailAdressNotifications
            state.configID = action.payload.configID
        });
        builder.addCase(getAdminData.rejected, (state) => {
            state.error = 'an error has occured'
        });
    },
})
export const { setEmailAdressNotifications, setEmailAdress } = adminSlice.actions

export default adminSlice.reducer