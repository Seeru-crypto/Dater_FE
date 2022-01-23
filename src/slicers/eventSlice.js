import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import EventService from '../services/eventService'

const initialState = {
    events: [],
    loading: false,
    error: '',
}

export const getEvents = createAsyncThunk('events/getAllEvents', async () => EventService.getEvents())

export const getEventByID = createAsyncThunk('events/getEventByID', async (eventId, thunkApi) => {
    EventService.getEventById(eventId).then(dateEvent => thunkApi.dispatch(replaceEvent(dateEvent.data.payload)));
})

export const deleteEvent = createAsyncThunk('events/deleteEvent', async (eventId) => EventService.deleteEvent(eventId))

export const updateEvent = createAsyncThunk('events/updateEvent', async (reminderEvent) => EventService.updateEvent(reminderEvent))

export const createEvent = createAsyncThunk('events/createEvent', async (reminderEvent) => EventService.createEvent(reminderEvent))

export const checkEvents = createAsyncThunk('events/checkEvents', async () => EventService.checkEvents())


// ToDo Integrate existing slicers into main code
// replacing existing API calls
// Add styled components to main code


export const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {
        setEvents: (state, events) => {
            state.events = events
        },
        addEvent: (state, event) => {
            if (event) state.events.push(event)
        },
        replaceEvent: (state, event) => {
            console.log(event)
            state.events = state.events.map(dateEvent => {
                console.log('date event is ', dateEvent)
                if (event.id === dateEvent.id) return event
                return dateEvent
            })
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getEvents.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getEvents.fulfilled, (state, action) => {
            state.loading = false
            state.error = ''
            state.events = action.payload.data
        })
        builder.addCase(getEvents.rejected, (state) => {
            state.error = 'an error has occured'
        })

    },
})
export const { setEvents, addEvent, replaceEvent } = eventSlice.actions

export default eventSlice.reducer