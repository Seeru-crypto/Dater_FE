import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import AdminService from '../services/adminService'

const initialState = {
    notificationEmailAddress: "",
    loading: false,
    error: '',
    enableEmailAdressNotifications: false,
    configID : "",
    isLightMode: true,
    currentPage: "/"
}

export const getAdminData = createAsyncThunk('admin/getAdminData', async () => ( (await (AdminService.getAdmin())).data));

export const updateAdmin = createAsyncThunk('admin/updateAdmin', async (adminDTO) => (await AdminService.updateAdmin(adminDTO)).data)

export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setEmailAdressNotifications: (state) => {
            state.enableEmailAdressNotifications = !state.enableEmailAdressNotifications;
        },
        setEmailAdress: (state, action) => {
            state.notificationEmailAdress = action.payload;
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        setIsLightMode: (state, action) => {
            state.isLightMode = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAdminData.pending, (state) => {
            state.loading = true
        });
        builder.addCase(getAdminData.fulfilled, (state, action) => {
            const dataObject = action.payload[0];
            state.loading = false
            state.error = ''
            state.notificationEmailAdress = dataObject.emailAddress
            state.enableEmailAdressNotifications = dataObject.sendEmails
            state.configID = dataObject.id
        });
        builder.addCase(getAdminData.rejected, (state) => {
            state.error = 'an error has occured'
        });
        builder.addCase(updateAdmin.rejected, (state) => {
            state.error = 'an error has occured'
            state.loading = false

        });
    },
})
export const { setEmailAdressNotifications, setEmailAdress, setIsLightMode, setCurrentPage } = adminSlice.actions

export default adminSlice.reducer