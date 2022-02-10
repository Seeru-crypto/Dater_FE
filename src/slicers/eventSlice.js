import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import EventService from '../services/eventService'

const initialState = {
    events: [],
    loading: false,
    error: '',
    eventDetails: {}
}

// ToDo create selected event Reducer and implement it in Add event & event detail components.

export const getEvents = createAsyncThunk('events/getAllEvents', async () => (await (EventService.getEvents())).data);

export const deleteEvent = createAsyncThunk('events/deleteEvent', async (eventId) => (await EventService.deleteEvent(eventId)).data)

export const deleteEvents = createAsyncThunk('events/deleteEvents', async (events) => (await EventService.deleteEvents(events)).data);

export const saveUpdatedEvent = createAsyncThunk('events/updateEvent', async (reminderEvent) => (await EventService.updateEvent(reminderEvent)).data)

export const createEvent = createAsyncThunk('events/createEvent', async (reminderEvent) => (await EventService.createEvent(reminderEvent)).data)

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
            state.events = action.payload
        });
        builder.addCase(getEvents.rejected, (state) => {
            state.error = 'an error has occured'
        });
    },
})
export const { setEventDetails } = eventSlice.actions

export default eventSlice.reducer