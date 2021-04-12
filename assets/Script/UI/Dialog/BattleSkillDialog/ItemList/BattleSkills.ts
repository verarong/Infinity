import { TalentData } from "../../../../Common/JsonData/JsonData";


export class BattleSkillItemData {
    public talent_id: number;
    public type: number;
    public name: string;
    public level: number
    //{"id": self.id, "talent_id": self.talent_id, "talent_class": self.talent_class, "type": self.type,
    //"points": self.points}
    constructor(data: any) {
        this.talent_id = data.talent_id
        this.type = data.type
        this.level = data.points

        let talent: TalentData = window.appContext.ConfigManager.GettalentById(this.talent_id)
        this.name = talent.name
    }
}