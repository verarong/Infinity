import { ItemData, SkillData } from "../../../../Common/JsonData/JsonData";
import { Util } from "../../../../Common/Utils/Util";

export class BreakAwardsData {
    public item_id: number;
    public amount: number;
    public item: ItemData;
    constructor(item_id: number, amount: number) {
        this.item_id = item_id;
        this.amount = amount;
        this.item = window.appContext.ConfigManager.GetitemByItemId(item_id);
    }
}

export class BreakRequirementsData {
    public requirement: string;
    public amount: number;
    public check_requirement: boolean;
    constructor(requirement: string, amount: number) {
        this.requirement = requirement;
        this.amount = amount
        if (requirement == "gas") {
            this.check_requirement = Util.CheckResource(requirement, amount)
        }
        else {
            this.check_requirement = Util.CheckRequirement(requirement, amount)
        }
    }
}

export class BreakSkillsData {
    public skill_id: number;
    public level: number;
    public skill: SkillData
    public check_skill: boolean;
    constructor(skill_id: number, level: number) {
        this.skill_id = skill_id
        this.level = level
        this.skill = window.appContext.ConfigManager.GetskillById(skill_id)
        this.check_skill = Util.CheckSkill(skill_id, level)
    }
}

export class BreakItemsData {
    public item_id: number;
    public amount: number;
    public item: ItemData
    public check_item: boolean;
    constructor(item_id: number, amount: number) {
        this.item_id = item_id
        this.amount = amount
        this.item = window.appContext.ConfigManager.GetitemByItemId(item_id)
        this.check_item = Util.CheckItem(item_id, amount)
    }
}