import { BaseDialog } from "../../Common/BaseDialog";
import { Debug } from "../../../Common/Debug";
import SkillPanel from "../../Panel/SkillPanel/SkillPanel";
import { TalentItemData } from "./ItemList/TalentItemData";
import TalentList from "./ItemList/TalentList";
import { TalentData } from "../../../Common/JsonData/JsonData";
import { Util } from "../../../Common/Utils/Util";


const { ccclass, property } = cc._decorator;

@ccclass
export default class CommonTalentDialog extends BaseDialog {

      private selected: number = 0;
      private total: number;
      private current_talent_id: number;
      private Talent_class: number;
      private Talent_data: Array<TalentItemData> = new Array();

      @property(cc.Label)
      public title: cc.Label;

      @property(cc.Sprite)
      public icon: cc.Sprite;

      @property(cc.Label)
      public talent_name: cc.Label;

      @property(cc.Label)
      public level: cc.Label;

      @property(cc.Label)
      public requirement: cc.Label;

      @property(cc.Label)
      public mode: cc.Label;

      @property(cc.Label)
      public describe: cc.Label;

      @property(cc.Label)
      public summary: cc.Label;

      @property(TalentList)
      public TalentList: TalentList;

      @property(cc.Label)
      public btn: cc.Label;

      start() {
            this.fastShowAnim();
      }

      reset(currentIndex: number): void {
            //TODO
      }

      getData(): any {
            return;
      }

      closeDialog(): any {
            this.hide();
            let skill_panel: SkillPanel = window.appContext.UIManager.getCurrentPanel()
            skill_panel.refresh()
      }

      public showBySelected(select = null, start = "talent_", split = "/") {
            if (select == null) {
                  this.selected = this.Talent_data.length - 1
            }
            else {
                  this.selected = select
            }
            let talent_item: TalentItemData = this.Talent_data[this.selected]
            this.current_talent_id = talent_item.talent_id
            this.title.string = talent_item.talent.class_name
            window.appContext.Pool.setSpriteFrameByUrl(start + talent_item.talent_id.toString(), this.icon);
            this.talent_name.string = talent_item.talent.name
            this.level.string = talent_item.level + split + talent_item.talent.max_level
            this.btn.string = talent_item.level == talent_item.talent.max_level ? "已达顶级" : "修习"

            if (talent_item.talent.class_point_require) {
                  this.requirement.string = "需求" + talent_item.talent.class_name + "已投入" + talent_item.talent.class_point_require + "天赋点"
            }
            else {
                  this.requirement.string = "无前置修炼需求"
            }

            if (talent_item.talent.type == 1) {
                  let target = ""
                  if (talent_item.talent.target == "start") {
                        target = "优先攻击最上方敌人"
                  }
                  else if (talent_item.talent.target == "terminal") {
                        target = "优先攻击最下方敌人"
                  }
                  else if (talent_item.talent.target == "all") {
                        target = "同时攻击所有敌人"
                  }
                  this.mode.string = "冷却回合：" + talent_item.talent.cold_round + "," + target
            }
            else {
                  this.mode.string = "被动天赋，永久增加角色属性"
            }

            let describe_detail = ""
            if (talent_item.talent.type == 0) {
                  let attributes: Map<string, number> = Util.get_attributes(talent_item.talent)
                  let expand = Math.pow(talent_item.level, 2) * talent_item.talent.level_2_expand + talent_item.level * talent_item.talent.level_1_expand
                  let attr_array: Array<string> = new Array()
                  for (let [k, v] of attributes) {
                        attr_array.push(k + " + " + (v + expand).toString())
                  }
                  describe_detail = Util.join("\n", attr_array)
            }
            else {
                  describe_detail += "造成" + talent_item.talent.ratio + "倍伤害，并追加" + talent_item.talent.damage_per_level * talent_item.level + "点伤害"
                  if (talent_item.talent.attack_attribute_expand) {
                        describe_detail += "\n同时附加" + talent_item.talent.expand_amount_per_level * talent_item.level + "点" + window.appContext.ConfigManager.GettransformChnByEng(talent_item.talent.attack_attribute_expand)
                  }
                  if (talent_item.talent.element) {
                        describe_detail += "\n将所有伤害转换为" + window.appContext.ConfigManager.GettransformChnByEng(talent_item.talent.element)
                  }
            }

            this.describe.string = talent_item.talent.describe + "\n" + describe_detail
            this.summary.string = talent_item.talent.class_name + "天赋点:" + this.total + "\n剩余天赋点:" + window.appContext.DataContainer.RoleData.talent_point
      }

      public ShowByData() {
            //[{"id": self.id, "talent_id": self.talent_id, "type": self.type, "points": self.points},...]
            let data = window.appContext.DataContainer.get_TalentData()
            let talents_level: Map<number, number> = new Map();
            for (let x of data.talent) {
                  talents_level.set(x.talent_id, x.points)
            }
            let Talent_data: Array<TalentItemData> = new Array()
            let talents: Array<TalentData> = window.appContext.ConfigManager.GettalentsByType(this.Talent_class, false)
            this.total = 0
            if (this.selected == null) {
                  this.selected = talents.length - 1
            }
            for (let talent of talents) {
                  if (talents_level.has(talent.id)) {
                        Talent_data.push(new TalentItemData(talent.id, talents_level.get(talent.id)))
                        this.total += talents_level.get(talent.id)
                  }
                  else {
                        Talent_data.push(new TalentItemData(talent.id, 0))
                  }
            }
            this.Talent_data = Talent_data

            this.TalentList.ApplyData(this.Talent_data, this.selected);

            this.showBySelected(this.selected)
      }

      public refresh(refresh: boolean = false, select = null, refresh_panel: boolean = false) {
            this.selected = select

            let self = this
            if (refresh || window.appContext.DataContainer.get_TalentData() == undefined) {
                  window.appContext.WebApi.get_character_info(["talent", "main", "attribute"], this, function (data) {
                        window.appContext.DataContainer.set_TalentData(data.talent)
                        window.appContext.DataContainer.set_RoleData(data.main)
                        window.appContext.DataContainer.set_UserAttributeData(data.attribute)
                        self.ShowByData()
                        if (refresh_panel) {
                              let SkillPanel: SkillPanel = window.appContext.UIManager.getCurrentPanel()
                              SkillPanel.refresh()
                        }
                  });
            }
            else {
                  this.ShowByData()
            }
      }

      public bind_data(info: number) {
            Debug.log(info);
            this.Talent_class = info
      }

      public show(info: any) {
            this.bind_data(info);
            this.refresh()
      }

      public Upgrade() {
            let self = this
            window.appContext.WebApi.add_talent(this.current_talent_id, this,
                  function (succData) {
                        self.refresh(true, self.selected, true)
                  });
      }
}
