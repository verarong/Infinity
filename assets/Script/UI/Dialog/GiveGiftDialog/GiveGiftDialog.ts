import { BaseDialog } from "../../Common/BaseDialog";
import { PartnerData } from "../../../Common/JsonData/JsonData";
import PartnerPanel from "../../Panel/PartnerPanel/PartnerPanel";
import { GiftList } from "./ItemList/GiftList";
import { GiftData } from "./ItemList/GiftData";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GiveGiftDialog extends BaseDialog {

      private partner: PartnerData;
      private selected: number;

      @property(cc.Label)
      public describe: cc.Label;

      @property(GiftList)
      public GiftList: GiftList;

      private sortByItemId(a: GiftData, b: GiftData) {
            return a.item_id - b.item_id
        }

      start() {
            this.fastShowAnim();
      }

      getData(): any {
            return this.partner;
      }

      closeDialog(): any {
            this.hide();
      }

      public ShowByData() {
            this.describe.string = this.partner.gift_describe
            let data_list: Array<GiftData> = new Array();
            let data = window.appContext.DataContainer.get_ItemData()
            for (let i of data.item) {
                  data_list.push(new GiftData(i))
            }
            this.GiftList.ApplyData(data_list.sort(this.sortByItemId));
      }

      public bind_data(info: any) {
            this.partner = info;
      }

      public show(info) {
            this.bind_data(info);

            this.ShowByData()
      }

      public select(item_id: number) {
            this.selected = item_id
      }

      public give_gift() {
            if (this.selected) {
                  let self = this
                  window.appContext.WebApi.give_gift(this.partner.id, this.selected, this, function (data) {
                        window.appContext.WebApi.get_character_info(["partner", "item", "attribute", "daily_task"], this, function (data) {
                              window.appContext.DataContainer.set_PartnerData(data.partner)
                              window.appContext.DataContainer.set_ItemData(data.item)
                              window.appContext.DataContainer.set_UserAttributeData(data.attribute)
                              window.appContext.DataContainer.set_DailyTaskData(data.daily_task)
                              let partner: PartnerPanel = window.appContext.UIManager.getCurrentPanel()
                              partner.refresh()
                              self.hide()
                        });
                  })
            }
      }
}
