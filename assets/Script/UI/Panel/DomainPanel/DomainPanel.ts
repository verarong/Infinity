// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { UIComponent } from "../../Common/UIComponent";
import CommonDialogData from "../../Dialog/CommonDialogData";
import { PrefabUrl } from "../../../Manager/PrefabUrl";
import RoleData from "../../../Data/RoleData";
import { AchievementData, DomainData } from "../../../Common/JsonData/JsonData";
import { Util } from "../../../Common/Utils/Util";

const { ccclass, property } = cc._decorator;

@ccclass
export default class DomainPanel extends UIComponent {

    public role_data: any;
    public building_data: any;
    public achievement_data: AchievementData;

    @property(cc.Label)
    public nickName: cc.Label;

    @property(cc.Label)
    public level: cc.Label;

    @property(cc.Label)
    public money: cc.Label;

    @property(cc.Label)
    public jade: cc.Label;

    @property(cc.Sprite)
    public head: cc.Sprite;

    @property(cc.Sprite)
    public frame: cc.Sprite;

    @property(cc.Node)
    public store: cc.Node;

    @property(cc.Node)
    public menu: cc.Node;

    @property(cc.Node)
    public astrology: cc.Node;

    @property(cc.Node)
    public alliance: cc.Node;

    @property(cc.Node)
    public rank: cc.Node;

    @property(cc.Node)
    public daily: cc.Node;

    @property(cc.Node)
    public character_upgrade: cc.Node;

    @property(cc.Node)
    public arts: cc.Node;

    @property(cc.Node)
    public equipment_strengthen: cc.Node;

    @property(cc.Node)
    public remains: cc.Node;

    @property(cc.Label)
    public achievement: cc.Label;

    @property(cc.Node)
    public mail: cc.Node;

    @property(cc.Node)
    public world_boss: cc.Node;

    @property(cc.Node)
    public config: cc.Node;

    @property(cc.Node)
    public hide: cc.Node;

    @property(cc.Node)
    public tips_equipment: cc.Node;

    @property(cc.Node)
    public tips_compose: cc.Node;

    @property(cc.Node)
    public tips_character: cc.Node;

    @property(cc.Node)
    public tips_partner: cc.Node;

    @property(cc.Node)
    public tips_skill: cc.Node;

    @property(cc.Node)
    public tips_building: cc.Node;

    @property(cc.Node)
    public tips_secret: cc.Node;

    @property(cc.Node)
    public tips_world_boss: cc.Node;

    @property(cc.Node)
    public tips_daily_task: cc.Node;

    @property(cc.Node)
    public tips_activate: cc.Node;

    @property(cc.Node)
    public arrow: cc.Node;

    @property(cc.Node)
    public activate_show: cc.Node;

    @property(cc.Node)
    public activate_hide: cc.Node;

    //#region DashBoard

    public show_activate() {
        this.activate_show.active = true
        this.activate_hide.active = false
    }

    public hide_activate() {
        this.activate_show.active = false
        this.activate_hide.active = true
    }

    //坊市
    public onStoreBtnClick() {
        window.appContext.SoundManager.playSFX("ui_common");
        window.appContext.UIManager.ShowPanel(PrefabUrl.StorePanel);
    }

    //人物
    public onCharactorBtnClick() {
        window.appContext.SoundManager.playSFX("ui_common");
        window.appContext.UIManager.ShowPanel(PrefabUrl.CharacterPanel);
    }

    //法术
    public onMagicBtnClick() {
        window.appContext.SoundManager.playSFX("ui_common");
        window.appContext.UIManager.ShowPanel(PrefabUrl.SkillPanel);
    }

    //游历
    public onBattleBtnClick() {
        window.appContext.SoundManager.playSFX("ui_common");
        window.appContext.UIManager.ShowPanel(PrefabUrl.BattlePanel);
    }

    //伴侣
    public onPartnerBtnClick() {
        window.appContext.SoundManager.playSFX("ui_common");
        window.appContext.UIManager.ShowPanel(PrefabUrl.PartnerPanel);
    }

    //机缘
    public onChanceBtnClick() {
        let environment = window.appContext.ConfigManager.GetBuffById(window.appContext.DataContainer.RoleData.environment)
        let describe = "今日运势: " + environment.name + "\n\n" + environment.describe
        window.appContext.UIManager.ShowCommonDialog(describe, "占星台", false, null, null, null, true)
    }

