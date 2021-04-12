import { Debug } from "../Common/Debug";
import { Item } from "./Item";

const { ccclass, property } = cc._decorator;

@ccclass
export abstract class ItemList<T> extends cc.Component {

    @property
    refreshTime: number = 0;

    @property(cc.Node)
    contentParent: cc.Node = null;

    _itemList: Item<T>[] = new Array();

    _idleItemCache: Item<T>[] = new Array();

    /// 当前选中的slot。
    _selectedSlot: number = 0;

    _isDestroyItemOnDisable: boolean = false;

    update(dt: number) {
        if (this.refreshTime < this.dataUpdateTime()) {
            this.refreshTime = this.dataUpdateTime();
            this.refreshContent();
        }

        this.onUpdate(dt);
    }

    onDisable(): void {
        if (this._isDestroyItemOnDisable == false) {
            // Debug.log("not destroy item")
            return;
        }
        for (let i = 0; i < this._itemList.length; i++) {
            if (this._itemList[i].node != null) {
                this._itemList[i].node.destroy();
            }
        }
        this._itemList = [];

        for (let i = 0; i < this._idleItemCache.length; i++) {
            if (this._idleItemCache[i].node != null) {
                this._idleItemCache[i].node.destroy();
            }
        }
        this._idleItemCache = [];

        this.refreshTime = 0;
    }

    // /// <summary>
    // /// 手动设置内容刷新时间。
    // /// </summary>
    // /// <param name="time"></param>
    setRefreshTime(time: number): void {
        this.refreshTime = time;
    }

    // /// <summary>
    // /// 刷新列表的内容。
    // /// </summary>
    refreshContent(): void {
        this.beforeRefresh();

        let slotCount = this.slotCount();
        let dataCount = this.dataCount();

        if (slotCount < dataCount) {
            slotCount = dataCount;
        }

        if (this._itemList.length > slotCount) {
            // 删除多余的卡槽。
            for (let i = 0, n = this._itemList.length - slotCount; i < n && this._itemList.length > 0; i++) {
                let item = this._itemList[this._itemList.length - 1];
                this._itemList.splice(this._itemList.length - 1, 1);
                item.reset(0);
                this.setItemIdle(item);
            }
        }

        for (let i = 0; i < slotCount; i++) {
            // 生成Item。
            let item: Item<T> = null;
            if (i < this._itemList.length) {
                item = this._itemList[i];
            }
            else {
                item = this.getMyItem();

                if (item != null) {
                    if (item.node.parent !== this.contentParent) {
                        this.contentParent.addChild(item.node);
                    }
                    this._itemList.push(item);
                }
            }

            // 绑定数据。
            if (i < dataCount) {
                // 有数据的就绑定数据。
                let data: T = this.getData(i);
                if (item != null) {
                    item.bindData(i, data);
                    item.node.setSiblingIndex(i);
                }
            }
            else {
                // 没数据的就Reset成空的状态。
                if (item != null) {
                    item.reset(i);
                }
            }
        }

        // 刷新item数据的选中状态。
        for (let i = 0; i < this._itemList.length; i++) {
            let item: Item<T> = this._itemList[i];

            let selected = i == this._selectedSlot;
            item.select(selected);

            if (selected) {
                this.onItemSelected(item);
            }
        }

        this.afterRefresh();
    }

    getItem(index: number): Item<T> {
        if (index < 0 || index >= this._itemList.length) {
            return null;
        }

        return this._itemList[index];
    }

    getItemCount(): number {
        return this._itemList.length;
    }

    /// <summary>
    /// 获取显示Item的对象。
    /// </summary>
    /// <returns></returns>
    getMyItem(): Item<T> {
        if (this._idleItemCache.length > 0) {
            let item = this._idleItemCache.shift();
            if (item && !item.node.activeInHierarchy) {
                item.node.active = true;
            }

            return item;
        }
        else {
            let item = this.createItem();
            if (item != null) {
                let btn = item.getClickButton();
                if (btn != null) {
                    let self = this;
                    btn.node.on('click', function (event) {
                        self.select(item)
                    });
                }
            }

            return item;
        }
    }

    //     /// <summary>
    // /// item已经无效了。
    // /// </summary>
    /// <param name="item"></param>
    setItemIdle(item: Item<T>): void {
        if (item == null) {
            return
        };

        if (item.node.activeInHierarchy) {
            item.node.active = false;
        }

        this._idleItemCache.push(item);
    }

    select(item: Item<T>): void {
        this._selectedSlot = this._itemList.indexOf(item);
        this.refreshSelectState();
        this.onItemSelected(item);
    }

    selectEmpty(): void {
        this._selectedSlot = -1;
    }

    DestroyItemOnDisable(): void {
        this._isDestroyItemOnDisable = true;
    }

    // /// <summary>
    // /// 设置当前选中的slot，但是不刷新。
    // /// </summary>
    // /// <param name="slot"></param>
    setSelectSlot(slot: number): void {
        if (slot < 0 || slot >= this._itemList.length) {
            return;
        }

        this._selectedSlot = slot;
    }

    // /// <summary>
    // /// 刷新列表的选中状态。
    /// </summary>
    refreshSelectState(): void {
        for (let i = 0; i < this._itemList.length; i++) {
            this._itemList[i].select(i === this._selectedSlot);
        }
    }

    // /// <summary>
    // /// 在刷新内容之前调用。
    /// </summary>
    beforeRefresh(): void {

    }

    // /// <summary>
    // /// 在刷新内容之后调用。
    // /// </summary>
    afterRefresh(): void {

    }

    // /// <summary>
    // /// Update事件。
    // /// </summary>
    onUpdate(dt: number): void {

    }

    // /// <summary>
    // /// 有多少个空位。
    // /// </summary>
    // /// <returns></returns>
    abstract slotCount(): number
    
    // /// <summary>
    // /// 创建Item。
    // /// 这里是CreateItem，而不是GetItemPrefab，返回Item类型！
    // /// </summary>
    // /// <returns></returns>
    abstract createItem(): Item<T>

    /// <summary>
    /// 数据更新的时间。
    /// </summary>
    /// <returns></returns>
    abstract dataUpdateTime(): number 

    /// <summary>
    /// 数据的个数。
    /// </summary>
    /// <returns></returns>
    abstract dataCount(): number
    
    /// <summary>
    /// 获取数据对象。
    /// </summary>
    /// <param name="index"></param>
    /// <returns></returns>
    abstract getData(index: number): T

    /// <summary>
    /// item被选中的事件。
    /// </summary>
    /// <param name="item"></param>
    abstract onItemSelected(item: Item<T>): void
}
