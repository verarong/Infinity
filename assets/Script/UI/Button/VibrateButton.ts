const {ccclass, property} = cc._decorator;

@ccclass
export default class VibrateButton extends cc.Component {

    private locked:boolean;
    
    onLoad () {
        this.showUp();
        let self = this;
        self.locked = false;

        self.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            if (self.locked) {
                return;
            }

            let action01 = cc.scaleTo(0.08, 1.08, 1.08).easing(cc.easeCubicActionOut());
            let action02 = cc.scaleTo(0.08, 1.02, 1.02).easing(cc.easeCubicActionOut());
            let action03 = cc.scaleTo(0.08, 1.11, 1.11).easing(cc.easeCubicActionOut());
            let action04 = cc.scaleTo(0.08, 1.04, 1.04).easing(cc.easeCubicActionOut());
            let action05 = cc.scaleTo(0.08, 1.13, 1.13).easing(cc.easeCubicActionOut());
            let action06 = cc.scaleTo(0.08, 1.06, 1.06).easing(cc.easeCubicActionOut());
            let seq1 = cc.sequence(action01, action02, action03, action04, action05, action06);
            self.node.runAction(seq1);
        });

        self.node.on(cc.Node.EventType.TOUCH_CANCEL, function (event) {
            if (self.locked) {
                return;
            }

            let action11 = cc.scaleTo(0.08, 0.94, 0.94).easing(cc.easeCubicActionOut());
            let action12 = cc.scaleTo(0.08, 1.05, 1.05).easing(cc.easeCubicActionOut());
            let action13 = cc.scaleTo(0.08, 0.97, 0.97).easing(cc.easeCubicActionOut());
            let action14 = cc.scaleTo(0.08, 1.03, 1.03).easing(cc.easeCubicActionOut());
            let action15 = cc.scaleTo(0.08, 1, 1).easing(cc.easeCubicActionOut());
            let seq2 = cc.sequence(action11, action12, action13, action14, action15);
            self.node.runAction(seq2);
        });

        self.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            if (self.locked) {
                return;
            }

            let action21 = cc.scaleTo(0.08, 0.94, 0.94).easing(cc.easeCubicActionOut());
            let action22 = cc.scaleTo(0.08, 1.05, 1.05).easing(cc.easeCubicActionOut());
            let action23 = cc.scaleTo(0.08, 0.97, 0.97).easing(cc.easeCubicActionOut());
            let action24 = cc.scaleTo(0.08, 1.03, 1.03).easing(cc.easeCubicActionOut());
            let action25 = cc.scaleTo(0.08, 1, 1).easing(cc.easeCubicActionOut());
            let seq3 = cc.sequence(action21, action22, action23, action24, action25);
            self.node.runAction(seq3);
        });
    }

    private showUp() {
        let action1 = cc.scaleTo(0.3, 1.15, 1.15).easing(cc.easeCubicActionOut());
        let action2 = cc.scaleTo(0.2, 1, 1).easing(cc.easeCubicActionOut());
        let seq = cc.sequence(action1, action2);
        this.node.runAction(seq);
    }

    onDestroy(){
        this.node.stopAllActions();
    }
}
