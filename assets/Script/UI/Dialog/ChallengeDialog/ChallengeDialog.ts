import { BaseDialog } from "../../Common/BaseDialog";
import { Debug } from "../../../Common/Debug";
import { ChallengeItemData } from "./ItemList/ChallengeItemData";
import ChallengeList from "./ItemList/ChallengeList";
import { Util } from "../../../Common/Utils/Util";
import { PrefabUrl } from "../../../Manager/PrefabUrl";


const { ccclass, property } = cc._decorator;

@ccclass
export default class ChallengeDialog extends BaseDialog {

      private selected: number = 0;
      private fighting: boolean = false;
      private challenge_item: ChallengeItemData = null;
      private challenge_data: Array<ChallengeItemData> = new Array()

      @property(cc.Label)
      public title: cc.Label;

      @property(cc.Sprite)
      public animation: cc.Sprite;

      @property(cc.Label)
      public step: cc.Label;

      @property(cc.Label)
      public btn: cc.Label;

      @property(cc.Sprite)
      public keys: cc.Sprite;

      @property(ChallengeList)
      public ChallengeList: ChallengeList;

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

      public showBySelected(select = null) {
            if (select == null) {
                  this.selected = 0
            }
            else {
                  this.selected = select
            }
            this.challenge_item = this.challenge_data[this.selected]

            window.appContext.Pool.setSpriteFrameByUrl(this.challenge_item.monster.icon, this.animation);
            this.btn.string = this.fighting && !this.challenge_item.free ? "战斗" : "X " + this.challenge_item.challenge.cost_amount
            this.step.string = Util.changeToCN(this.challenge_item.step)
            //window.appContext.Pool.setSpriteFrameByUrl(this.challenge_item.challenge.cost_item, this.keys);

            this.step.node.active = !this.challenge_item.free
            this.btn.node.active = this.challenge_item.free || this.fighting
            this.keys.node.active = this.challenge_item.free
      }

      public ShowByData() {
            let data_list: Array<ChallengeItemData> = new Array();
            let phase: number = window.appContext.DataContainer.get_RoleData().phase
            for (let i = phase; i > 0; i--) {
                  data_list.push(new ChallengeItemData(i))
            }
            this.fighting = window.appContext.DataContainer.get_ChallengeData().phase > 0
            this.challenge_data = data_list

            this.selected = this.selected ? this.selected : 0
            this.ChallengeList.ApplyData(this.challenge_data, this.selected);
            this.showBySelected(this.selected)
      }

      public refresh(refresh: boolean = false, select = null) {
            this.selected = select

            let self = this
            if (refresh || window.appContext.DataContainer.get_ChallengeData() == undefined) {
                  window.appContext.WebApi.get_character_info(["infinity_mode", "main", "item", "daily_task"], this, function (data) {
                        window.appContext.DataContainer.set_ChallengeData(data.infinity_mode)
                        window.appContext.DataContainer.set_RoleData(data.main)
                        window.appContext.DataContainer.set_ItemData(data.item)
                        window.appContext.DataContainer.set_DailyTaskData(data.daily_task)
                        self.ShowByData()
                  });
            }
            else {
                  self.ShowByData()
            }
      }

      public bind_data(info: any) {
            Debug.log(info);
      }

      public show(info: any) {
            this.bind_data(info);
            this.refresh()
      }

      public newChallenge() {
            let self = this
            window.appContext.WebApi.new_infinity_challenge(this.challenge_item.phase, this,
                  function (succData) {
                        self.refresh(true, self.selected)
                  });
      }

      public onBtnClick() {
            let self = this
            if (this.fighting && !this.challenge_item.free) {
                  window.appContext.WebApi.infinity_challenge(this,
                        function (succData) {
                              window.appContext.UIManager.ShowDialog(PrefabUrl.FightDialog, succData);
                              self.refresh(true, self.selected)
                        });
            }
            else if (this.fighting) {
                  window.appContext.UIManager.ShowCommonDialog("开启新挑战将覆盖当前挑战", "提示", false, this, this.newChallenge, null, true)
            }
            else {
                  this.newChallenge()
            }
      }
}
