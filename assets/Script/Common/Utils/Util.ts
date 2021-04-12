import { Debug } from "../Debug";

export class Util {

    //删除数组中某个元素
    public static removeArrayByValue(value, array) {
        var index = array.indexOf(value);
        if (index > -1) {
            array.splice(index, 1);
        }

    }

    //获得随机数，[min,max)
    public static getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    //洗牌算法 从[min,max]区间随机出 targetCount个不相同的数
    public static shuffleArithmetic(targetCount: number, min: number, max: number): Array<number> {
        let legal_nums: Array<number> = new Array<number>();
        for (let i = min; i <= max; i++) {
            legal_nums.push(i)
        }

        for (let score = 0; score < targetCount; score++) {
            let idx = Util.getRndInteger(score, legal_nums.length);
            let temp = legal_nums[idx];
            legal_nums[idx] = legal_nums[score];
            legal_nums[score] = temp;
        }
        return legal_nums.slice(0, targetCount);
    }

    //洗牌算法 从给定数组随机出 targetCount个不相同的数
    public static shuffleArithmeticByArray(targetCount: number, legal_nums: Array<number>): Array<number> {
        if (targetCount > legal_nums.length) {
            Debug.error("给定数组长度小于输出数量");
            return null;
        }
        for (let score = 0; score < targetCount; score++) {
            let idx = Util.getRndInteger(score, legal_nums.length);
            let temp = legal_nums[idx];
            legal_nums[idx] = legal_nums[score];
            legal_nums[score] = temp;
        }
        return legal_nums.slice(0, targetCount);
    }

    public static getShowNumber(number: number): string {

        let show = "";

        if (number < 1000) {
            return show + number;
        }

        if (number < 1000000) {
            return show + Math.floor(number / 1000) + "," + ('00' + number % 1000).slice(-3);
        }

        number = Math.floor(number / 1000);

        if (number < 1000) {
            return show + number + "K";
        }

        if (number < 1000000) {
            return show + Math.floor(number / 1000) + "," + ('00' + number % 1000).slice(-3) + "K";
        }

        number = Math.floor(number / 1000);

        if (number < 1000) {
            return show + number + "M";
        }

        if (number < 1000000) {
            return show + Math.floor(number / 1000) + "," + ('00' + number % 1000).slice(-3) + "M";
        }

        number = Math.floor(number / 1000);

        if (number < 1000) {
            return show + number + "G";
        }


        if (number < 1000000) {
            return show + Math.floor(number / 1000) + "," + ('00' + number % 1000).slice(-3) + "G";
        }

        number = Math.floor(number / 1000);

        if (number < 1000) {
            return show + number + "a";
        }


        if (number < 1000000) {
            return show + Math.floor(number / 1000) + "," + ('00' + number % 1000).slice(-3) + "a";
        }

        number = Math.floor(number / 1000);

        if (number < 1000) {
            return show + number + "b";
        }


        if (number < 1000000) {
            return show + Math.floor(number / 1000) + "," + ('00' + number % 1000).slice(-3) + "b";
        }
    }

    public static uuid(): string {

        let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');

        let uuid = [], i;

        let radix = 16 || chars.length;

        for (i = 0; i < 32; i++) uuid[i] = chars[0 | Math.random() * radix];

        return uuid.join('');
    }

    public static getRankById(id: number) {
        let rank = ["", "黄", "玄", "地", "天", "荒", "洪", "宙", "宇", "寰"]
        return rank[id]
    }

    public static getColorById(id: number) {
        let rank = ["", "白", "绿", "蓝", "金", "紫", "红"]
        return rank[id]
    }

    public static get_attributes(data: any, transform: boolean = true): Map<string, number> {
        let legal = window.appContext.ConfigManager.GetLegalAttribute()
        let attribute: Map<string, number> = new Map();
        for (let attr of legal) {
            if (data[attr]) {
                attribute.set(attr, data[attr])
            }
        }
        if (transform) {
            let attribute_transform: Map<string, number> = new Map();
            for (let [k, v] of attribute) {
                attribute_transform.set(window.appContext.ConfigManager.GettransformChnByEng(k), v)
            }
            return attribute_transform
        }
        return attribute
    }

    public static join(char: string, data: Array<number | string>): string {
        let char_ = ""
        let score = ""
        for (let x of data) {
            score += char_;
            score += x.toString();
            char_ = char
        }
        return score
    }

    //计算两点间的距离并返回
    public static getDistance(pos1: cc.Vec2, pos2: cc.Vec2): number {
        return Math.sqrt(Math.pow(pos1.x - pos2.x, 2) +
            Math.pow(pos1.y - pos2.y, 2));
    }

    //计算角度并返回
    public static angle(point: cc.Vec2, pos: cc.Vec2): number {
        return Math.atan2(point.y - pos.y, point.x - pos.x) * (180 / Math.PI);
    }

    /* 计算向量与Y的弧度 */
    public static angleToY(a) {

        var cosB = a.y;

        var angle = Math.acos(cosB);

        return angle * (a.x < 0 ? 1 : -1);
    }

    //弧度转角度
    public static getAngle(radian) {
        return (radian * 180) / Math.PI;
    }

    //从p1指向p2的向量
    public static getVectorByTwoPoint(p1: cc.Vec2, p2: cc.Vec2): cc.Vec2 {
        return new cc.Vec2(p2.x - p1.x, p2.y - p1.y);
    }

