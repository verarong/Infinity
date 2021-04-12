
import { ItemsList } from "./Package/ItemsList";
import { EquipmentsList } from "./Package/EquipmentsList";
import { UIComponent } from "../../Common/UIComponent";
import { PrefabUrl } from "../../../Manager/PrefabUrl";
import { ItemsData } from "./Package/CharacterPanelData";
import { EquipmentsData } from "./Package/CharacterPanelData";

const { ccclass, property } = cc._decorator;

@ccclass
export default class CharacterPanel extends UIComponent {

    private item_data: Array<ItemsData>;

    @property(ItemsList)
    public ItemsList: ItemsList;

    @property(EquipmentsList)
    public EquipmentsList: EquipmentsList;

    public BackBtnClick() {
        window.appContext.UIManager.ShowPanel(PrefabUrl.DomainPanel);
    }

    private sortByItemId(a: ItemsData, b: ItemsData) {
        return a.item_id - b.item_id
    }

    public sortPackage() {
        let data = this.item_data.sort(this.sortByItemId)
        this.ItemsList.ApplyData(data);
    }

    public sellBatch() {
        let self = this
        window.appContext.WebApi.recover_item_batch(this, function () {
            self.refresh(true)
        });
    }

    public recoverSetting() {
        window.appContext.UIManager.ShowDialog(PrefabUrl.RecoverSettingDialog)
    }

    public attributeDetail() {
        window.appContext.UIManager.ShowDialog(PrefabUrl.UserAttributeDialog)
    }

    public ShowByItemData() {
        let data = window.appContext.DataContainer.get_ItemData()
        let data_list: Array<ItemsData> = new Array();
        let package_amount = window.appContext.ConfigManager.GetBasicValueByType("package_amount")
        for (let i = 0; i < package_amount; i++) {
            if (i < data.item.length) {
                data_list.push(new ItemsData(false, data.item[i]))
            }
            else {
                data_list.push(new ItemsData(true))
            }
        }
        this.item_data = data_list
        this.ItemsList.ApplyData(data_list.sort(this.sortByItemId));
    }

    public ShowByEquipmentData() {
        let data = window.appContext.DataContainer.get_EquipmentData()
        let data_list: Array<EquipmentsData> = new Array();
        for (let equip of data.equipment) {
            data_list.push(new EquipmentsData(equip))
        }
        this.EquipmentsList.ApplyData(data_list);
    }

    public refresh(refresh: boolean = false) {
        let self = this
        if (refresh) {
            window.appContext.WebApi.get_character_info(["item", "equipment", "main", "formula", "skill", "attribute"], this, function (data) {
                window.appContext.DataContainer.set_ItemData(data.item)
                window.appContext.DataContainer.set_EquipmentData(data.equipment)
                window.appContext.DataContainer.set_RoleData(data.main)
                window.appContext.DataContainer.set_FormulaData(data.formula)
                window.appContext.DataContainer.set_SkillData(data.skill)
                window.appContext.DataContainer.set_UserAttributeData(data.attribute)
                self.ShowByItemData()
                self.ShowByEquipmentData()
            });
        }
        else {
            this.ShowByItemData()
            this.ShowByEquipmentData()
        }
    }

    onEnable() {
        this.refresh()
    }
}
