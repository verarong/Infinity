
const { ccclass, property } = cc._decorator;

export enum ClientType{
    Web=0,
    Wechat = 1,
    Other = 2,
}

@ccclass
export class GameConfig extends cc.Component {

    @property
    enableLog: boolean = false;

    @property
    testEnv: boolean = false;

    @property
    clientVersion: string = "V1.0";

    @property
    gameSeverUrl:string = "https://backend.tinigame.xyz:8848/";

    @property
    devFileDownloadRoot: string = 'https://xkdld-dev.oss-cn-hangzhou.aliyuncs.com';

    @property
    releaseFileDownloadRoot: string = 'https:////xkfile.ttigd.cn';

    @property
    clientType:ClientType = ClientType.Web;
    
    onLaod() {

        if (!this.enableLog) {
            console.info = console.log = console.warn = console.time = console.timeEnd = function () { };
        }
        
        if (window.wxDownloader != null) {
            window.wxDownloader.REMOTE_SERVER_ROOT = this.fileDownloadRoot + "/asset/" + this.getClientVersion;
        }
    }

    get getClientVersion(): string{
        return this.clientVersion;
    }

    get fileDownloadRoot(): string{
        if(this.testEnv){
            return this.devFileDownloadRoot;
        }
        else{
            return this.releaseFileDownloadRoot;
        }
    }
}
