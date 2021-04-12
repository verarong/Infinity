import { GameConfig } from "./GameConfig";
import { EventManager } from "./EventManager";
import { Debug } from "./Debug";
import ConfigManager from "./ConfigManager";
import { PoolManager } from "../Manager/PoolManager";
import { UIManager } from "../Manager/UIManager";
import { SDK } from "../Manager/SDK/SDK";
import WxSDK from "../Manager/SDK/WxSDK";
import LoadingAllRes from "../Loading/LoadingAllRes";
import DataContainer from "../Manager/DataContainer";
import WebApi from "../Manager/WebApi";
import LoginManager from "../Manager/LoginManager";
import SoundManager from "../Manager/SoundManager";
import StoreManager from "../Manager/StoreManager";

const { ccclass, property } = cc._decorator;

declare global {
    interface Window {
        appContext: AppContext;
    }
}

@ccclass
export class AppContext extends cc.Component {

    onLoad() {
        cc.game.addPersistRootNode(this.node);
        window.appContext = this;

        this.configManager = new ConfigManager();
        this.dataContainer = new DataContainer;
        this.webApi = new WebApi();
        this.poolManager = new PoolManager();
        this.loginManager = new LoginManager();
        this.storeManager = new StoreManager();

        if (this.sdk == null) {
            switch (this.config.clientType) {
                //web
                case 0:
                    this.sdk = new SDK();
                    break;
                //wx
                case 1:
                    this.sdk = new WxSDK();
                    break;
            }
        }
    }

    start() {
        this.loadingAllRes.startLoadRes();
    }

    @property(PoolManager)
    private poolManager: PoolManager = null;

    @property(ConfigManager)
    private configManager: ConfigManager = null;

    @property(GameConfig)
    private config: GameConfig = null;

    @property(EventManager)
    private event: EventManager = null;

    @property(UIManager)
    private uiManager: UIManager = null;

    @property(SoundManager)
    private soundManager: SoundManager = null;

    @property(LoadingAllRes)
    private loadingAllRes: LoadingAllRes = null;

    private dataContainer: DataContainer = null;

    private storeManager: StoreManager = null;

    private sdk: SDK = null;

    private webApi: WebApi;

    private loginManager: LoginManager;

    get Pool(): PoolManager {
        return this.poolManager;
    }

    get GameConfig(): GameConfig {
        return this.config;
    }

    get EventManager(): EventManager {
        return this.event;
    }

    get ConfigManager(): ConfigManager {
        return this.configManager;
    }

    get UIManager(): UIManager {
        return this.uiManager;
    }

    get SDK(): SDK {
        return this.sdk;
    }

    get DataContainer(): DataContainer {
        return this.dataContainer;
    }

    get StoreManager(): StoreManager {
        return this.storeManager;
    }

    get WebApi(): WebApi {
        return this.webApi;
    }

    get LoginManager(): LoginManager {
        return this.loginManager;
    }

    get SoundManager(): SoundManager {
        return this.soundManager;
    }
}
