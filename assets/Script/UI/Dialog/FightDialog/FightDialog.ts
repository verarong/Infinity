import { BaseDialog } from "../../Common/BaseDialog";
import { Debug } from "../../../Common/Debug";
import AttackData from "./AttackData";
import EnemyList from "./ItemList/EnemyList";
import PlayerEntity from "./ItemList/PlayerItem";
import EnemyItem from "./ItemList/EnemyItem";
import SummaryList from "./ItemList/SummaryList";
import { PrefabUrl } from "../../../Manager/PrefabUrl";
import BattleFiledDialog from "../BattleFiledDialog/BattleFiledDialog";
import DomainPanel from "../../Panel/DomainPanel/DomainPanel";
import RoleData from "../../../Data/RoleData";
import PlayerList from "./ItemList/PlayerList";
import { GamersData, MonstersData } from "./ItemList/FightData";
import PlayerItem from "./ItemList/PlayerItem";

const { ccclass, property } = cc._decorator;

@ccclass
export default class FightDialog extends BaseDialog {

    public gamers: Array<GamersData> = new Array<GamersData>();
    public monsters: Array<MonstersData> = new Array<MonstersData>();
    public state: boolean = false
    public bool_gamer_fight: boolean = false
    public bool_battle_terminal: boolean = false
    public attackDatas: Array<AttackData> = new Array<AttackData>();
    public currentAttackDatas: Array<AttackData> = new Array<AttackData>();
    public award: Array<any> = new Array();

    @property(PlayerList)
    playerList: PlayerList;

    @property(EnemyList)
    enemyList: EnemyList;

    @property(SummaryList)
    summaryList: SummaryList;

    @property(cc.Node)
    quitBtn: cc.Node;

    public init() {
        this.gamers = new Array<GamersData>();
        this.monsters = new Array<MonstersData>();
        this.state = false
        this.bool_gamer_fight = false
        this.bool_battle_terminal = false
        this.attackDatas = new Array<AttackData>();
        this.currentAttackDatas = new Array<AttackData>();
        this.award = new Array();
    }

    public show(info: any) {
        if (info == null) {
            return;
        }
        Debug.log(info);

        this.init()
        this.state = info.state
        this.bool_gamer_fight = info.gamer_fight
        this.bool_battle_terminal = info.battle_terminal
        this.award = info.award

        for (let gamer of info.gamers_summary) {
            this.gamers.push(new GamersData(gamer, this.bool_gamer_fight, info.gamers_summary.length))
        }
        this.playerList.ApplyData(this.gamers)

        for (let monster of info.monsters_summary) {
            this.monsters.push(new MonstersData(monster, this.bool_gamer_fight, info.monsters_summary.length))
        }
        this.enemyList.ApplyData(this.monsters)

        let summarys = info.summary;

        for (let i = 0; i < summarys.length; i++) {
            var summary = summarys[i];
            for (const key in summary) {
                if (Object.prototype.hasOwnProperty.call(summary, key)) {
                    let element = summary[key];
                    let attackData = new AttackData(element, this.gamers, this.monsters);
                    this.attackDatas.push(attackData);
                }
            }
        }

        this.quitBtn.active = false;
        this.scheduleOnce(function () {
            this.quitBtn.active = true
        }, 8)

        this.scheduleOnce(this.Attack, 0.5)
    }

    private Attack() {
        let attackData = this.attackDatas.shift();
        this.currentAttackDatas.push(attackData);

        //玩家攻擊
        if (attackData.type == "attack") {
            let enemyItems: Array<EnemyItem> = new Array<EnemyItem>();
            for (let index of attackData.monster) {
                enemyItems.push(this.enemyList.getItemByIndex(index));
            }
            let player: PlayerItem = this.playerList.getItemByIndex(attackData.fighter)

            let self = this;
            player.AttackEnemy(enemyItems, attackData, this, function () {
                self.summaryList.ApplyData(self.currentAttackDatas);
                if (self.attackDatas == null || self.attackDatas.length == 0) {
                    this.quitBtn.active = true;
                }
                else {
                    self.scheduleOnce(self.Attack, 0.3)
                }
            });
        }
        //敵方攻擊
        else if (attackData.type == "harm") {
            let playerItems: Array<PlayerItem> = new Array<PlayerItem>();
            for (let index of attackData.fighter) {
                playerItems.push(this.playerList.getItemByIndex(index));
            }
            let enemy: EnemyItem = this.enemyList.getItemByIndex(attackData.monster)

            let self = this;
            enemy.AttackEnemy(playerItems, attackData, this, function () {
                self.summaryList.ApplyData(self.currentAttackDatas);
                if (self.attackDatas == null || self.attackDatas.length == 0) {
                    this.quitBtn.active = true;
                }
                else {
                    self.scheduleOnce(self.Attack, 0.3)
                }
            });
        }

        this.moveSummaryList();
    }

    private moveSummaryList() {
        let summaryListHeight = this.summaryList.node.height;
        let parentHeight = this.summaryList.node.parent.height;

        if (summaryListHeight > parentHeight) {
            let action = cc.moveTo(0.2, new cc.Vec2(0, summaryListHeight - parentHeight));
            this.summaryList.node.runAction(action);
        }
    }

    public OnQuitBtnClick() {
        if (this.bool_battle_terminal) {
            window.appContext.UIManager.ShowDialog(PrefabUrl.ResultDialog, this.state);
        }
        else if (this.award) {
            window.appContext.UIManager.ShowDialog(PrefabUrl.TaskAwardDialog, this.award)
        }

        this.init()
        this.hide()
    }
}
