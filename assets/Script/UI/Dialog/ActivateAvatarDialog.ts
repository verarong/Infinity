import { BaseDialog } from "../Common/BaseDialog";
import { Debug } from "../../Common/Debug";
import { AvatarData } from "../../Common/JsonData/JsonData";
import { Util } from "../../Common/Utils/Util";
import { PrefabUrl } from "../../Manager/PrefabUrl";
import AvatarDialog from "./AvatarDialog/AvatarDialog";



const { ccclass, property } = cc._decorator;

@ccclass
export default class ActivateAvatarDialog extends BaseDialog {

      private data_: any;
      private avatar_type: string;
      private avatar_id: number;
      private check_requirement_choice1: boolean = true;
      private check_requirement_choice2: boolean = true;

      @property(cc.Label)
      public choice1: cc.Label;

      @property(cc.Label)
      public choice2: cc.Label;

      start() {
            this.fastShowAnim();
      }

      reset(currentIndex: number): void {
            //TODO
      }

      getData(): any {
            return this.avatar_id;
      }

      closeDialog(): any {
            this.hide();
      }

      public bind(info: any) {
            Debug.log(info);
            this.data_ = info;
            this.avatar_type = info.avatar_type;
            this.avatar_id = info.avatar_id;
      }

      public show(info: any, start = "消耗 ", mid_money = " 灵石激活形象", mid_jade = " 仙玉激活形象") {
            this.bind(info);

            let avatar: AvatarData = window.appContext.ConfigManager.GetAvatar(this.avatar_type, this.avatar_id);

            this.choice1.string = start + avatar.activate_jade + mid_jade;
            this.choice2.string = start + avatar.activate_money + mid_money;
            if (!Util.CheckResource("jade", avatar.activate_jade)) {
                  this.choice1.node.color = Util.ButtonColor("shortage")
                  this.choice1.getComponent(cc.LabelOutline).enabled = false
                  this.check_requirement_choice1 = false
            }
            else {
                  this.choice1.node.color = Util.ButtonColor("highlight")
                  this.choice1.getComponent(cc.LabelOutline).enabled = true
                  this.check_requirement_choice1 = true
            }
            if (!Util.CheckResource("money", avatar.activate_money)) {
                  this.choice2.node.color = Util.ButtonColor("shortage")
                  this.choice2.getComponent(cc.LabelOutline).enabled = false
                  this.check_requirement_choice2 = false
            }
            else {
                  this.choice2.node.color = Util.ButtonColor("highlight")
                  this.choice2.getComponent(cc.LabelOutline).enabled = true
                  this.check_requirement_choice2 = true
            }
      }

      public choice(resource_type: string) {
            window.appContext.WebApi.activate_avatar(this.avatar_type, this.avatar_id, resource_type, this,
                  function (succData) {
                        this.hide();
                        let avatar: AvatarDialog = window.appContext.UIManager.getDialog(PrefabUrl.AvatarDialog);
                        avatar.refresh(true, this.data_)
                  }
            );
      }

      public choice_1() {
            if (this.check_requirement_choice1) {
                  this.choice("jade")
            }
      }

      public choice_2() {
            if (this.check_requirement_choice2) {
                  this.choice("money")
            }
      }
}
