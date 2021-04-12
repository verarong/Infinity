import { ThreadData } from "../../../../Common/JsonData/JsonData";
import { Item } from "../../../../ItemList/Item";
import { PrefabUrl } from "../../../../Manager/PrefabUrl";
import { PartnerMemoryPanelData } from "./PartnerPanelData";


const { ccclass, property } = cc._decorator;

@ccclass
export class PartnerMemory extends Item<PartnerMemoryPanelData> {

    public _data: PartnerMemoryPanelData
    public bool_branch: boolean;
    public thread: ThreadData;

    @property(cc.Label)
    public icon: cc.Label;

    getData(): PartnerMemoryPanelData {
        return this._data
    }

    showByData() {
        this.icon.string = this._data.memory
    }

    bindData(currentIndex: number, data: PartnerMemoryPanelData) {
        if (data == null) {
            this.reset(currentIndex);
            return;
        }

        this._data = data;
        this.bool_branch = data.bool_branch
        this.thread = data.thread

        this.showByData()
    }

    reset(currentIndex: number): void {
        //TODO
    }

    select(selected: boolean): void {
        if (!selected) {
            return;
        }

        window.appContext.UIManager.ShowDialog(PrefabUrl.ThreadDialog, ["", this.thread.id, true, this._data.bool_branch])
    }

    getClickButton(): cc.Button {
        return this.node.getComponent(cc.Button);
    }
}