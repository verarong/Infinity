export class Debug{

    static log(content: any): void {
        if (window.appContext.GameConfig.enableLog) {
            console.log(content);
        }
    }

    static warn(content: any): void {
        if (window.appContext.GameConfig.enableLog) {
            console.warn(content);
        }
    }

    static info(content: any): void {
        if (window.appContext.GameConfig.enableLog) {
            console.info(content);
        }
    }

    static error(content: any): void {
        if (window.appContext.GameConfig.enableLog) {
            console.error(content);
        }
    }
}