    //求向量的单位向量
    public static normalizeVec(vec: cc.Vec2) {

        var magSqr = vec.x * vec.x + vec.y * vec.y;
        if (magSqr === 1.0) {
            return vec;
        }

        if (magSqr === 0.0) {
            return vec;
        }

        var invsqrt = 1.0 / Math.sqrt(magSqr);
        vec.x *= invsqrt;
        vec.y *= invsqrt;

        return vec;

    }

    public static FormatInt(amount: number): string {
        if (amount > 100000000) {
            return Math.floor(amount / 100000000) + "亿"
        }
        if (amount > 10000) {
            return Math.floor(amount / 10000) + "万"
        }
        return amount.toString()
    }

    public static FormatCountDown(rest: number, split = ":"): string {
        rest = rest >= 0 ? rest : 0
        let hour: number = Math.floor(rest / 3600)
        let minute = Math.floor((rest - hour * 3600) / 60)
        let second = rest - hour * 3600 - minute * 60
        let hour_: string = hour.toString()
        let minute_: string = minute.toString()
        let second_: string = second.toString()
        if (hour_.length < 2) {
            hour_ = "0" + hour_
        }
        if (minute_.length < 2) {
            minute_ = "0" + minute_
        }
        if (second_.length < 2) {
            second_ = "0" + second_
        }
        return hour_ + split + minute_ + split + second_
    }

    public static ToastByCode(code: number, error: boolean = false) {
        if (code) {
            let codeData = window.appContext.ConfigManager.GetCodeDataById(code)
            window.appContext.UIManager.ShowToast(codeData.code, error)
        }
        else {
            Debug.log(code);
        }
    }

    public static ButtonColor(type: string) {
        if (type == "common") {
            return cc.color(90, 18, 22)
        }
        else if (type == "shortage") {
            return cc.color(222, 28, 49)
        }
        else if (type == "highlight") {
            return cc.color(255, 229, 120)
        }
    }

    public static GetEquipmentBasicAttribute(equipment_id: number, strengthen_level = 0) {
        let equipment = window.appContext.ConfigManager.GetequipmentById(equipment_id)

        let attributes: Map<string, number> = Util.get_attributes(equipment)
        let attr_array: Array<string> = new Array()
        for (let [k, v] of attributes) {
            let describe = k + " + " + v
            if (strengthen_level > 0) {
                let strengthen_data = window.appContext.ConfigManager.GetStrengthen(strengthen_level)
                describe += "  (强化+" + Math.floor(v * strengthen_data.ratio_expand + strengthen_data.base_expand) + ")"
            }
            attr_array.push(describe)
        }

        return Util.join("\n", attr_array)
    }

    public static ParseParams(params: any, strengthen_level = 0) {
        if (params) {
            let parse_array: Array<string> = new Array()
            for (let line of params) {
                for (let attribute in line) {
                    let attribute_ = window.appContext.ConfigManager.GettransformChnByEng(attribute)
                    let describe = attribute_ + " + " + line[attribute]
                    if (strengthen_level > 0) {
                        let strengthen_data = window.appContext.ConfigManager.GetStrengthen(strengthen_level)
                        describe += "(+" + Math.floor(line[attribute] * strengthen_data.ratio_expand + strengthen_data.base_expand) + ")"
                    }
                    parse_array.push(describe)
                }
            }
            return Util.join("\n", parse_array)
        }
        else {
            return ""
        }
    }

    public static changeToCN(num: number): string {
        let words = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖", "拾"];
        let adds = ["", '拾', '佰', '仟', '万', '亿', '拾', '佰', '仟'];
        if (words[num]) {
            return words[num];
        }
        else if (num > 10 && num < 20) {
            let numStr = num.toString();
            let n = numStr.substring(1, 2);
            let result = adds[1] + words[n];
            return result;
        }
        else if (num > 10) {
            let result = "";
            let numStr = num.toString();
            for (var i = 0; i < numStr.length; ++i) {
                let n = numStr.substring(i, i + 1);
                let m = numStr.length - i - 1;
                result += words[n] + adds[m];
            }
            return result;
        }
        else return "零";
    }

    public static getBlink(scale = 1) {
        let action1 = cc.scaleTo(1, 1.1 * scale, 1.1 * scale);
        let action2 = cc.scaleTo(1, 0.9 * scale, 0.9 * scale);
        let seq = cc.sequence(action1, action2)
        return seq.repeatForever()
    }

    //check_requirement
    public static CheckRequirement(type: number | string, level: number) {
        let current = window.appContext.DataContainer.RoleData[type.toString()]
        return current >= level
    }

    //check_resource
    public static CheckResource(resource: string, amount: number) {
        let current = window.appContext.DataContainer.RoleData[resource]
        return current >= amount
    }

    //check_item
    public static CheckItem(item_id: number, amount: number) {
        let current: number
        if (window.appContext.DataContainer.ItemAmount.has(item_id)) {
            current = window.appContext.DataContainer.ItemAmount.get(item_id)
        }
        else {
            current = 0
        }
        return current >= amount
    }

    //check_skill
    public static CheckSkill(skill_id: number, level: number) {
        return window.appContext.DataContainer.SkillLevel.has(skill_id) && (window.appContext.DataContainer.SkillLevel.get(skill_id) >= level)
    }
}
