import http from './http.service';

class EventService {
    getEvents() {
        return http.get('/event');
    }

    deleteEvent(eventId) {
        return Promise.resolve(undefined)
    }

    updateEvent(reminderEvent) {
        return Promise.resolve(undefined)
    }

    createEvent(reminderEvent) {
        return Promise.resolve(undefined)
    }

    getEventById() {
        return Promise.resolve(undefined)
    }
}

export default new EventService();