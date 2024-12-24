import { ServiceClient } from "./ServiceClient";

export class DiscordClient {
    private baseUrl = window.location.hostname === 'localhost' 
    ? 'http://localhost:8000'
    : `${window.location.origin}/backend`;

    private client = new ServiceClient(this.baseUrl);
    private endpoint = 'discord.php';

    public async getEvents() {
        const target = `${this.endpoint}?type=events`;
        
        return await this.client.get(target, true);
    }
}