import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import AdminService from '../services/adminService'

const initialState = {
    notificationEmailAddress: "",
    loading: false,
    error: '',
    enableEmailAdressNotifications: false,
    configID : "",
    isLightMode: true,
    currentPage: "/",
    pin: "",
    logs: []
}

export const getAdminData = createAsyncThunk('admin/getAdminData', async () => ( (await (AdminService.getAdmin())).data));

export const getLogs = createAsyncThunk('admin/getLogs', async () => ( (await (AdminService.getLogs())).data));

export const updateAdmin = createAsyncThunk('admin/updateAdmin', async (dto) => (await AdminService.updateAdmin(dto)).data)

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
        setPin: (state, action) => {
            state.pin = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAdminData.pending, (state) => {
            state.loading = true
        });
        builder.addCase(getLogs.pending, (state) => {
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
        builder.addCase(getLogs.fulfilled, (state, action) => {
            const dataObject = action.payload;
            console.log(dataObject);
            state.loading = false
            state.error = ''
            state.logs = dataObject
        });
        builder.addCase(getAdminData.rejected, (state) => {
            state.error = 'an error has occured'
        });
        builder.addCase(getLogs.rejected, (state) => {
            state.error = 'an error has occured'
        });
        builder.addCase(updateAdmin.rejected, (state) => {
            state.error = 'an error has occured'
            state.loading = false

        });
    },
})
export const { setEmailAdressNotifications, setEmailAdress, setIsLightMode, setCurrentPage, setPin } = adminSlice.actions

export default adminSlice.reducer