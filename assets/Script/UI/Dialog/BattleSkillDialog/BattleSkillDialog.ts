import { BaseDialog } from "../../Common/BaseDialog";
import { BattleSkillItemData } from "./ItemList/BattleSkills";
import BattleSkillList from "./ItemList/BattleSkillList";
import WarList from "./ItemList/WarList";
import SkillPanel from "../../Panel/SkillPanel/SkillPanel";


const { ccclass, property } = cc._decorator;

@ccclass
export default class BattleSkillDialog extends BaseDialog {

      private current_talents: Array<number> = new Array()

      @property(cc.Label)
      public title: cc.Label;

      @property(BattleSkillList)
      public BattleSkillList: BattleSkillList;

      @property(WarList)
      public WarList: WarList;

      private sortById(a, b) {
            return a.talent_id - b.talent_id
      }

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

      public refreshShow() {
            this.WarList.ApplyData(this.current_talents)
      }

      public showByBattleSkill() {
            let data = window.appContext.DataContainer.get_BattleSkillData()
            //{"id": self.id, "first": self.first, "second": self.second, "third": self.third, "fourth": self.fourth}
            let data_list: Array<number> = new Array()
            if (data.first) {
                  data_list.push(data.first)
            }
            if (data.second) {
                  data_list.push(data.second)
            }
            if (data.third) {
                  data_list.push(data.third)
            }
            if (data.fourth) {
                  data_list.push(data.fourth)
            }

            this.current_talents = data_list
            this.refreshShow()
      }

      public ShowByData() {
            let data_list: Array<BattleSkillItemData> = new Array()
            let talents = window.appContext.DataContainer.get_TalentData()
            for (let x of talents.talent) {
                  if (x.type == 1) {
                        data_list.push(new BattleSkillItemData(x))
                  }
            }
            data_list.sort(this.sortById)
            this.BattleSkillList.ApplyData(data_list)
      }

      public refresh(refresh: boolean = false) {
            this.ShowByData()

            let self = this
            if (refresh) {
                  window.appContext.WebApi.get_character_info(["battle_skill", "attribute"], this, function (data) {
                        window.appContext.DataContainer.set_BattleSkillData(data.battle_skill)
                        window.appContext.DataContainer.set_UserAttributeData(data.attribute)
                        self.showByBattleSkill()
                  });
            }
            else {
                  this.showByBattleSkill()
            }
      }

      public bind_data(info) {
      }

      public show(info: any) {
            this.bind_data(info);

            this.refresh()
      }

      public set(talent_id: number) {
            let index = this.current_talents.indexOf(talent_id, 0);
            if (index <= -1 && this.current_talents.length < 4) {
                  this.current_talents.push(talent_id)
                  this.refreshShow()
            }
      }

      public remove(talent_id: number) {
            let index = this.current_talents.indexOf(talent_id, 0);
            if (index > -1 && this.current_talents.length > 0) {
                  this.current_talents.splice(index, 1);
                  this.refreshShow()
            }
      }

      public Save() {
            let self = this
            window.appContext.WebApi.set_skill_list(this.current_talents, this,
                  function (succData) {
                        self.refresh(true)
                        //let SkillPanel: SkillPanel = window.appContext.UIManager.getCurrentPanel();
                        //SkillPanel.refresh()
                  });
      }
}
