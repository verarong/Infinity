
cc.Class({
    extends: cc.Component,
    onLoad() {
        var nodeSize;
        var canvasSize = nodeSize = cc.visibleRect;
        var offsetX = 0;
        var offsetY = 0;
        this.node.setPosition(canvasSize.width * 0.5 + offsetX, canvasSize.height * 0.5 + offsetY);
        this.node.width = nodeSize.width;
        this.node.height = nodeSize.height;
    },

    update() {
        let canvasSize = cc.visibleRect;
        if (this.node.width != canvasSize.width) {
            this.node.width = canvasSize.width;
            this.node.setPosition(canvasSize.width * 0.5, canvasSize.height * 0.5);
        }
        if (this.node.height != canvasSize.height) {
            this.node.height = canvasSize.height;
            this.node.setPosition(canvasSize.width * 0.5, canvasSize.height * 0.5);
        }
    }
});
