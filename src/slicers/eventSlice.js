import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import EventService from '../services/eventService'


const initialState = {
    events: [],
    loading: false,
    error: ""
}

export const getEvents = createAsyncThunk('events/getAllEvents', async () => EventService.getEvents())

// ToDo add, edit & delte slicers event slicer

// ToDo make storage persist between page reloads.

export const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {
        setEvents: (state, events) => {
            state.events = events
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getEvents.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getEvents.fulfilled, (state, action) => {
            state.loading = false;
            state.events = action.payload;
        });
        builder.addCase(getEvents.rejected, (state, action) => {
            state.error = "an error has occured"
        });
    },
})

export const { setEvents } = eventSlice.actions

export default eventSlice.reducer