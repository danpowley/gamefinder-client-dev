import DummyApi from "./DummyApi";
import FumbblApi from "./FumbblApi";
import IBackendApi from "./IBackendApi";

export default class GameFinderHelpers {
    public static getBackendApi(isDevMode: boolean): IBackendApi {
        if (isDevMode) {
            return new DummyApi();
        } else {
            return new FumbblApi();
        }
    }

    public static getTeamLogoId(team: any): number {
        return team.roster.logoImageIds.logo32;
    }

    public static getTeamLogoUrl(team: any): string {
        const teamLogoId = this.getTeamLogoId(team);
        // @christer using absolute url here, as I don't have the icons locally.
        return 'https://fumbbl.com/i/' + teamLogoId;
    }
}