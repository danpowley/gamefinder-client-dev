import { UserSettings } from "./Interfaces";

export default interface IBackendApi {
    activate(): Promise<void>;

    getState(): Promise<any>;

    allTeams(coachName: string): Promise<any[]>;

    rosterData(teamId: number): Promise<any>;

    rosterSettings(rosterId: number): Promise<any>;

    addAllTeams(): void;

    removeAllTeams(): void;

    addTeam(id: number): void;

    removeTeam(id: number): void;

    sendOffer(myTeamId: number, opponentTeamId: number): Promise<void>;

    cancelOffer(myTeamId: number, opponentTeamId: number): void;

    startGame(myTeamId: number, opponentTeamId: number): void;

    getUserSettings(): Promise<UserSettings>;

    updateUserSetting(settingKey: string, settingValue: boolean | string | number): void;

    hideCoach(coachName: string): Promise<void>;

    unhideCoach(coachName: string): Promise<void>;
}