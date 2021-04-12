import { SkillData } from "../../../../Common/JsonData/JsonData";
import { Util } from "../../../../Common/Utils/Util";

export class SkillPanelData {
    public title: string;
    public phase: number;
    public skill_ids: Array<number> = new Array();
    public levels: Array<number> = new Array();
    public skill_names: Array<string> = new Array();
    public can_upgrades: Array<boolean> = new Array();

    constructor(title: string, phase: number, skill_ids: Array<number>, levels: Array<number>) {
        this.title = title;
        this.phase = phase;
        this.skill_ids = skill_ids;
        this.levels = levels;
        for (let i in skill_ids) {
            let skill: SkillData = window.appContext.ConfigManager.GetskillById(skill_ids[i])
            this.skill_names.push(skill.name)
            this.can_upgrades.push(levels[i] && levels[i] < skill.max_level && Util.CheckResource(skill.resource, skill.cost_per_level * levels[i]))
        }
    }
}