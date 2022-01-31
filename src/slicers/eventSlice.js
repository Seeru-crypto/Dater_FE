import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import EventService from '../services/eventService'

const initialState = {
    events: [],
    loading: false,
    error: '',
    eventDetails: {}
}

// ToDo create selected event Reducer and implement it in Add event & event detail components.

export const getEvents = createAsyncThunk('events/getAllEvents', async () => EventService.getEvents())

export const deleteEvent = createAsyncThunk('events/deleteEvent', async (eventId) => EventService.deleteEvent(eventId))

export const saveUpdatedEvent = createAsyncThunk('events/updateEvent', async (reminderEvent) => EventService.updateEvent(reminderEvent))

export const createEvent = createAsyncThunk('events/createEvent', async (reminderEvent) => EventService.createEvent(reminderEvent))

export const checkEvents = createAsyncThunk('events/checkEvents', async () => EventService.checkEvents())

export const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {
        setEventDetails: (state, action) => {
            state.eventDetails = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getEvents.pending, (state) => {
            state.loading = true
        });
        builder.addCase(getEvents.fulfilled, (state, action) => {
            state.loading = false
            state.error = ''
            state.events = action.payload.data
        });
        builder.addCase(getEvents.rejected, (state) => {
            state.error = 'an error has occured'
        });
    },
})
export const { setEventDetails } = eventSlice.actions

export default eventSlice.reducer