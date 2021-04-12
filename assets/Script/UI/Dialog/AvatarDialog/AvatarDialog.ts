import { BaseDialog } from "../../Common/BaseDialog";
import { Debug } from "../../../Common/Debug";
import { Util } from "../../../Common/Utils/Util";
import BuildingPanel from "../../Panel/BuildingPanel/BuildingPanel";
import { FrameList } from "./ItemList/FrameList";
import { HeadData, FrameData, AnimationData } from "./ItemList/AvatarData";
import { FrameItem } from "./ItemList/FrameItem";
import { HeadList } from "./ItemList/HeadList";
import { HeadItem } from "./ItemList/HeadItem";
import { AnimationList } from "./ItemList/AnimationList";
import { PrefabUrl } from "../../../Manager/PrefabUrl";
import DomainPanel from "../../Panel/DomainPanel/DomainPanel";

const { ccclass, property } = cc._decorator;

@ccclass
export default class AvatarDialog extends BaseDialog {

      private avatar_type: string;
      private avatar_id: number;
      private selected_data: HeadData | FrameData | AnimationData

      @property(HeadList)
      public head: HeadList;

      @property(FrameList)
      public frame: FrameList;

      @property(AnimationList)
      public animation: AnimationList;

      @property(cc.Label)
      public button: cc.Label;

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
            let head_list: Array<HeadData> = new Array();
            let frame_list: Array<FrameData> = new Array();
            let animation_list: Array<AnimationData> = new Array();

            for (let i of window.appContext.ConfigManager.GetAvatars()) {
                  if (i.avatar_type == "head") {
                        head_list.push(new HeadData(i.avatar_type, i.avatar_id))
                  }
                  else if (i.avatar_type == "frame") {
                        frame_list.push(new FrameData(i.avatar_type, i.avatar_id))
                  }
                  else if (i.avatar_type == "animation") {
                        animation_list.push(new AnimationData(i.avatar_type, i.avatar_id))
                  }
            }

            for (let i of head_list) {
                  if (i.avatar_type == this.avatar_type && i.avatar_id == this.avatar_id) {
                        this.selected_data = i
                        i.select()
                  }
            }
            for (let i of frame_list) {
                  if (i.avatar_type == this.avatar_type && i.avatar_id == this.avatar_id) {
                        this.selected_data = i
                        i.select()
                  }
            }
            for (let i of animation_list) {
                  if (i.avatar_type == this.avatar_type && i.avatar_id == this.avatar_id) {
                        this.selected_data = i
                        i.select()
                  }
            }

            this.head.ApplyData(head_list);
            this.frame.ApplyData(frame_list);
            this.animation.ApplyData(animation_list);


            if (this.selected_data.activated) {
                  this.button.string = "幻化"
            }
            else {
                  this.button.string = "激活"
            }
      }

      public refresh(refresh: boolean = false, selected_data: HeadData | FrameData | AnimationData = null) {
            let self = this
            if (refresh) {
                  window.appContext.WebApi.get_character_info(["avatar", "main", "attribute"], this, function (data) {
                        window.appContext.DataContainer.set_AvatarData(data.avatar)
                        window.appContext.DataContainer.set_RoleData(data.main)
                        window.appContext.DataContainer.set_UserAttributeData(data.attribute)
                        if (selected_data) {
                              self.avatar_type = selected_data.avatar_type
                              self.avatar_id = selected_data.avatar_id
                        }
                        else {
                              self.avatar_type == "head"
                              self.avatar_id = 1
                        }
                        self.ShowByData()
                        let domain: DomainPanel = window.appContext.UIManager.getCurrentPanel()
                        domain.refresh()
                  });
            }
            else {
                  if (selected_data) {
                        this.avatar_type = selected_data.avatar_type
                        this.avatar_id = selected_data.avatar_id
                  }
                  else {
                        this.avatar_type = "head"
                        this.avatar_id = 1
                  }
                  self.ShowByData()
            }
      }

      public show(info: any) {
            this.refresh()
      }

      public decorate() {
            if (!this.selected_data.activated) {
                  window.appContext.UIManager.ShowDialog(PrefabUrl.ActivateAvatarDialog, this.selected_data)
            }
            else {
                  let self = this
                  window.appContext.WebApi.set_avatar(this.avatar_type, this.avatar_id, this,
                        function (succData) {
                              self.refresh(true, self.selected_data)
                        });
            }
      }
}
