// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { Item } from "../../../../ItemList/Item";
import { PrefabUrl } from "../../../../Manager/PrefabUrl";
import AvatarDialog from "../AvatarDialog";
import { FrameData } from "./AvatarData";

const { ccclass, property } = cc._decorator;

@ccclass
export class FrameItem extends Item<FrameData> {

    private index: number
    public bool_selected: boolean
    private data_: FrameData

    @property(cc.Node)
    public lock: cc.Node;

    @property(cc.Sprite)
    public frame: cc.Sprite;

    @property(cc.Sprite)
    public selected: cc.Sprite;

    getData(): FrameData {
        return this.data_;
    }

    showByData() {
        window.appContext.Pool.setSpriteFrameByUrl("head_frame_" + this.data_.avatar_id, this.frame);
        this.lock.active = !this.data_.activated
        this.selected.node.active = this.data_.selected
    }

    bindData(currentIndex: number, data: FrameData) {
        if (data == null) {
            this.reset(currentIndex);
            return;
        }
        this.index = currentIndex
        this.data_ = data;

        this.showByData()
    }

    reset(currentIndex: number): void {
        //TODO
    }

    select(selected: boolean): void {
        if (selected) {
            let avatar: AvatarDialog = window.appContext.UIManager.getDialog(PrefabUrl.AvatarDialog)
            avatar.refresh(false, this.data_)
        }
    }

    getClickButton(): cc.Button {
        return this.getComponent(cc.Button);
    }
}