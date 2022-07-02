import http from './http.service';

class EventService {
  getEvents() {
    return http.get('/api/event');
  }

  deleteEvent(eventId) {
    return http.delete(`/api/event/${eventId}`);
  }

  updateEvent(event) {
    return http.put(`/api/event/${event.id}`, event);
  }

  saveEvent(event) {
    return http.post('/api/event', event);
  }

  checkEvents() {
    return http.get('/api/event/checkEvents');
  }

  deleteEvents(events) {
    return http.post(`/api/event/delete`, events);
  }
}

export default new EventService();
