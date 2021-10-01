export class CustomerService {
    getCustomersLarge() {
        return fetch('customers-large.json')
            .then((res) => res.json())
            .then((d) => d.data);
    }

    getUserData() {
        return fetch('db.json')
            .then((res) => res.json())
            .then((d) => d);
    }
}
