import { ServiceClient } from "./ServiceClient";

export class KiwiClient {
    private baseUrl = window.location.hostname === 'localhost' 
    ? 'http://localhost:8000'
    : `${window.location.origin}/backend`;

    private client = new ServiceClient(this.baseUrl);
    private endpoint = 'kiwi.php';

    public async getMenu() {
        const target = `${this.endpoint}?type=menu`;

        return await this.client.get(target, true);
    }

    public async getStaff() {
        const target = `${this.endpoint}?type=staff`;

        return await this.client.get(target, true);
    }

    public async getSpecialItem(categoryId: number) {
        const target = `${this.endpoint}?type=specialMenuItem&category_id=${categoryId}`;

        return await this.client.get(target, true);
    }
}