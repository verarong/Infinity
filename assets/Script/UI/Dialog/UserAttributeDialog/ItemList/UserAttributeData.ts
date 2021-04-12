export class UserAttributeData {
    public attribute: string;
    public attribute_ch: string;
    public amount: number

    constructor(key: string, value: number) {
        this.attribute = key
        this.attribute_ch = window.appContext.ConfigManager.GettransformChnByEng(key)
        this.amount = value
    }
}