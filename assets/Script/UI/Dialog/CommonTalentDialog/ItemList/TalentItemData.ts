import { TalentData } from "../../../../Common/JsonData/JsonData";

export class TalentItemData {
    public talent_id: number;
    public level: number;
    public talent: TalentData
    //{"id": self.id, "talent_id": self.talent_id, "amount": self.amount, "bool_lock": self.bool_lock,
    //"params": self.params}
    constructor(talent_id: number, level: number) {
        this.talent_id = talent_id
        this.level = level
        this.talent = window.appContext.ConfigManager.GettalentById(talent_id)
    }
}