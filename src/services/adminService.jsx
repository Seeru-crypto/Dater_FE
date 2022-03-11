import http from './http.service';

class AdminService {
    getAdmin() {
        return http.get('/api/settings');
    }

    updateAdmin(dto) {
        return http.put(`/api/settings/${dto.data.id}?pin=${dto.pin}`, dto.data);
    }

    getLogs() {
        return http.get('/api/logs');
    }

    getPollerValue() {
        return http.get('/actuator/scheduledtasks');
    }
}

export default new AdminService();