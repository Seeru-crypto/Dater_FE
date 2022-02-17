import http from './http.service';

class EventService {
    getEvents() {
        return http.get('/api/events');
    }

    deleteEvent(eventId) {
        return http.delete(`/event/${eventId}`);
    }

    updateEvent(reminderEvent) {
        return http.put(`/event/${reminderEvent.id}`, reminderEvent);
    }

    createEvent(reminderEvent) {
        return http.post('/event', reminderEvent);
    }

    getEventById(eventId) {
        return http.get(`/event/${eventId}`);
    }

    checkEvents() {
        return http.get('/api/checkEvents');
    }

    deleteEvents(events) {
        return http.post(`/event/delete`, events);
    }

}

export default new EventService();