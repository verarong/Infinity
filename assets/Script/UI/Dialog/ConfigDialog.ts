import { Debug } from "../../Common/Debug";
import { PrefabUrl } from "../../Manager/PrefabUrl";
import { BaseDialog } from "../Common/BaseDialog";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ConfigDialog extends BaseDialog {

      @property(cc.Node)
      public music: cc.Node;

      @property(cc.Node)
      public sound: cc.Node;

      @property(cc.EditBox)
      public coupon: cc.EditBox;

      start() {
            this.fastShowAnim();
      }

      reset(currentIndex: number): void {
            //TODO
      }

      getData(): any {
            return
      }

      closeDialog(): any {
            this.hide();
      }

      public bind(info: any) {
            Debug.log(info);
      }

      public refresh() {
            try {
                  this.music.active = window.appContext.StoreManager.getItem("music")
                  this.sound.active = window.appContext.StoreManager.getItem("sound")
            }
            catch (error) {
            }
      }

      public show(info: any) {
            this.bind(info);

            this.refresh()
      }

      public onClickMusic() {
            let music = window.appContext.StoreManager.getItem("music")
            window.appContext.StoreManager.setItem("music", !music)
            this.refresh()
            window.appContext.SoundManager.startBackgroundMusic()
      }

      public onClickSound() {
            let sound = window.appContext.StoreManager.getItem("sound")
            window.appContext.StoreManager.setItem("sound", !sound)
            this.refresh()
      }

      public get_coupon() {
            window.appContext.WebApi.get_coupon(this.coupon.string, this, function (succeed_data) {
                  window.appContext.WebApi.get_character_info(["main", "item"], this, function (data) {
                        window.appContext.UIManager.ShowDialog(PrefabUrl.TaskAwardDialog, succeed_data)
                        window.appContext.DataContainer.set_RoleData(data.main)
                        window.appContext.DataContainer.set_ItemData(data.item)
                  });
            })
      }

      public switchAccount() {
            this.hide()
            window.appContext.UIManager.ShowPanel(PrefabUrl.LoginPanel)
      }
}
