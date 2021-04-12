import { BaseDialog } from "../../Common/BaseDialog";
import { Debug } from "../../../Common/Debug";
import { Util } from "../../../Common/Utils/Util";
import BuildingPanel from "../../Panel/BuildingPanel/BuildingPanel";
import BadgeList from "./ItemList/BadgeList";
import { BadgeData } from "./ItemList/BadgeData";
import RoleData from "../../../Data/RoleData";

const { ccclass, property } = cc._decorator;

@ccclass
export default class CommonBuildingUpgradeDialog extends BaseDialog {

      private level: number;
      private id: number;

      @property(cc.Label)
      public title: cc.Label;

      @property(cc.Label)
      public current_level: cc.Label;

      @property(cc.Label)
      public current_describe: cc.Label;

      @property(cc.Label)
      public next_level: cc.Label;

      @property(cc.Label)
      public next_describe: cc.Label;

      @property(cc.Sprite)
      public icon: cc.Sprite;

      @property(BadgeList)
      public badge_list: BadgeList;

      @property(cc.Label)
      public btn: cc.Label;

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

      public ShowByData(level = "LV") {
            this.level = window.appContext.DataContainer.DomainLevel.get(this.id)
            let max: number = window.appContext.ConfigManager.GetMaxDomainLevelByBuildingId(this.id)
            let now = window.appContext.ConfigManager.GetdomainByBuildingIdAndLevel(this.id, this.level)
            let next = window.appContext.ConfigManager.GetdomainByBuildingIdAndLevel(this.id, this.level == max ? max : this.level + 1)
            this.btn.string = this.level == max ? "已达顶级" : "升级"
            this.badge_list.node.active = this.level < max
            this.title.string = now.building;
            this.current_level.string = level + now.level.toString();
            this.current_describe.string = now.efficiency_describe + now.efficiency;
            this.next_level.string = level + next.level.toString();
            this.next_describe.string = next.efficiency_describe + next.efficiency;
            window.appContext.Pool.setSpriteFrameByUrl(now.resource, this.icon);

            let requirement: Map<string, number> = new Map();
            let badge = ["dragon_badge", "tiger_badge", "phoenix_badge", "tortoise_badge"]
            for (let x of badge) {
                  if (now[x]) {
                        requirement.set(x, now[x])
                  }
            }

            let data_list: Array<BadgeData> = new Array()
            for (let [badge_require, amount_require] of requirement) {
                  data_list.push(new BadgeData(badge_require, amount_require))
            }
            this.badge_list.ApplyData(data_list)
      }

      public refresh(refresh: boolean = false) {
            if (refresh) {
                  window.appContext.WebApi.get_character_info(["main", "domain", "role_params"], this, function (data) {
                        Debug.log(data);
                        window.appContext.DataContainer.set_RoleData(data.main)
                        window.appContext.DataContainer.set_DomainData(data.domain)
                        window.appContext.DataContainer.set_GuideData(data.role_params)
                        this.ShowByData()
                        let BuildingPanel: BuildingPanel = window.appContext.UIManager.getCurrentPanel<BuildingPanel>();
                        BuildingPanel.refresh()
                  });
            }
            else {
                  this.ShowByData()
            }
      }

      public bind_data(info: any) {
            Debug.log(info);
            this.level = info[0];
            this.id = info[1];
            this.refresh()
      }

      public show(info: any) {
            this.bind_data(info);
      }

      public Upgrade() {
            let self = this
            window.appContext.WebApi.domain_upgrade(this.id, this,
                  function (succData) {
                        self.level += 1
                        self.refresh(true)
                  });
      }
}
