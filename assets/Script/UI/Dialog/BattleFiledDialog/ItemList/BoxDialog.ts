import { BaseDialog } from "../../../Common/BaseDialog";
import { Debug } from "../../../../Common/Debug";
import { BoxData } from "../../../../Common/JsonData/JsonData";
import { PrefabUrl } from "../../../../Manager/PrefabUrl";
import BattleFiledDialog from "../BattleFiledDialog";


const { ccclass, property } = cc._decorator;

@ccclass
export default class BoxDialog extends BaseDialog {
      private node_id: string;
      private box_id: number;

      @property(cc.Label)
      public title: cc.Label;

      @property(cc.Label)
      public describe: cc.Label;

      @property(cc.Sprite)
      public icon: cc.Sprite;

      @property(cc.Sprite)
      public icon_bg: cc.Sprite;

      @property(cc.Sprite)
      public icon_phase: cc.Sprite;

      @property(cc.Label)
      public amount: cc.Label;

      start() {
            this.fastShowAnim();
      }

      reset(currentIndex: number): void {
            //TODO
      }

      getData(): any {
            return this.box_id;
      }

      closeDialog(): any {
            this.hide();
      }

      public bind(info: any) {
            Debug.log(info);
            this.node_id = info[0];
            this.box_id = info[1];
      }

      public show(info: any, start: string = "X") {
            this.bind(info);

            let box_data: BoxData = window.appContext.ConfigManager.GetboxById(this.box_id);
            let item_data: any = window.appContext.ConfigManager.GetitemByItemId(box_data.award_id);
            this.amount.string = start + box_data.award_amount.toString()
            //      this.describe.string = item_data.describe
            window.appContext.Pool.setSpriteFrameByUrl(item_data.icon, this.icon);
            window.appContext.Pool.setSpriteFrameByUrl(item_data.icon_bg, this.icon_bg);
            if (item_data.icon_phase) {
                  window.appContext.Pool.setSpriteFrameByUrl(item_data.icon_phase, this.icon_phase);
            } else {
                  this.icon_phase.enabled = false
            }
      }

      public GetAward(choice_id: number) {
            let self = this
            window.appContext.WebApi.box_node(this.node_id, this,
                  function (succData) {
                        window.appContext.WebApi.get_character_info(["battle"], this, function (data) {
                              window.appContext.DataContainer.set_BattleData(data.battle)
                              let battleFiledDialog = window.appContext.UIManager.getDialog(PrefabUrl.BattleFiledDialog) as BattleFiledDialog;
                              battleFiledDialog.refresh()
                              self.hide();
                        })
                  }
            );
      }
}
