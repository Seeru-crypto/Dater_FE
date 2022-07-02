import http from './http.service';

class AdminService {
  getAdmin() {
    return http.get('/api/setting');
  }

  updateAdmin(dto) {
    return http.put(`/api/setting/${dto.data.id}?pin=${dto.pin}`, dto.data);
  }

  getLogs() {
    return http.get('/api/log');
  }

  getPollerValue() {
    return http.get('/actuator/scheduledtasks');
  }
}

export default new AdminService();
