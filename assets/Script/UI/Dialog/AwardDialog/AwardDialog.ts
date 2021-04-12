import ResourceList from "./ItemList/ResourceList";
import ItemsList from "./ItemList/AwardList";
import { BaseDialog } from "../../Common/BaseDialog";
import { Debug } from "../../../Common/Debug";
import { ResourceData, AwardData } from "./ItemList/AwardsData";
import AwardList from "./ItemList/AwardList";



const { ccclass, property } = cc._decorator;

@ccclass
export default class AwardDialog extends BaseDialog {

      private resource_data: any;
      private item_data: any;
      private secret_data: any;

      @property(cc.Node)
      public secret: cc.Node;

      @property(cc.Label)
      public secret_name: cc.Label;

      @property(cc.Sprite)
      public secret_icon: cc.Sprite;

      @property(cc.Sprite)
      public secret_phase: cc.Sprite;

      @property(ResourceList)
      public resources: ResourceList;

      @property(AwardList)
      public items: AwardList;

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
            window.appContext.SoundManager.play_get_gold();
            this.hide();
      }

      public ShowByData() {
            if (this.resource_data) {
                  this.resources.node.active = true
                  let data_list: Array<ResourceData> = new Array()
                  for (let key in this.resource_data) {
                        if (this.resource_data[key]) {
                              data_list.push(new ResourceData(key, this.resource_data[key]))
                        }
                  }
                  this.resources.ApplyData(data_list)
            }
            else {
                  this.resources.node.active = false
            }

            if (this.item_data && this.item_data.length > 0) {
                  this.items.node.active = true
                  let data_list: Array<AwardData> = new Array()
                  for (let x of this.item_data) {
                        data_list.push(new AwardData(x))
                  }
                  this.items.ApplyData(data_list)
            }
            else {
                  this.items.node.active = false
            }

            if (this.secret_data && Object.prototype.hasOwnProperty.call(this.secret_data, "quality")) {
                  this.secret.active = true
                  window.appContext.Pool.setSpriteFrameByUrl("secret_" + this.secret_data.quality, this.secret_icon);
                  window.appContext.Pool.setSpriteFrameByUrl("icon_phase_" + this.secret_data.phase, this.secret_phase);
                  this.secret_name.string = this.secret_data.name
            }
            else {
                  this.secret.active = false
            }

      }

      public bind_data(info: any) {
            Debug.log(info);
            this.resource_data = info[0];
            this.item_data = info[1];
            this.secret_data = info[2];
      }

      public show(info: any) {
            this.bind_data(info);

            this.ShowByData()
      }
}
