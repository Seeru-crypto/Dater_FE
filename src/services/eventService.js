import http from './http.service';

class EventService {
    getEvents() {
        return http.get('/event');
    }

    deleteEvent(eventId) {
        return http.delete(`'/event'/${eventId}`);
    }

    updateEvent(reminderEvent) {
        return http.put('/event', reminderEvent);
    }

    createEvent(reminderEvent) {
        return Promise.resolve(undefined)
    }

    getEventById(eventId) {
        return http.get(`'/event'/${eventId}`);
    }
}

export default new EventService();