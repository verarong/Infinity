import { Debug } from "../../../Common/Debug";
import { MonsterData } from "../../../Common/JsonData/JsonData";
import { Util } from "../../../Common/Utils/Util";
import { PrefabUrl } from "../../../Manager/PrefabUrl";
import { BaseDialog } from "../../Common/BaseDialog";
import { WorldBossData } from "./ItemList/WorldBossData";
import WorldBossList from "./ItemList/WorldBossList";


const { ccclass, property } = cc._decorator;

@ccclass
export default class WorldBossDialog extends BaseDialog {

    private last_fight: number = 0;
    private _data: any;
    private monster: MonsterData;
    // {"world_boss": world_boss.monster_id,
    // "world_boss_life": world_boss.current_life,
    // "damage_summary": [[name, damage] for _, (name, damage, _) in world_boss_damage.items()],
    // "you_summary": world_boss_damage.get(c_user.id, [c_user.name, 0])[:2]}

    @property(cc.Sprite)
    public boss: cc.Sprite;

    @property(cc.Label)
    public boss_name: cc.Label;

    @property(cc.Label)
    public boss_life: cc.Label;

    @property(cc.Label)
    public btn: cc.Label;

    @property(WorldBossList)
    public WorldBossList: WorldBossList;

    private sortByDamage(a: Array<any>, b: Array<any>) {
        return b[1] - a[1]
    }

    start() {
        //this.fastShowAnim();
    }

    getData(): any {
    }

    closeDialog(): any {
        this.hide();
    }

    private getNowDate(split = "/"): string {
        const date = new Date();
        let month: string | number = date.getMonth() + 1;
        let strDate: string | number = date.getDate();
        if (month <= 9) {
            month = "0" + month;
        }
        if (strDate <= 9) {
            strDate = "0" + strDate;
        }
        return date.getFullYear() + split + month + split + strDate
    }

    private checkActivate(): boolean {
        let current = new Date()
        let now_data = this.getNowDate()
        let [begin, end] = window.appContext.ConfigManager.GetBasicValueByType("world_boss_time_range").toString().split(" - ")
        let beginDate = new Date(now_data + " " + begin)
        let endDate = new Date(now_data + " " + end)
        if (current >= beginDate && current <= endDate) {
            return true;
        }
        return false
    }

    private checkCoolDown(): boolean {
        return new Date().getTime() - this.last_fight >= window.appContext.ConfigManager.GetBasicValueByType("world_boss_round_cold") * 1000
    }

    public show_by_datetime() {
        if (this.checkActivate()) {
            this.btn.string = this.checkCoolDown() ? "挑  战" : Util.FormatCountDown(Math.floor((window.appContext.ConfigManager.GetBasicValueByType("world_boss_round_cold") + this.last_fight / 1000 - new Date().getTime() / 1000)))
        }
        else {
            this.btn.string = window.appContext.ConfigManager.GetBasicValueByType("world_boss_time_range").toString()
        }
    }

    public show_damage_list() {
        let data_list: Array<WorldBossData> = new Array()
        for (let i = 0; i < 10; i++) {
            if (i < this._data.damage_summary.length) {
                data_list.push(new WorldBossData(i + 1, false, this._data.damage_summary[i]))
            }
            else {
                data_list.push(new WorldBossData(i + 1, false, ["", 0]))
            }
        }

        let self_rank: number = 0
        let [name, damage] = this._data.you_summary
        for (let i in this._data.damage_summary) {
            let [name_, damage_] = this._data.damage_summary[i]
            if (name == name_ && damage == damage_) {
                data_list[i].bool_self = true
                self_rank = parseInt(i) + 1
            }
        }
        data_list.push(new WorldBossData(self_rank, true, this._data.you_summary))
        this.WorldBossList.ApplyData(data_list)
    }

    public show_by_damage() {
        let self = this;
        window.appContext.WebApi.get_world_boss_info(this, function (succeed_data) {
            self._data = succeed_data
            self.boss_life.string = self._data.world_boss_life + "/" + self.monster.life
            self.show_damage_list()
        });
    }

    public ShowByData() {
        this.monster = window.appContext.ConfigManager.GetmonsterById(this._data.world_boss)
        window.appContext.Pool.setSpriteFrameByUrl(this.monster.icon, this.boss);
        this.boss_name.string = this.monster.name

        if (this.boolAnimationDone()) {
            this.unscheduleAllCallbacks();
        }
        this.schedule(this.show_by_datetime, 1, cc.macro.REPEAT_FOREVER, 0)
        this.schedule(this.show_by_damage, 10, cc.macro.REPEAT_FOREVER, 0)
    }

    public get_world_boss_info() {
        let self = this;
        window.appContext.WebApi.get_world_boss_info(this, function (succeed_data) {
            self._data = succeed_data
            self.show_damage_list()
            self.ShowByData()
        });
    }

    public refresh(refresh: boolean = true) {
        if (refresh) {
            this.get_world_boss_info()
        }
        else {
            this.ShowByData()
        }
    }

    public show() {
        this.refresh()
    }

    public world_boss_fight() {
        let self = this
        if (this.checkActivate()) {
            window.appContext.WebApi.world_boss_fight(this, function (data) {
                window.appContext.UIManager.ShowDialog(PrefabUrl.FightDialog, data)
                window.appContext.WebApi.get_character_info("daily_task", this, function (data) {
                    window.appContext.DataContainer.set_DailyTaskData(data)
                });
                self.last_fight = new Date().getTime()
            })
        }
        else {
            Util.ToastByCode(186, true)
        }
    }
}
