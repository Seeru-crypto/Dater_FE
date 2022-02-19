import http from './http.service';

class AdminService {
    getAdmin() {
        return http.get('/api/settings');
    }

    updateAdmin(adminDTO) {
        return http.put(`/api/settings/${adminDTO.id}`, adminDTO);
    }
}

export default new AdminService();