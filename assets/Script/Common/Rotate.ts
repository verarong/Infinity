const {ccclass, property} = cc._decorator;

@ccclass
export class Rotate extends cc.Component {

    @property(cc.Node)
    private target: cc.Node = null;

    @property
    private repeatForever: boolean = false;

    @property
    private anglePerSecond: number = 60;

    onLoad(): void {

        if (this.target == null) {
            return;
        }

        if (this.repeatForever) {

            this.target.runAction(cc.repeatForever(cc.rotateBy(1, 60)));
        } else {

            this.target.runAction(cc.rotateBy(1, 60));
        }
    }
}
