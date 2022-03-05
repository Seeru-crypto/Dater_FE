import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import AdminService from '../services/adminService'

const initialState = {
    userMailAddress: "",
    loading: false,
    error: '',
    isBackEndLive: false,
    isEmailEnabled: false,
    pollerValue : null,
    configId : "",
    isLightMode: true,
    currentPage: "/",
    pin: "",
    logs: []
}

export const getAdminData = createAsyncThunk('admin/getAdminData', async () => {
    getPollerData();
    return (await (AdminService.getAdmin())).data;
});
export const getServerStatus = createAsyncThunk('admin/getServerStatus', async () =>  ( (await (AdminService.getServerStatus())).data));

const getPollerData  = createAsyncThunk("admin/getPollerData", async () => {
    AdminService.getPollerValue();
})

export const getLogs = createAsyncThunk('admin/getLogs', async () => ( (await (AdminService.getLogs())).data));

export const updateAdmin = createAsyncThunk('admin/updateAdmin', async (dto) => (await AdminService.updateAdmin(dto)).data)

export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setEmailAdressNotifications: (state) => {
            state.isEmailEnabled = !state.isEmailEnabled;
        },
        setEmailAdress: (state, action) => {
            state.userMailAddress = action.payload;
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
            state.userMailAddress = dataObject.emailAddress
            state.isEmailEnabled = dataObject.isEmailActive
            state.configId = dataObject.id
        });
        builder.addCase(getLogs.fulfilled, (state, action) => {
            const dataObject = action.payload;
            state.loading = false
            state.error = ''
            console.log({dataObject})
            state.logs = dataObject
        });
        builder.addCase(getPollerData.fulfilled, (state, action) => {
            console.log("action ", action.payload);
            // Format incomming value to minutes!
            // state.pollerValue =
        });
        builder.addCase(getServerStatus.fulfilled, (state, action) => {
            // console.log("action ", action.payload);
            const status = action.payload.fixedRate[0].interval;
            console.log({status});
            state.isBackEndLive = status;
            if (!status) state.error = "Back-end down";
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