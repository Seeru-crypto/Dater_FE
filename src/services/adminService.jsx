import http from './http.service';

class AdminService {
  static getAdmin() {
    return http.get('/api/settings');
  }

  static updateAdmin(dto) {
    return http.put(`/api/settings/${dto.data.id}?pin=${dto.pin}`, dto.data);
  }

  static getLogs() {
    return http.get('/api/logs');
  }

  static getPollerValue() {
    return http.get('/actuator/scheduledtasks');
  }
}

export default new AdminService();
