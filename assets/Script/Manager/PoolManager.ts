import { MapData } from "../Common/JsonData/JsonData";
import { Util } from "../Common/Utils/Util";
import { Debug } from "../Common/Debug";

export class PoolManager {

    //存放所有创建的实例
    private pool: Set<cc.Node> = new Set();

    //存放可用的实例
    private currentePool: Map<string, cc.Node[]> = new Map();

    //存放预设和实例之间的关系
    private instantToPrefab: Map<number, cc.Prefab> = new Map();

    //存放url和预设之间的关系
    private urlToPrefab: Map<string, cc.Prefab> = new Map();

    public addUrlToPrefab(url: string, prefab: cc.Prefab) {

        if (url && prefab) {
            this.urlToPrefab.set(url, prefab);
        }
    }

    public requestInstant(prefab: cc.Prefab, args: any = null): cc.Node {

        if (prefab == null) {
            return;
        }

        this.addPrefabPool(prefab);

        var uuid: string = prefab.data.uuid;

        var currentList: Array<cc.Node> = this.currentePool.get(uuid);

        var instant: cc.Node = currentList.pop();

        if (!instant) {

            instant = this.addAndPopInstant(prefab);
        }

        instant.active = true;

        if (args != null && args.length != 0) {
            var uiComponent = instant.getComponent("UIComponent");

            if (uiComponent) {
                uiComponent.loadCompleteCall(args);
            }
        }

        return instant;
    }

    public requestInstantWithArgs(
        prefab: cc.Prefab,
        position: cc.Vec2,
        rotation: number,
        parent: cc.Node): cc.Node {

        if (prefab == null) {
            return;
        }

        this.addPrefabPool(prefab);
        var uuid = prefab.data.uuid;
        var currentList: Array<cc.Node> = this.currentePool.get(uuid);
        var instant = currentList.pop();
        if (!instant) {
            instant = this.addAndPopInstant(prefab);
            instant.active = false;
        }

        instant.angle = -rotation;
        instant.position = position;
        instant.active = true;
        instant.parent = parent;
        return instant;
    }

    public addPrefabPool(prefab: cc.Prefab): void {

        if (prefab == null) {
            Debug.error("addPrefabPool prefab is null");
            return;
        }

        if (prefab.data == null) {
            Debug.error("prefab name:" + prefab.name + "data is null");
        }
        var uuid = prefab.data.uuid;

        if (this.currentePool.has(uuid)) {

            return;
        }

        var currentList = new Array();

        this.currentePool.set(uuid, currentList);
    }

    public addAndPopInstant(prefab: cc.Prefab): cc.Node {

        var instant = cc.instantiate(prefab);

        (instant as any).id = Util.uuid();

        this.pool.add(instant);

        this.instantToPrefab.set((instant as any).id, prefab);

        return instant;
    }

    //删除
    public returnInstant(instant: cc.Node): void {

        if (!instant) {

            return;
        }

        if (!instant.isValid) {
            return;
        }

        instant.active = false;

        instant.removeFromParent();

        var prefab: cc.Prefab = this.instantToPrefab.get((instant as any).id);

        if (!prefab) {
            return;
        }

        if (!prefab.data.uuid) {

            return;
        }

        var currentList = this.currentePool.get(prefab.data.uuid);

        currentList.push(instant);
    }

    public reset() {

        for (var [key, instant] of this.currentePool) {

            if (instant.isValid) {
                instant.destroy();
            }
        }

        this.pool.clear();

        this.currentePool.clear();

        this.instantToPrefab.clear();

        this.urlToPrefab.clear();
    }

    public requestInstantByUrl(url: string, callBack: Function, args: any) {
        if (url == null) {
            callBack("null url", null);
            return;
        }

        if (this.urlToPrefab.has(url)) {
            var prefab: cc.Prefab = this.urlToPrefab.get(url);
            var ins = this.requestInstant(prefab, args);
            callBack(null, ins);
            return;
        }
        let self = this;
        cc.loader.loadRes(url, function (err, prefab) {
            self.addUrlToPrefab(url, prefab);
            var ins = self.requestInstant(prefab, args);
            callBack(err, ins);
        });
    }

    public setSpriteFrameByUrl(iconName: number | string, sprite: cc.Sprite = null, caller: any = null, callback: Function = null) {
        let url = "UI/Icon/" + iconName.toString();
        cc.loader.loadRes(url, cc.SpriteFrame, function (err, spriteFrame: cc.SpriteFrame) {
            if (sprite) {
                sprite.spriteFrame = spriteFrame;
            }

            if (caller && callback) {
                callback.call(caller, spriteFrame);
            }
        });
    }

    public setAtlasByUrl(atlas_id: string, animation: cc.Animation, caller: any = null, callback: Function = null) {
        let url = "clip/" + atlas_id.toString();
        cc.loader.loadRes(url, cc.AnimationClip, function (err, clip: cc.AnimationClip) {
            clip.name = atlas_id;
            clip.wrapMode = cc.WrapMode.Normal;
            animation.addClip(clip);

            if (caller && callback) {
                callback.call(caller);
            }
        });
    }
}
