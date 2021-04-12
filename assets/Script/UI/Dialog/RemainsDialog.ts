import { Debug } from "../../Common/Debug";
import { RemainsData } from "../../Common/JsonData/JsonData";
import { Util } from "../../Common/Utils/Util";
import { PrefabUrl } from "../../Manager/PrefabUrl";
import { BaseDialog } from "../Common/BaseDialog";
import RemainsPanel from "../Panel/RemainsPanel/RemainsPanel";
import { RemainsPaginateData } from "./RemainsPaginateDialog/ItemList/RemainsPaginateData";
import RemainsPaginateDialog from "./RemainsPaginateDialog/RemainsPaginateDialog";


const { ccclass, property } = cc._decorator;

@ccclass
export default class RemainsDialog extends BaseDialog {

      private remain: RemainsData
      private data_: RemainsPaginateData;
      private terminal: number;

      @property(cc.Label)
      public title: cc.Label;

      @property(cc.Label)
      public user_name: cc.Label;

      @property(cc.Label)
      public conquer_user_name: cc.Label;

      @property(cc.Sprite)
      public icon: cc.Sprite;

      @property(cc.Label)
      public time: cc.Label;

      @property(cc.Label)
      public timer: cc.Label;

      @property(cc.Node)
      public harvest_btn: cc.Node;

      @property(cc.Node)
      public capture_btn: cc.Node;

      @property(cc.Node)
      public conquer_btn: cc.Node;

      @property(cc.Node)
      public emancipate_btn: cc.Node;

      start() {
            //this.fastShowAnim();
      }

      reset(currentIndex: number): void {
            //TODO
      }

      getData(): RemainsPaginateData {
            return this.data_;
      }

      closeDialog(): any {
            this.hide();
      }

      public bind(info: any) {
            Debug.log(info);
            this.data_ = info;
            this.remain = window.appContext.ConfigManager.GetRemainsByQuality(this.data_.quality)
            this.terminal = this.data_.capture_timestamp + this.remain.max_hour * 3600
      }

      public show(info: any) {
            this.bind(info);

            this.time.string = this.data_.user_name ? "剩余时间" : "最长占领"
            this.timer.string = this.remain.max_hour + "小时"
            this.title.string = this.remain.name
            this.user_name.string = this.data_.user_name ? this.data_.user_name : "无"
            this.conquer_user_name.string = this.data_.conquer_user_name ? this.data_.conquer_user_name : "无"
            window.appContext.Pool.setSpriteFrameByUrl("remains_" + this.data_.quality, this.icon);

            this.harvest_btn.active = this.data_.user_id == window.appContext.DataContainer.RoleData.id
            this.capture_btn.active = this.data_.user_id != window.appContext.DataContainer.RoleData.id && this.data_.conquer_user_id != window.appContext.DataContainer.RoleData.id
            this.conquer_btn.active = this.data_.user_id != 0 && this.data_.user_id != window.appContext.DataContainer.RoleData.id && this.data_.conquer_user_id != window.appContext.DataContainer.RoleData.id
            this.emancipate_btn.active = this.data_.user_id == window.appContext.DataContainer.RoleData.id && this.data_.conquer_user_id != 0

            let rest: number = this.terminal - Math.floor(new Date().getTime() / 1000)
            this.unscheduleAllCallbacks();
            this.schedule(function () {
                  if (this.data_.capture_timestamp && rest >= 0) {
                        this.timer.string = Util.FormatCountDown(rest)
                        rest--
                  }
                  if (this.data_.capture_timestamp && rest <= 0) {
                        this.refresh_show()
                  }
            }, 1, cc.macro.REPEAT_FOREVER, 0)
      }

      public refresh_show() {
            let RemainsPaginateDialog: RemainsPaginateDialog = window.appContext.UIManager.getDialog(PrefabUrl.RemainsPaginateDialog)
            if (RemainsPaginateDialog) {
                  RemainsPaginateDialog.refresh()
            }

            let RemainsPanel: RemainsPanel = window.appContext.UIManager.getCurrentPanel()
            RemainsPanel.refresh(true)
      }

      public capture() {
            let self = this;
            if (this.data_.user_id) {
                  window.appContext.WebApi.remains_capture_exist(this.data_.remains_id, this,
                        function (succData) {
                              window.appContext.UIManager.ShowDialog(PrefabUrl.FightDialog, succData);
                              self.refresh_show()
                              self.hide()
                        })
            }
            else {
                  window.appContext.WebApi.remains_capture_free(this.data_.quality, this,
                        function (succData) {
                              window.appContext.UIManager.ShowDialog(PrefabUrl.FightDialog, succData);
                              self.refresh_show()
                              self.hide()
                        })
            }
      }

      public harvest() {
            let self = this;
            window.appContext.WebApi.remains_harvest(this.data_.remains_id, this,
                  function (succeed_data) {
                        window.appContext.WebApi.get_character_info(["remains", "main", "item"], this, function (data) {
                              window.appContext.DataContainer.set_RemainsData(data.remains)
                              window.appContext.DataContainer.set_RoleData(data.main)
                              window.appContext.DataContainer.set_ItemData(data.item)
                              self.refresh_show()
                              self.hide()
                              window.appContext.UIManager.ShowDialog(PrefabUrl.TaskAwardDialog, succeed_data)
                        })
                  });
      }

      public remains_harvest() {
            if (window.appContext.DataContainer.get_RemainsData().remains_capture[0]) {
                  window.appContext.UIManager.ShowCommonDialog("提前收获将获得部分收益", "提示", false, this, this.harvest, null, true)
            }
            else {
                  this.harvest()
            }
      }

      public remains_conquer() {
            let self = this;
            window.appContext.WebApi.remains_conquer(this.data_.remains_id, this,
                  function (succData) {
                        window.appContext.UIManager.ShowDialog(PrefabUrl.FightDialog, succData);
                        self.refresh_show()
                        self.hide()
                  })
      }

      public remains_emancipate() {
            let self = this;
            window.appContext.WebApi.remains_emancipate(this,
                  function (succData) {
                        window.appContext.UIManager.ShowDialog(PrefabUrl.FightDialog, succData);
                        self.refresh_show()
                        self.hide()
                  })
      }
}
