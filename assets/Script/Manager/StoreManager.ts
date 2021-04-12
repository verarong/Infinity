import { Util } from "../Common/Utils/Util";

export default class StoreManager {
    private userData: any = this.getAll();

    getUID() {
        return "Tap"
    }

    /**
     * 获取用户某个键对应的持久化数据
     * @param key 
     */
    getItem(key: string) {
        if (this.userData.size == 0) {
            this.userData = this.getAll();
        }
        return this.userData[key]
    }

    hasItem(key: string) {
        if (this.userData.size == 0) {
            this.userData = this.getAll();
        }
        return Object.prototype.hasOwnProperty.call(this.userData, key)
    }

    /**
     * 设置用户的持久化数据
     * @param key 
     * @param value 
     */
    setItem(key: string, value: any) {
        this.userData[key] = value;
        let uuid = this.getUID(); //自己定义的用户uuid，作为存储的键，因为玩家可能存在多个账号
        cc.sys.localStorage.setItem(uuid + "", JSON.stringify(this.userData));
    }


    /**
     * 获取本地存储的所有的持久化数据
     */
    getAll() {
        let uuid = this.getUID();
        let reson = cc.sys.localStorage.getItem(uuid + "");
        if (reson) {
            return JSON.parse(reson)
        } else {
            return {}
        }
    }

    /**
     * 移除键对应的持久化数据
     * @param key 
     */
    removeItem(key: string) {
        let reson = this.getAll();
        if (reson) {
            delete reson[key];
            let uuid = this.getUID();
            cc.sys.localStorage.setItem(uuid + '', JSON.stringify(reson));
        }
    }

    /**
     * 移除这个用户所有的本地持久化数据
     * @param key 
     */
    removeAll() {
        let uuid = this.getUID();
        cc.sys.localStorage.removeItem(uuid + '');
    }
}