    //仙门
    public onAllianceClick() {
        window.appContext.SoundManager.playSFX("ui_common");
        window.appContext.UIManager.ShowPanel(PrefabUrl.AlliancePanel);
    }

    //建筑
    public onBuildingClick() {
        window.appContext.SoundManager.playSFX("ui_common");
        window.appContext.UIManager.ShowPanel(PrefabUrl.BuildingPanel);
    }

    //人物强化选项
    public onCharacterUpgradeChoiceClick() {
        window.appContext.UIManager.ShowDialog(PrefabUrl.CharacterUpgradeChoiceDialog);
    }

    //六艺选项
    public onArtsChoiceClick() {
        window.appContext.UIManager.ShowDialog(PrefabUrl.ArtsChoiceDialog);
    }

    //装备强化
    public onEquipmentStrengthenClick() {
        window.appContext.UIManager.ShowDialog(PrefabUrl.EquipmentStrengthenDialog);
    }

    //幻化
    public onAvatarClick() {
        window.appContext.UIManager.ShowDialog(PrefabUrl.AvatarDialog);
    }

    //邮箱
    public onMailClick() {
        window.appContext.UIManager.ShowDialog(PrefabUrl.MailDialog);
    }

    //矿脉
    public onRemainsClick() {
        window.appContext.SoundManager.playSFX("ui_common");
        window.appContext.UIManager.ShowPanel(PrefabUrl.RemainsPanel);
    }

    //世界BOSS
    public onWorldBossClick() {
        window.appContext.UIManager.ShowDialog(PrefabUrl.WorldBossDialog);
    }

    //排行
    public onUsersRankClick() {
        window.appContext.UIManager.ShowDialog(PrefabUrl.UserRankDialog);
    }

    //排行
    public onDailyTaskClick() {
        window.appContext.UIManager.ShowDialog(PrefabUrl.DailyTaskDialog);
    }

    //设置
    public onConfigClick() {
        window.appContext.UIManager.ShowDialog(PrefabUrl.ConfigDialog);
    }

    public ShowByData() {
        let data = window.appContext.DataContainer.get_RoleData()
        this.nickName.string = data.name;
        this.money.string = Util.FormatInt(data.money);
        this.jade.string = Util.FormatInt(data.jade);
        this.level.string = data.levelName;
        window.appContext.Pool.setSpriteFrameByUrl("head_" + window.appContext.DataContainer.AvatarData.head, this.head);
        window.appContext.Pool.setSpriteFrameByUrl("head_frame_" + window.appContext.DataContainer.AvatarData.head_frame, this.frame);

        let current_achievement = window.appContext.DataContainer.get_GuideData()
        this.achievement_data = window.appContext.ConfigManager.GetAchievement(current_achievement.achievement)
        if (this.achievement_data) {
            this.achievement.node.active = true
            if (current_achievement.achievement_done == 1) {
                this.achievement.string = "?" + this.achievement_data.name
            }
            else {
                this.achievement.string = "!" + this.achievement_data.name
                if (window.appContext.DataContainer.get_GuideData().guide >= 16) {
                    this.scheduleOnce(function () {
                        this.arrow.active = true
                        this.arrow.runAction(Util.getBlink());
                    }, 2);
                }
            }
        }
        else {
            this.achievement.node.active = false
        }

        this.arrow.active = false
        let guide = window.appContext.DataContainer.get_GuideData()
        this.menu.active = guide.guide >= 7
        this.character_upgrade.active = guide.guide >= 9
        this.arts.active = guide.guide >= 15
        this.achievement.node.active = guide.guide >= 13
        this.remains.active = guide.guide >= 16
        this.world_boss.active = guide.guide >= 16
        this.hide.active = guide.guide >= 16
        this.mail.active = guide.guide >= 4 && window.appContext.DataContainer.check_MailData()
        this.config.active = guide.guide >= 16

        this.daily.active = window.appContext.DataContainer.RoleData.level >= 6
        this.astrology.active = window.appContext.DataContainer.RoleData.level >= 7
        this.rank.active = window.appContext.DataContainer.RoleData.level >= 8
        this.alliance.active = window.appContext.DataContainer.RoleData.level >= 11
        this.equipment_strengthen.active = guide.level_trigger_guide >= 1 && window.appContext.DataContainer.RoleData.level >= 4
        this.store.active = guide.level_trigger_guide >= 2 && window.appContext.DataContainer.RoleData.level >= 5
    }

