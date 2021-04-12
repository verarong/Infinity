import LineData from "./LineData";
import { Item } from "../../../../ItemList/Item";
import { Util } from "../../../../Common/Utils/Util";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LineItem extends Item<LineData> {

    private _data: LineData;

    getData(): LineData {
        return this._data;
    }

    bindData(currentIndex: number, data: LineData) {

        if (data == null) {
            this.reset(currentIndex);
            return;
        }

        this._data = data;
        let randomX  = Util.getRndInteger(-3,4);
        this.node.position = new cc.Vec2(randomX,this.node.position.y);

        let randomRotate = Util.getRndInteger(-5,6);
        this.node.angle = -randomRotate;
    }

    reset(currentIndex: number): void {
        
    }

    select(selected: boolean): void {
        if (!selected) {
            return;
        }
    }

    getClickButton(): cc.Button {
        return null
    }
}
