import http from './http.service';

class AdminService {
    getAdmin() {
        return http.get('/api/settings');
    }

    updateAdmin(dto) {
        return http.put(`/api/settings/${dto.data.id}?pin=${dto.pin}`, dto.data);
    }
}

export default new AdminService();