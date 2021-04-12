import { BaseDialog } from "../../../Common/BaseDialog";
import { Debug } from "../../../../Common/Debug";
import { BuffData, EventData } from "../../../../Common/JsonData/JsonData";
import { PrefabUrl } from "../../../../Manager/PrefabUrl";
import BattleFiledDialog from "../BattleFiledDialog";
import { Util } from "../../../../Common/Utils/Util";
import { BattleFiledData } from "./BattleFiledData";
import { Buff } from "./Buff";


const { ccclass, property } = cc._decorator;

@ccclass
export default class BuffChoiceDialog extends BaseDialog {
      private _data: BattleFiledData;

      @property(cc.Sprite)
      public icon1: cc.Sprite;

      @property(cc.Sprite)
      public icon2: cc.Sprite;

      @property(cc.Sprite)
      public icon3: cc.Sprite;

      @property(cc.Label)
      public choice1: cc.Label;

      @property(cc.Label)
      public choice2: cc.Label;

      @property(cc.Label)
      public choice3: cc.Label;

      start() {
            this.fastShowAnim();
      }

      reset(currentIndex: number): void {
            //TODO
      }

      getData(): any {
            return this._data;
      }

      closeDialog(): any {
            this.hide();
      }

      public bind(info: any) {
            Debug.log(info);
            this._data = info;
      }

      public show(info: any) {
            this.bind(info);

            let buff1: BuffData = window.appContext.ConfigManager.GetBuffById(this._data.legal_buff[0])
            window.appContext.Pool.setSpriteFrameByUrl(buff1.icon, this.icon1);
            this.choice1.string = buff1.describe_
            let buff2: BuffData = window.appContext.ConfigManager.GetBuffById(this._data.legal_buff[1])
            window.appContext.Pool.setSpriteFrameByUrl(buff2.icon, this.icon2);
            this.choice2.string = buff2.describe_
            let buff3: BuffData = window.appContext.ConfigManager.GetBuffById(this._data.legal_buff[2])
            window.appContext.Pool.setSpriteFrameByUrl(buff3.icon, this.icon3);
            this.choice3.string = buff3.describe_
      }

      public choice(choice_id: number) {
            let self = this
            window.appContext.WebApi.fight_node(this._data.key, this._data.legal_buff[choice_id], this,
                  //战斗成功
                  function (succData) {
                        window.appContext.UIManager.ShowDialog(PrefabUrl.FightDialog, succData);
                        window.appContext.WebApi.get_character_info(["battle", "main"], this, function (data) {
                              window.appContext.DataContainer.set_BattleData(data.battle)
                              window.appContext.DataContainer.set_RoleData(data.main)
                              let battleFiledDialog = window.appContext.UIManager.getDialog(PrefabUrl.BattleFiledDialog) as BattleFiledDialog;
                              battleFiledDialog.refresh()
                              self.hide()
                        })
                  }
            );
      }

      public choice_1() {
            this.choice(0)
      }

      public choice_2() {
            this.choice(1)
      }

      public choice_3() {
            this.choice(2)
      }
}
