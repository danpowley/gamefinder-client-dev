import { IBackendApi } from "./IBackendApi"
import Axios from "axios"

export class DummyApi implements IBackendApi {

    public async addCheatingCoach(coachName: string) {
        await Axios.post('/api/gamefinder/addcheatingcoach', {cheatingCoachName: coachName});
    }

}