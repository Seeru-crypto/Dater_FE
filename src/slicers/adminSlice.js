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
        setEmailAdressNotifications: (state, action) => {
            state.enableEmailAdressNotifications = !state.enableEmailAdressNotifications;
        },
        setEmailAdress: (state, action) => {
            state.notificationEmailAdress = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAdminData.pending, (state) => {
            state.loading = true
        });
        builder.addCase(getAdminData.fulfilled, (state, action) => {
            const dataObject = action.payload.data[0];
            state.loading = false
            state.error = ''
            state.notificationEmailAdress = dataObject.emailAddress
            state.enableEmailAdressNotifications = dataObject.sendEmails
            state.configID = dataObject.id
        });
        builder.addCase(getAdminData.rejected, (state) => {
            state.error = 'an error has occured'
        });
    },
})
export const { setEmailAdressNotifications, setEmailAdress } = adminSlice.actions

export default adminSlice.reducer