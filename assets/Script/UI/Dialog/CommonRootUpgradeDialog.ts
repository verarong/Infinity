import { BaseDialog } from "../Common/BaseDialog";
import { Debug } from "../../Common/Debug";
import { RootData } from "../../Common/JsonData/JsonData";
import { Util } from "../../Common/Utils/Util";


const { ccclass, property } = cc._decorator;

@ccclass
export default class CommonRootUpgradeDialog extends BaseDialog {

      private gold: number;
      private wood: number;
      private water: number;
      private fire: number;
      private soil: number;
      private check_requirement_gold: boolean;
      private check_requirement_wood: boolean;
      private check_requirement_water: boolean;
      private check_requirement_fire: boolean;
      private check_requirement_soil: boolean;

      @property(cc.Label)
      public title: cc.Label;

      @property(cc.Label)
      public chaos: cc.Label;

      @property(cc.Label)
      public gold_level: cc.Label;

      @property(cc.Label)
      public gold_describe: cc.Label;

      @property(cc.Label)
      public gold_require: cc.Label;

      @property(cc.Label)
      public wood_level: cc.Label;

      @property(cc.Label)
      public wood_describe: cc.Label;

      @property(cc.Label)
      public wood_require: cc.Label;

      @property(cc.Label)
      public water_level: cc.Label;

      @property(cc.Label)
      public water_describe: cc.Label;

      @property(cc.Label)
      public water_require: cc.Label;

      @property(cc.Label)
      public fire_level: cc.Label;

      @property(cc.Label)
      public fire_describe: cc.Label;

      @property(cc.Label)
      public fire_require: cc.Label;

      @property(cc.Label)
      public soil_level: cc.Label;

      @property(cc.Label)
      public soil_describe: cc.Label;

      @property(cc.Label)
      public soil_require: cc.Label;

      public gold_upgrade() {
            if (this.check_requirement_gold) {
                  this.Upgrade("gold")
            }
      }

      public wood_upgrade() {
            if (this.check_requirement_wood) {
                  this.Upgrade("wood")
            }
      }

      public water_upgrade() {
            if (this.check_requirement_water) {
                  this.Upgrade("water")
            }
      }

      public fire_upgrade() {
            if (this.check_requirement_fire) {
                  this.Upgrade("fire")
            }
      }

      public soil_upgrade() {
            if (this.check_requirement_soil) {
                  this.Upgrade("soil")
            }
      }

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

      public bind_data(info: any) {
            Debug.log(info);
      }

      public get_level_name(level: number): string {
            let root: RootData = window.appContext.ConfigManager.GetrootById(level)
            return root.name
      }

      public get_describe(level: number, type: string): string {
            let root: RootData = window.appContext.ConfigManager.GetrootById(level)
            let describe: string = type + "攻击+" + root.element_attack + "\n" + type + "防御+" + root.element_resistance
            return describe
      }

      public get_requirement(level: number): string {
            let root: RootData = window.appContext.ConfigManager.GetrootById(level)
            if (root.amount) {
                  return "需物品:\n" + window.appContext.ConfigManager.GetitemByItemId(root.item_require).name + "*" + root.amount
            }
            else {
                  return "需鸿蒙紫气\n" + root.chaos_require
            }
      }

      public check_requirement(level: number): boolean {
            let root: RootData = window.appContext.ConfigManager.GetrootById(level)
            if (root.amount) {
                  return Util.CheckItem(root.item_require, root.amount)
            }
            else {
                  return Util.CheckResource("chaos", root.chaos_require)
            }
      }

      public ShowByData() {
            let [gold, wood, water, fire, soil] = window.appContext.DataContainer.get_RoleData().root.split(",");
            this.gold = parseInt(gold)
            this.wood = parseInt(wood)
            this.water = parseInt(water)
            this.fire = parseInt(fire)
            this.soil = parseInt(soil)

            let max: number = window.appContext.ConfigManager.GetMaxRootLevel()
            this.chaos.string = window.appContext.DataContainer.RoleData.chaos.toString()

            this.gold_level.string = this.get_level_name(this.gold)
            this.gold_describe.string = this.get_describe(this.gold, "金")
            this.gold_require.string = this.gold == max ? "已达顶级" : this.get_requirement(this.gold)
            if (!this.check_requirement(this.gold)) {
                  this.gold_require.node.color = Util.ButtonColor("shortage")
                  this.check_requirement_gold = false
            }
            else {
                  this.gold_require.node.color = Util.ButtonColor("common")
                  this.check_requirement_gold = true
            }

            this.wood_level.string = this.get_level_name(this.wood)
            this.wood_describe.string = this.get_describe(this.wood, "木")
            this.wood_require.string = this.wood == max ? "已达顶级" : this.get_requirement(this.wood)
            if (!this.check_requirement(this.wood)) {
                  this.wood_require.node.color = Util.ButtonColor("shortage")
                  this.check_requirement_wood = false
            }
            else {
                  this.wood_require.node.color = Util.ButtonColor("common")
                  this.check_requirement_wood = true
            }

            this.water_level.string = this.get_level_name(this.water)
            this.water_describe.string = this.get_describe(this.water, "水")
            this.water_require.string = this.water == max ? "已达顶级" : this.get_requirement(this.water)
            if (!this.check_requirement(this.water)) {
                  this.water_require.node.color = Util.ButtonColor("shortage")
                  this.check_requirement_water = false
            }
            else {
                  this.water_require.node.color = Util.ButtonColor("common")
                  this.check_requirement_water = true
            }

            this.fire_level.string = this.get_level_name(this.fire)
            this.fire_describe.string = this.get_describe(this.fire, "火")
            this.fire_require.string = this.fire == max ? "已达顶级" : this.get_requirement(this.fire)
            if (!this.check_requirement(this.fire)) {
                  this.fire_require.node.color = Util.ButtonColor("shortage")
                  this.check_requirement_fire = false
            }
            else {
                  this.fire_require.node.color = Util.ButtonColor("common")
                  this.check_requirement_fire = true
            }

            this.soil_level.string = this.get_level_name(this.soil)
            this.soil_describe.string = this.get_describe(this.soil, "土")
            this.soil_require.string = this.soil == max ? "已达顶级" : this.get_requirement(this.soil)
            if (!this.check_requirement(this.soil)) {
                  this.soil_require.node.color = Util.ButtonColor("shortage")
                  this.check_requirement_soil = false
            }
            else {
                  this.soil_require.node.color = Util.ButtonColor("common")
                  this.check_requirement_soil = true
            }
      }

      public show(info: any) {
            this.bind_data(info);

            this.ShowByData()
      }

      public Upgrade(root_type: string) {
            let self = this
            window.appContext.WebApi.root_upgrade(root_type, this, function () {
                  window.appContext.WebApi.get_character_info(["main", "item", "attribute"], this, function (data) {
                        window.appContext.DataContainer.set_ItemData(data.item)
                        window.appContext.DataContainer.set_RoleData(data.main)
                        window.appContext.DataContainer.set_UserAttributeData(data.attribute)
                        self.ShowByData()
                  });
            });
      }
}
