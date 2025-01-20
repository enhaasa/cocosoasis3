import { ServiceClient } from "./ServiceClient";

// Types
import type { TCharacter, TRealm, TDiningItem, TSeating } from "@enhasa/kiwicore";

export class KiwiClient {
    private baseUrl = window.location.hostname === 'localhost' 
    ? 'http://localhost:8000'
    : `${window.location.origin}/backend`;

    private client = new ServiceClient(this.baseUrl);
    private endpoint = 'kiwi.php';

    public async getRealm(): Promise<TRealm> {
        const url = `${this.endpoint}?type=realm`;

        return (await this.client.get(url, true))?.[0];
    }

    public async getMenu(): Promise<TDiningItem[]> {
        const url = `${this.endpoint}?type=menu`;

        return await this.client.get(url, true);
    }

    public async getStaff(): Promise<TCharacter[]> {
        const url = `${this.endpoint}?type=staff`;

        return await this.client.get(url, true);
    }

    public async getSeatings(): Promise<TSeating[]> {
        const url = `${this.endpoint}?type=seatings`;

        return await this.client.get(url, true);
    }

    public async getSpecialItem(categoryId: number): Promise<TDiningItem> {
        const url = `${this.endpoint}?type=specialMenuItem&category_id=${categoryId}`;

        return await this.client.get(url, true);
    }
}