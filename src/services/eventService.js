import http from './http.service';

class EventService {
    getEvents() {
        return http.get('/event');
    }
}

export default new EventService();
