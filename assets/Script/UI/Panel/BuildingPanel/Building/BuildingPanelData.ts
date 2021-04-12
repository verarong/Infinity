import { DomainData } from "../../../../Common/JsonData/JsonData";
import { Util } from "../../../../Common/Utils/Util";

export class BuildingData {
    public building_id: number;
    public level: number;
    public amount: number;
    public can_upgrade: boolean;
    public bool_max: boolean
    //{"id": self.id, "building_id": self.building_id, "level": self.level}
    constructor(data: any, amount: number) {
        this.building_id = data.building_id;
        this.level = data.level;
        this.amount = amount;
        let max: number = window.appContext.ConfigManager.GetMaxDomainLevelByBuildingId(this.building_id)

        let building: DomainData = window.appContext.ConfigManager.GetdomainByBuildingIdAndLevel(this.building_id, this.level)
        let check_badge: boolean = true
        if (building.dragon_badge) {
            check_badge = check_badge && Util.CheckResource("dragon_badge", building.dragon_badge)
        }
        if (building.tiger_badge) {
            check_badge = check_badge && Util.CheckResource("tiger_badge", building.tiger_badge)
        }
        if (building.phoenix_badge) {
            check_badge = check_badge && Util.CheckResource("phoenix_badge", building.phoenix_badge)
        }
        if (building.tortoise_badge) {
            check_badge = check_badge && Util.CheckResource("tortoise_badge", building.tortoise_badge)
        }
        this.can_upgrade = this.level < max && check_badge
        this.bool_max = this.level < max
    }
}