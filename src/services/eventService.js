import http from './http.service';

class EventService {
    getEvents() {
        return http.get('/api/event');
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
        console.log('getting by ID')
        return http.get(`/event/${eventId}`);
    }

    checkEvents() {
        return http.get('/checkEvents');
    }
}

export default new EventService();