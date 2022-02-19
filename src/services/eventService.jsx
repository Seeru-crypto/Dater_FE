import http from './http.service';

class EventService {
    getEvents() {
        return http.get('/api/events');
    }

    deleteEvent(eventId) {
        return http.delete(`/api/events/${eventId}`);
    }

    updateEvent(reminderEvent) {
        return http.put(`/event/${reminderEvent.id}`, reminderEvent);
    }

    saveEvent(reminderEvent) {
        return http.post('/api/events', reminderEvent);
    }

    checkEvents() {
        return http.get('/api/events/checkEvents');
    }

    deleteEvents(events) {
        return http.post(`/events/delete`, events);
    }
}

export default new EventService();