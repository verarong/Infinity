import AttackDetail from "./AttackDetail";
import { Debug } from "../../../Common/Debug";
import { MonsterData, TalentData } from "../../../Common/JsonData/JsonData";
import PlayerItem from "./ItemList/PlayerItem";
import { GamersData, MonstersData } from "./ItemList/FightData";

export default class AttackData {

    //是否是主动攻击
    public isAttack: boolean;

    public type: string;

    public fighter: any;

    public monster: any;
    //攻击者
    public attackerName: string;

    //被攻击者们
    public beAttackerNames: Array<string> = new Array<string>();

    //技能id
    public skillId: number;

    //技能名称
    public skillIName: string;

    //攻击状态
    public attackState: string;

    //是否破防
    public isBreakDefense: boolean;

    //是否破抗
    public isBreakResistance: boolean;

    //傷害
    public attackValue: number;

    public buff: any;

    public debuff: any;

    constructor(summary: any, gamers: Array<GamersData>, monsters: Array<MonstersData>) {
        if (summary == null) {
            Debug.error("summary is null");
            return;
        }

        this.type = summary.type;
        this.fighter = summary.fighter;
        this.monster = summary.monster;

        this.beAttackerNames = new Array<string>();
        if (this.type == "attack") {
            this.isAttack = true;
            for (let index of this.monster) {
                this.beAttackerNames.push(monsters[index].name);
            }
            this.attackerName = gamers[this.fighter].name;
        }
        else if (this.type == "harm") {
            this.isAttack = false;
            for (let index of this.fighter) {
                this.beAttackerNames.push(gamers[index].name);
            }
            this.attackerName = monsters[this.monster].name;
        }

        if (summary.params == null || summary.params.length == 0) {
            return;
        }
        let param = summary.params[0];

        this.skillId = param[0];
        let talent: TalentData = window.appContext.ConfigManager.GettalentById(this.skillId)
        this.skillIName = talent.name
        this.attackState = param[1];
        this.isBreakDefense = param[2];
        this.isBreakResistance = param[3];
        this.attackValue = param[4];
        this.buff = param[5];
        this.debuff = param[6];
    }
}
