

const { ccclass, property } = cc._decorator;

@ccclass
export default class AspectRatioTool extends cc.Component {

    private curImage: cc.Sprite;

    @property(Number)
    /** 最大宽*/
    public maxWidth: number = 90;

    @property(Number)
    /** 最大高*/
    public maxHeight: number = 90;

    private widthHeightRatio: number;

    start() {
        this.curImage = this.node.getComponent(cc.Sprite);
        if (this.curImage == null) {
            return;
        }
    }

    /** 进行适配 最大*/
    public DoAdapt() {
        let width = this.node.width;
        let heigth = this.node.height;
        if (width > heigth) {
            this.SetWidth(this.maxWidth);
        }
        else {
            this.SetHeight(this.maxHeight);
        }
    }

    public SetWidth(width: number) {
        this.widthHeightRatio = this.node.width / this.node.height;
        let targetHeight = width / this.widthHeightRatio;
        this.node.width = width;
        this.node.height = targetHeight;
    }

    public SetHeight(height: number) {
        this.widthHeightRatio = this.node.width / this.node.height;
        let targetWidth = this.widthHeightRatio * height;
        this.node.width = targetWidth;
        this.node.height = height;
    }
}
