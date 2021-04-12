import { BaseDialog } from "../Common/BaseDialog";
import { Debug } from "../../Common/Debug";
import SkillPanel from "../Panel/SkillPanel/SkillPanel";
import { SkillData } from "../../Common/JsonData/JsonData";
import { Util } from "../../Common/Utils/Util";


const { ccclass, property } = cc._decorator;

@ccclass
export default class CommonSkillUpgradeDialog extends BaseDialog {

      private id: number;
      private check_requirement: boolean = true;

      @property(cc.Label)
      public title: cc.Label;

      @property(cc.Label)
      public current_level: cc.Label;

      @property(cc.Label)
      public current_describe: cc.Label;

      @property(cc.Label)
      public next_level: cc.Label;

      @property(cc.Label)
      public next_describe: cc.Label;

      @property(cc.Sprite)
      public icon: cc.Sprite;

      @property(cc.Sprite)
      public resource: cc.Sprite;

      @property(cc.Label)
      public price: cc.Label;

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
      }

      public ShowByData() {
            let skill: SkillData = window.appContext.ConfigManager.GetskillById(this.id)
            let level = window.appContext.DataContainer.SkillLevel.get(this.id)
            let bool_max = level == skill.max_level
            let next = bool_max ? level : level + 1
            this.title.string = skill.name
            this.current_level.string = "LV" + level
            this.next_level.string = "LV" + next
            window.appContext.Pool.setSpriteFrameByUrl(skill.icon, this.icon);
            window.appContext.Pool.setSpriteFrameByUrl(skill.resource, this.resource);
            this.resource.node.active = !bool_max
            this.price.string = (skill.cost_per_level * level).toString() + "/" + window.appContext.DataContainer.RoleData.money
            this.price.node.active = !bool_max
            this.btn.string = bool_max ? "已达顶级" : "升 级"
            this.check_requirement = bool_max || Util.CheckResource(skill.resource, skill.cost_per_level * level)
            this.price.node.color = this.check_requirement ? Util.ButtonColor("highlight") : Util.ButtonColor("shortage")

            let attributes: Map<string, number> = Util.get_attributes(skill)
            let expand_current = Math.pow(level, 2) * skill.level_2_expand + level * skill.level_1_expand
            let expand_next = Math.pow(next, 2) * skill.level_2_expand + next * skill.level_1_expand
            let attr_array_current: Array<string> = new Array()
            let attr_array_next: Array<string> = new Array()
            for (let [k, v] of attributes) {
                  attr_array_current.push(k + " + " + (v + expand_current))
                  attr_array_next.push(k + " + " + (v + expand_next))
            }
            this.current_describe.string = Util.join("\n", attr_array_current);
            this.next_describe.string = Util.join("\n", attr_array_next);
      }

      public bind_data(info: any) {
            Debug.log(info);
            this.id = info;
      }

      public show(info: any) {
            this.bind_data(info);

            this.ShowByData()
      }

      public Upgrade() {
            if (this.check_requirement) {
                  let self = this
                  window.appContext.WebApi.upgrade_skill(this.id, this, function (succData) {
                        window.appContext.WebApi.get_character_info(["skill", "main", "attribute"], this, function (data) {
                              window.appContext.DataContainer.set_SkillData(data.skill)
                              window.appContext.DataContainer.set_RoleData(data.main)
                              window.appContext.DataContainer.set_UserAttributeData(data.attribute)
                              self.ShowByData()
                              let SkillPanel = window.appContext.UIManager.getCurrentPanel<SkillPanel>();
                              SkillPanel.refresh()
                        })
                  });
            }
      }
}
