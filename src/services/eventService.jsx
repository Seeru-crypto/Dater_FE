import http from './http.service';

class EventService {
  getEvents() {
    return http.get('/api/events');
  }

  deleteEvent(eventId) {
    return http.delete(`/api/events/${eventId}`);
  }

  updateEvent(event) {
    return http.put(`/api/events/${event.id}`, event);
  }

  saveEvent(event) {
    return http.post('/api/events', event);
  }

  checkEvents() {
    return http.get('/api/events/checkEvents');
  }

  deleteEvents(events) {
    return http.post(`/api/events/delete`, events);
  }
}

export default new EventService();
