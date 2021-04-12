import AttackData from "../AttackData";
import { Item } from "../../../../ItemList/Item";
import { Util } from "../../../../Common/Utils/Util";


const { ccclass, property } = cc._decorator;

@ccclass
export default class SummaryItem extends Item<AttackData> {

    private _data: AttackData;

    @property(cc.RichText)
    public Content: cc.RichText;

    getData(): AttackData {
        return this._data;
    }

    onEnable() {

    }

    bindData(currentIndex: number, data: AttackData) {

        if (data == null) {
            this.reset(currentIndex);
            return;
        }

        this._data = data;

        let prologueSummarys = window.appContext.ConfigManager.GetSummaryDatasByType(1);
        //开场白
        let prologue = prologueSummarys[Util.getRndInteger(0, prologueSummarys.length)].before;

        let attackName = "";
        if (data.isAttack) {
            let playerSummary = window.appContext.ConfigManager.GetSummaryDatasByType(2)[0];
            attackName = Util.join(" ", ["，", playerSummary.color, data.attackerName, playerSummary.color_terminal])
        } else {
            let monsterSummary = window.appContext.ConfigManager.GetSummaryDatasByType(4)[0];
            attackName = Util.join(" ", ["，", monsterSummary.color, data.attackerName, monsterSummary.color_terminal])
        }

        let skillContent = "";
        if (data.isAttack) {
            let playerSkillSummarys = window.appContext.ConfigManager.GetSummaryDatasByType(3);
            let playerSkillSummary = playerSkillSummarys[Util.getRndInteger(0, playerSkillSummarys.length)];
            skillContent = Util.join(" ", [playerSkillSummary.before, playerSkillSummary.color, data.skillIName, playerSkillSummary.color_terminal, playerSkillSummary.after]);
        } else {
            let monsterSkillSummarys = window.appContext.ConfigManager.GetSummaryDatasByType(7);
            let monstaerSkillSummary = monsterSkillSummarys[Util.getRndInteger(0, monsterSkillSummarys.length)];
            skillContent = Util.join(" ", [monstaerSkillSummary.before, monstaerSkillSummary.color, data.skillIName, monstaerSkillSummary.color_terminal, monstaerSkillSummary.after]);
        }

        let beAttackName = "";

        let allBeAttackName = "";
        for (let index = 0; index < data.beAttackerNames.length; index++) {
            allBeAttackName = allBeAttackName + data.beAttackerNames[index] + " ";
        }
        if (!data.isAttack) {
            let playerSummary = window.appContext.ConfigManager.GetSummaryDatasByType(2)[0];
            beAttackName = Util.join(" ", [playerSummary.color, allBeAttackName, playerSummary.color_terminal])
        } else {
            let monstaerSummary = window.appContext.ConfigManager.GetSummaryDatasByType(4)[0];
            beAttackName = Util.join(" ", [monstaerSummary.color, allBeAttackName, monstaerSummary.color_terminal])
        }

        let damage = "";
        let damageSummary = window.appContext.ConfigManager.GetSummaryDatasByType(5)[0];
        damage = Util.join(" ", [damageSummary.before, damageSummary.color, data.attackValue, damageSummary.color_terminal, damageSummary.after])

        let state = "";
        let stateValue = [];

        let attackState = data.attackState;
        if (attackState != "hit") {
            stateValue.push(window.appContext.ConfigManager.GettransformChnByEng(attackState));
        }
        if (data.isBreakDefense) {
            stateValue.push("破防");
        }

        if (data.isBreakResistance) {
            stateValue.push("破抗");
        }

        if (stateValue.length > 0) {
            let stateSummary = window.appContext.ConfigManager.GetSummaryDatasByType(6)[0];
            state = Util.join(" ", [stateSummary.before, stateSummary.color, stateValue.toString(), stateSummary.color_terminal, stateSummary.after])
        }

        this.Content.string = prologue + attackName + skillContent + beAttackName + damage + state;
    }

    reset(currentIndex: number): void {
        this.Content.string = "";
    }

    select(selected: boolean): void {
        if (!selected) {
            return;
        }
    }

    getClickButton(): cc.Button {
        return null;
    }
}
