const { ccclass, property } = cc._decorator;

@ccclass
export class EventManager extends cc.Component {

    addListener(type: string, listener: (event) => void, target): void {
        this.node.on(type, listener, target, false);
    }

    removeListener(type: string, listener: (event) => void, target): void {
        this.node.off(type, listener, target);
    }

    triggerEvent(type: string, msg): void {
        this.node.emit(type, msg);
    }
}