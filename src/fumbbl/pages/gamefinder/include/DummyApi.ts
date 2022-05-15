import IBackendApi from "./IBackendApi";
import Axios from "axios";
import { UserSettings, Coach } from "./Interfaces";

export default class DummyApi implements IBackendApi {
    readonly dummyApiDomain = 'http://localhost:3000';

    private getFullApiEndPointUrl(endPoint: string): string {
        return this.dummyApiDomain + endPoint;
    }

    public async activate(): Promise<void> {
        await Axios.post(this.getFullApiEndPointUrl('/api/gamefinder/activate'));
    }

    public async getState(): Promise<any> {
        const result = await Axios.post(this.getFullApiEndPointUrl('/api/gamefinder/state'));
        return result.data;
    }

    public async allTeams(coachName: string): Promise<any[]> {
        const result = await Axios.post(this.getFullApiEndPointUrl('/api/gamefinder/canlfg/' + coachName));
        return result.data;
    }

    public async rosterData(teamId: number): Promise<any> {
        const result = await Axios.post(this.getFullApiEndPointUrl('/api/team/get/' + teamId));
        return result.data;
    }

    public async rosterSettings(rosterId: number): Promise<any> {
        const result = await Axios.post(this.getFullApiEndPointUrl('/api/roster/get/' + rosterId));
        return result.data;
    }

    public addAllTeams(): void {
        Axios.post(this.getFullApiEndPointUrl('/api/gamefinder/addallteams'));
    }

    public removeAllTeams(): void {
        Axios.post(this.getFullApiEndPointUrl('/api/gamefinder/removeallteams'));
    }

    public addTeam(id: number): void {
        Axios.post(this.getFullApiEndPointUrl('/api/gamefinder/addteam/' + id));
    }

    public removeTeam(id: number): void {
        Axios.post(this.getFullApiEndPointUrl('/api/gamefinder/removeteam/' + id));
    }

    public async sendOffer(myTeamId: number, opponentTeamId: number): Promise<void> {
        await Axios.post(this.getFullApiEndPointUrl('/api/gamefinder/offer/' + myTeamId + '/' + opponentTeamId));
    }

    public cancelOffer(myTeamId: number, opponentTeamId: number): void {
        Axios.post(this.getFullApiEndPointUrl('/api/gamefinder/canceloffer/' + myTeamId + '/' + opponentTeamId));
    }

    public startGame(myTeamId: number, opponentTeamId: number): void {
        Axios.post(this.getFullApiEndPointUrl('/api/gamefinder/startgame/' + myTeamId + '/' + opponentTeamId));
    };

    public async getUserSettings(): Promise<UserSettings> {
        const hiddenCoachesResult = await Axios.get(this.getFullApiEndPointUrl('/api/coach/gethidden'));

        // workaround for id being a string
        const hiddenCoachesResultData: {id: string, name: string}[] = hiddenCoachesResult.data;
        const hiddenCoaches: Coach[] = [];
        for (const coachWithWrongType of hiddenCoachesResultData) {
            hiddenCoaches.push({
                id: ~~coachWithWrongType.id,
                name: coachWithWrongType.name,
                ranking: 'unknown',
            });
        }
        // end of workaround for id being a string

        return {
            audio: true,
            hiddenCoaches: hiddenCoaches,
        };
    }

    public async updateUserSetting(settingKey: string, settingValue: boolean | string | number): Promise<void> {
    }

    public async hideCoach(coachName: string): Promise<void> {
        await Axios.post(this.getFullApiEndPointUrl('/api/coach/hide/' + coachName));
    }

    public async unhideCoach(coachName: string): Promise<void> {
        await Axios.post(this.getFullApiEndPointUrl('/api/coach/unhide/' + coachName));
    }
}