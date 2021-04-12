import { ChallengeData, MonsterData } from "../../../../Common/JsonData/JsonData";

export class ChallengeItemData {
    public free: boolean;
    public phase: number;
    public step: number;
    public challenge: ChallengeData
    public monster: MonsterData
    //{"user_id": self.user_id, "phase": self.phase, "step": self.step}
    constructor(phase: number) {
        let current_phase = window.appContext.DataContainer.get_ChallengeData().phase
        let current_step = window.appContext.DataContainer.get_ChallengeData().step
        if (phase == current_phase) {
            this.free = false
            this.step = current_step
        }
        else {
            this.free = true
            this.step = 0
        }
        this.phase = phase
        this.challenge = window.appContext.ConfigManager.GetChallengeByPhase(phase)
        this.monster = window.appContext.ConfigManager.GetmonsterById(this.challenge.monster)
    }
}