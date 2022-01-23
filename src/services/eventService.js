import http from './http.service';

class EventService {
    getEvents() {
        return http.get('/api/event');
    }

    deleteEvent(eventId) {
        return http.delete(`/api/event/${eventId}`);
    }

    updateEvent(reminderEvent) {
        return http.put('/event', reminderEvent);
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