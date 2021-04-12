import { EquipmentData, ItemData, MonsterData, TechnologyData } from "../../../../Common/JsonData/JsonData";
import { Util } from "../../../../Common/Utils/Util";

export class AllianceListData {
    public alliance_id: number;
    public name: string;
    public level: number;
    public captain: number;
    public captain_name: string;
    public join_threshold: number
    //{"alliance_id": self.alliance_id, "name": self.name, "level": self.level, "captain": self.captain,
    //"captain_name": self.captain_name, "join_threshold": self.join_threshold}
    constructor(data: any) {
        this.alliance_id = data.alliance_id
        this.name = data.name
        this.level = data.level
        this.captain = data.captain
        this.captain_name = data.captain_name
        this.join_threshold = data.join_threshold
    }
}

export class AllianceData {
    public alliance_id: number;
    public name: string;
    public level: number;
    public captain: number;
    public captain_name: string;
    public join_threshold: number
    public fund: number;
    public technology: any
    //{"alliance_id": self.alliance_id, "name": self.name, "level": self.level, "captain": self.captain,
    // "captain_name": self.captain_name, "join_threshold": self.join_threshold, "fund": self.fund,
    // "technology": ujson.loads(self.technology)}
    constructor(data: any) {
        this.alliance_id = data.alliance_id
        this.name = data.name
        this.level = data.level
        this.captain = data.captain
        this.captain_name = data.captain_name
        this.join_threshold = data.join_threshold
        this.fund = data.fund
        this.technology = data.technology
    }
}

export class MemberData {
    public user_id: number;
    public user_name: string;
    public position: number;
    public contribution_history: number
    public last_login: number;
    // {"user_id": self.user_id, "user_name": self.user_name, "position": self.position,
    // "contribution_history": self.contribution_history, "last_login": self.last_login}
    constructor(data: any) {
        this.user_id = data.user_id
        this.user_name = data.user_name
        this.position = data.position
        this.contribution_history = data.contribution_history
        this.last_login = data.last_login
    }
}


export class DonateData {
    public package_item_id: number;
    public item_id: number;
    public amount: number;
    public bool_lock: boolean;
    public params: string;
    public strengthen_level: number;
    public item_data: ItemData | EquipmentData
    public phase: number;
    public quality: number;
    //{"id": self.id, "item_id": self.item_id, "amount": self.amount, "bool_lock": self.bool_lock,
    //"params": self.params}
    constructor(data: any = null) {
        this.package_item_id = data.id
        this.item_id = data.item_id;
        this.amount = data.amount;
        this.bool_lock = data.bool_lock == 1

        if (data.item_id < window.appContext.ConfigManager.GetBasicValueByType("min_equipment_id")) {
            this.item_data = window.appContext.ConfigManager.GetitemByItemId(data.item_id)
            this.quality = 0 < this.item_data.item_quality && this.item_data.item_quality < 7 ? this.item_data.item_quality : 1
        }
        else {
            this.item_data = window.appContext.ConfigManager.GetequipmentById(data.item_id)
            this.quality = 0 < this.item_data.equipment_quality && this.item_data.equipment_quality < 7 ? this.item_data.equipment_quality : 1
        }
        this.phase = 0 < this.item_data.phase && this.item_data.phase < 10 ? this.item_data.phase : 1

        if (data.params) {
            this.strengthen_level = data.params.strengthen
            this.params = Util.ParseParams(data.params.lines, this.strengthen_level)
        }
        else {
            this.strengthen_level = 0
            this.params = ""
        }
    }
}

export class ExchangeData {
    public item_id: number;
    public item_data: ItemData
    public contribution_cost: number;
    constructor(item_id: number) {
        this.item_id = item_id
        this.item_data = window.appContext.ConfigManager.GetitemByItemId(item_id)
        this.contribution_cost = Math.floor(this.item_data.shop_price_jade *
            window.appContext.ConfigManager.GetBasicValueByType("donate_jade_contribution_ratio") *
            window.appContext.ConfigManager.GetBasicValueByType("exchange_award_contribution_ratio"))
    }
}

export class AllianceTechnologyData {
    public technology_id: string;
    public level: number;
    public technology: TechnologyData;
    constructor(technology_id: string, level: number) {
        this.technology_id = technology_id
        this.level = level
        this.technology = window.appContext.ConfigManager.GetTechnologyByIdAndLevel(technology_id, level)
    }
}

export class AllianceBossData {
    public monster: MonsterData;
    public phase: number;
    public state: number;
    public state_cn: string;

    constructor(monster_id: number, alliance_level: number, current_boss: number) {
        this.monster = window.appContext.ConfigManager.GetmonsterById(monster_id)
        this.phase = alliance_level
        if (alliance_level > current_boss) {
            this.state = 1
            this.state_cn = "未开放"
        }
        else if (alliance_level == current_boss) {
            this.state = 0
            this.state_cn = "挑战"
        }
        else {
            this.state = 2
            this.state_cn = "已击破"
        }
    }
}