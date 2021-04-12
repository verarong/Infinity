import { SkillPanelData } from "./SkillPanelData";
import { Item } from "../../../../ItemList/Item";
import { PrefabUrl } from "../../../../Manager/PrefabUrl";
import { Util } from "../../../../Common/Utils/Util";
import { Debug } from "../../../../Common/Debug";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SkillItem extends Item<SkillPanelData> {

    private _data: SkillPanelData;

    @property(cc.Sprite)
    public icon_0: cc.Sprite;

    @property(cc.Sprite)
    public icon_1: cc.Sprite;

    @property(cc.Sprite)
    public icon_2: cc.Sprite;

    @property(cc.Sprite)
    public icon_3: cc.Sprite;

    @property(cc.Sprite)
    public icon_4: cc.Sprite;

    @property(cc.Sprite)
    public icon_5: cc.Sprite;

    @property(cc.Sprite)
    public icon_6: cc.Sprite;

    @property(cc.Sprite)
    public icon_7: cc.Sprite;

    @property(cc.Node)
    public skill: cc.Node;

    @property(cc.Label)
    public title: cc.Label;

    @property(cc.Label)
    public skill_0: cc.Label;

    @property(cc.Label)
    public skill_1: cc.Label;

    @property(cc.Label)
    public skill_2: cc.Label;

    @property(cc.Label)
    public skill_3: cc.Label;

    @property(cc.Label)
    public skill_4: cc.Label;

    @property(cc.Label)
    public skill_5: cc.Label;

    @property(cc.Label)
    public skill_6: cc.Label;

    @property(cc.Label)
    public skill_7: cc.Label;

    @property(cc.Node)
    public can_upgrade_0: cc.Node;

    @property(cc.Node)
    public can_upgrade_1: cc.Node;

    @property(cc.Node)
    public can_upgrade_2: cc.Node;

    @property(cc.Node)
    public can_upgrade_3: cc.Node;

    @property(cc.Node)
    public can_upgrade_4: cc.Node;

    @property(cc.Node)
    public can_upgrade_5: cc.Node;

    @property(cc.Node)
    public can_upgrade_6: cc.Node;

    @property(cc.Node)
    public can_upgrade_7: cc.Node;

    getData(): SkillPanelData {
        return this._data;
    }

    public onClickSkill(id: number) {
        if (this._data.levels[id]) {
            window.appContext.UIManager.ShowDialog(PrefabUrl.CommonSkillUpgradeDialog, this._data.skill_ids[id])
        }
        else {
            Util.ToastByCode(192, true)
        }
    }

    clickSkill_0() {
        this.onClickSkill(0)
    }

    clickSkill_1() {
        this.onClickSkill(1)
    }

    clickSkill_2() {
        this.onClickSkill(2)
    }

    clickSkill_3() {
        this.onClickSkill(3)
    }

    clickSkill_4() {
        this.onClickSkill(4)
    }

    clickSkill_5() {
        this.onClickSkill(5)
    }

    clickSkill_6() {
        this.onClickSkill(6)
    }

    clickSkill_7() {
        this.onClickSkill(7)
    }

    showByData() {
        this.title.string = this._data.title

        let icons = [this.icon_0, this.icon_1, this.icon_2, this.icon_3, this.icon_4, this.icon_5, this.icon_6, this.icon_7]
        for (let i in icons) {
            if (this._data.levels[i]) {
                icons[i].setMaterial(0, cc.Material.getBuiltinMaterial('2d-sprite'))
            }
            else {
                icons[i].setMaterial(0, cc.Material.createWithBuiltin(cc.Material.BUILTIN_NAME.GRAY_SPRITE, 0))
            }
        }

        let skills = [this.skill_0, this.skill_1, this.skill_2, this.skill_3, this.skill_4, this.skill_5, this.skill_6, this.skill_7]
        for (let i in icons) {
            skills[i].string = this._data.skill_names[i]
        }

        let can_upgrades = [this.can_upgrade_0, this.can_upgrade_1, this.can_upgrade_2, this.can_upgrade_3, this.can_upgrade_4, this.can_upgrade_5, this.can_upgrade_6, this.can_upgrade_7]
        for (let i in can_upgrades) {
            can_upgrades[i].active = this._data.can_upgrades[i]
        }
    }

    bindData(currentIndex: number, data: SkillPanelData) {
        if (data == null) {
            this.reset(currentIndex);
            return;
        }
        this._data = data;

        this.showByData()
    }

    reset(currentIndex: number): void {
        //TODO
    }

    select(selected: boolean): void {

        Debug.log("select:" + selected);
        if (!selected) {
            return;
        }
    }

    getClickButton(): cc.Button {
        return null;
    }
}
