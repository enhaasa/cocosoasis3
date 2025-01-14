import { ServiceClient } from "./ServiceClient";

// Types
import type { TCharacter, TRealm, TDiningItem } from "@enhasa/kiwicore";

export class KiwiClient {
    private baseUrl = window.location.hostname === 'localhost' 
    ? 'http://localhost:8000'
    : `${window.location.origin}/backend`;

    private client = new ServiceClient(this.baseUrl);
    private endpoint = 'kiwi.php';

    public async getRealm(): Promise<TRealm> {
        const target = `${this.endpoint}?type=realm`;

        return (await this.client.get(target, true))?.[0];
    }

    public async getMenu(): Promise<TDiningItem[]> {
        const target = `${this.endpoint}?type=menu`;

        return await this.client.get(target, true);
    }

    public async getStaff(): Promise<TCharacter[]> {
        const target = `${this.endpoint}?type=staff`;

        return await this.client.get(target, true);
    }

    public async getSpecialItem(categoryId: number): Promise<TDiningItem> {
        const target = `${this.endpoint}?type=specialMenuItem&category_id=${categoryId}`;

        return await this.client.get(target, true);
    }
}