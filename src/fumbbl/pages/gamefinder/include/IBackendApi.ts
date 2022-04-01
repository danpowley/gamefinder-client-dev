export default interface IBackendApi {
    activate(): Promise<void>;

    getState(): Promise<any>;

    activeTeams(): Promise<any[]>;

    allTeams(coachName: string): Promise<any[]>;

    rosterData(teamId: number): Promise<any>;

    rosterSettings(rosterId: number): Promise<any>;

    addAllTeams(): void;

    removeAllTeams(): void;

    addTeam(id: number): void;

    removeTeam(id: number): void;

    getOffers(): Promise<any[]>;

    sendOffer(myTeamId: number, opponentTeamId: number): Promise<void>;

    cancelOffer(myTeamId: number, opponentTeamId: number): void;

    startGame(myTeamId: number, opponentTeamId: number): void;

    teamsAsOpponents(): Promise<any[]>;
}