    public refresh_tips_show() {
        this.tips_equipment.active = window.appContext.DataContainer.tips.get("equipment")
        this.tips_compose.active = window.appContext.DataContainer.tips.get("compose")
        this.tips_character.active = window.appContext.DataContainer.tips.get("character")
        this.tips_partner.active = window.appContext.DataContainer.tips.get("partner")
        this.tips_skill.active = window.appContext.DataContainer.tips.get("skill")
        this.tips_building.active = window.appContext.DataContainer.tips.get("building")
        this.tips_secret.active = window.appContext.DataContainer.tips.get("secret")
        this.tips_world_boss.active = window.appContext.DataContainer.tips.get("world_boss")
        this.tips_daily_task.active = window.appContext.DataContainer.tips.get("daily_task")
        this.tips_activate.active = this.tips_world_boss.active || this.tips_daily_task.active
    }

    public refresh(refresh_role: boolean = false, refresh_tips: boolean = true) {
        let self = this
        if (refresh_role || window.appContext.DataContainer.get_RoleData() == undefined) {
            window.appContext.WebApi.get_character_info("main", this, function (data) {
                window.appContext.DataContainer.set_RoleData(data)
                self.ShowByData()
            });
        }
        else {
            this.ShowByData()
        }

        if (refresh_tips) {
            this.refresh_tips_show()
        }
    }

    public achievement_progress() {
        let self = this
        if (this.achievement_data.class == "fight") {
            window.appContext.WebApi.fight_achievement(this,
                //战斗成功
                function (succData) {
                    let guide = window.appContext.ConfigManager.GetGuideById(self.achievement_data.guide)
                    if (self.achievement_data.guide > 0 && guide.dialogue) {
                        window.appContext.UIManager.ShowDialog(PrefabUrl.GuideDialog, [guide, succData], false)
                    }
                    else {
                        window.appContext.UIManager.ShowDialog(PrefabUrl.FightDialog, succData);
                    }

                    window.appContext.WebApi.get_character_info(["main", "role_params", "item"], this, function (data) {
                        window.appContext.DataContainer.set_RoleData(data.main)
                        window.appContext.DataContainer.set_GuideData(data.role_params)
                        window.appContext.DataContainer.set_ItemData(data.item)
                        let domain: DomainPanel = window.appContext.UIManager.getCurrentPanel()
                        domain.refresh()
                    });
                }
            );
        }
        else if (window.appContext.DataContainer.get_GuideData().achievement_done == 0) {
            if (this.achievement_data.class == "statement" || this.achievement_data.class == "get_item" || this.achievement_data.class == "thread") {
                window.appContext.UIManager.ShowPanel(PrefabUrl.BattlePanel)
            }
            else if (this.achievement_data.class == "strengthen") {
                window.appContext.UIManager.ShowDialog(PrefabUrl.EquipmentStrengthenDialog)
            }
            else if (this.achievement_data.class == "level") {
                if (window.appContext.DataContainer.RoleData.level % 10 == 0) {
                    window.appContext.UIManager.ShowDialog(PrefabUrl.PhaseBreakDialog)
                }
                else {
                    window.appContext.UIManager.ShowDialog(PrefabUrl.CommonLevelUpgradeDialog)
                }
            }
            else if (this.achievement_data.class == "consciousness") {
                window.appContext.UIManager.ShowDialog(PrefabUrl.CommonCharacterUpgradeDialog, "soul")
            }
            else if (this.achievement_data.class == "physique") {
                window.appContext.UIManager.ShowDialog(PrefabUrl.CommonCharacterUpgradeDialog, "gas")
            }
            else if (this.achievement_data.class == "building") {
                window.appContext.UIManager.ShowPanel(PrefabUrl.BuildingPanel)
                let info = [window.appContext.DataContainer.DomainLevel.get(this.achievement_data.ids), this.achievement_data.ids]
                window.appContext.UIManager.ShowDialog(PrefabUrl.CommonBuildingUpgradeDialog, info)
            }
        }
        else if (window.appContext.DataContainer.get_GuideData().achievement_done == 1) {
            window.appContext.WebApi.get_achievement_award(this, function (award) {
                window.appContext.WebApi.get_character_info(["main", "role_params", "item"], this, function (data) {
                    window.appContext.DataContainer.set_RoleData(data.main)
                    window.appContext.DataContainer.set_GuideData(data.role_params)
                    window.appContext.DataContainer.set_ItemData(data.item)
                    self.refresh();
                    window.appContext.UIManager.ShowDialog(PrefabUrl.TaskAwardDialog, award)
                })
            })
        }
    }

    onEnable() {
        this.refresh()
    }
}