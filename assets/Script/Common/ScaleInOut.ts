const {ccclass, property} = cc._decorator;

@ccclass
export class ScaleInOut extends cc.Component {

    @property(cc.Node)
    private target: cc.Node = null;

    @property
    private big: number = 1.2;

    @property
    private small: number = 0.9;

    @property
    private duration: number = 0.5;

    @property
    private forever: boolean = false;

    onLoad(): void {

        if (this.target == null) {
            return;
        }

        if (this.forever) {
            this.target.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(this.duration / 2, this.big), cc.scaleTo(this.duration / 2, this.small))));
        } else {
            this.target.runAction(cc.sequence(cc.scaleTo(this.duration / 2, this.big), cc.scaleTo(this.duration / 2, this.small)));
        }
    }
}
