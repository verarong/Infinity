// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { Util } from "../../Common/Utils/Util";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Flashing extends cc.Component {

    @property
    time: number = 0.5;

    private action1: cc.Action;

    private action2: cc.Action;

    onEnable() {
        //   this.startFlashing();
    }

    public startFlashing(scale = 1) {
        this.action1 = this.node.runAction(Util.getBlink(scale));

        let action03 = cc.fadeTo(this.time, 255).easing(cc.easeCubicActionOut());
        let action04 = cc.fadeTo(this.time, 255 * 0.6).easing(cc.easeCubicActionOut());
        let seq2 = cc.sequence(action03, action04).repeatForever();
        this.action2 = this.node.runAction(seq2);
    }

    public stopFlashing() {
        this.node.stopAction(this.action1);
        this.node.stopAction(this.action2);
    }
}
