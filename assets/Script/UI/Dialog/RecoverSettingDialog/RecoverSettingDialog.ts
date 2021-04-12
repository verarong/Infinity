import { BaseDialog } from "../../Common/BaseDialog";
import { Debug } from "../../../Common/Debug";
import { Util } from "../../../Common/Utils/Util";
import BuildingPanel from "../../Panel/BuildingPanel/BuildingPanel";
import { QualityList } from "./ItemList/QualityList";
import { PhaseData, QualityData } from "./ItemList/RecoverData";
import { QualityItem } from "./ItemList/QualityItem";
import { PhaseList } from "./ItemList/PhaseList";
import { PhaseItem } from "./ItemList/PhaseItem";

const { ccclass, property } = cc._decorator;

@ccclass
export default class RecoverSettingDialog extends BaseDialog {

      @property(PhaseList)
      public item_phase_list: PhaseList;

      @property(PhaseList)
      public equipment_phase_list: PhaseList;

      @property(QualityList)
      public item_quality_list: QualityList;

      @property(QualityList)
      public equipment_quality_list: QualityList;

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
            let user_configs = window.appContext.DataContainer.get_ConfigsData().recover_config

            let item_phase_list: Array<PhaseData> = new Array()
            for (let i = 1; i <= window.appContext.ConfigManager.GetBasicValueByType("max_phase"); i++) {
                  item_phase_list.push(new PhaseData(i, user_configs.item_phase_list[i]))
            }
            this.item_phase_list.ApplyData(item_phase_list)

            let equipment_phase_list: Array<PhaseData> = new Array()
            for (let i = 1; i <= window.appContext.ConfigManager.GetBasicValueByType("max_phase"); i++) {
                  equipment_phase_list.push(new PhaseData(i, user_configs.equipment_phase_list[i]))
            }
            this.equipment_phase_list.ApplyData(equipment_phase_list)

            let item_quality_list: Array<QualityData> = new Array()
            for (let i = 1; i <= window.appContext.ConfigManager.GetBasicValueByType("max_quality"); i++) {
                  item_quality_list.push(new QualityData(i, user_configs.item_quality_list[i]))
            }
            this.item_quality_list.ApplyData(item_quality_list)

            let equipment_quality_list: Array<QualityData> = new Array()
            for (let i = 1; i <= window.appContext.ConfigManager.GetBasicValueByType("max_quality"); i++) {
                  equipment_quality_list.push(new QualityData(i, user_configs.equipment_quality_list[i]))
            }
            this.equipment_quality_list.ApplyData(equipment_quality_list)
      }

      public show(info: any) {
            this.ShowByData();
      }

      public setting() {
            let item_phase_list: Array<boolean> = new Array()
            item_phase_list.push(false)
            for (let i = 0; i < this.item_phase_list._itemList.length; i++) {
                  let item = this.item_phase_list.getItem(i) as PhaseItem
                  item_phase_list.push(item.bool_selected)
            }

            let equipment_phase_list: Array<boolean> = new Array()
            equipment_phase_list.push(false)
            for (let i = 0; i < this.equipment_phase_list._itemList.length; i++) {
                  let item = this.equipment_phase_list.getItem(i) as PhaseItem
                  equipment_phase_list.push(item.bool_selected)
            }

            let item_quality_list: Array<boolean> = new Array()
            item_quality_list.push(false)
            for (let i = 0; i < this.item_quality_list._itemList.length; i++) {
                  let item = this.item_quality_list.getItem(i) as QualityItem
                  item_quality_list.push(item.bool_selected)
            }

            let equipment_quality_list: Array<boolean> = new Array()
            equipment_quality_list.push(false)
            for (let i = 0; i < this.equipment_quality_list._itemList.length; i++) {
                  let item = this.equipment_quality_list.getItem(i) as QualityItem
                  equipment_quality_list.push(item.bool_selected)
            }

            let self = this
            window.appContext.WebApi.set_recover_configs(item_phase_list, equipment_phase_list, item_quality_list, equipment_quality_list, this,
                  function () {
                        window.appContext.DataContainer.refresh_ConfigsData()
                        self.hide();
                  });
      }
}
