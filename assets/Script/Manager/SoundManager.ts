import { Debug } from "../Common/Debug";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SoundManager extends cc.Component {

    @property(cc.AudioSource)
    backgroundAudio: cc.AudioSource = null;

    @property({ type: cc.AudioClip })
    audioClip1: cc.AudioClip = null;

    @property({ type: cc.AudioClip })
    audioClip2: cc.AudioClip = null;

    @property({ type: cc.AudioClip })
    plot_1: cc.AudioClip = null;

    @property({ type: cc.AudioClip })
    plot_2: cc.AudioClip = null;

    @property({ type: cc.AudioClip })
    plot_3: cc.AudioClip = null;

    @property({ type: cc.AudioClip })
    plot_4: cc.AudioClip = null;

    @property({ type: cc.AudioClip })
    plot_5: cc.AudioClip = null;

    @property({ type: cc.AudioClip })
    plot_6: cc.AudioClip = null;

    private _isMusicToStop: boolean = false;
    private _isMusicToStart: boolean = false;
    private _firstTimePlayed: boolean = false;
    private current_clip: Array<number> = new Array();


    public playSFX(path) {
        let self = this
        cc.loader.loadRes("sounds/" + path, function (err, clip) {
            if (self.current_clip) {
                for (let i = 0; i < self.current_clip.length; i++) {
                    let audioID = self.current_clip.pop()
                    cc.audioEngine.stop(audioID);
                }
            }

            Debug.log(clip);

            let volume = window.appContext.StoreManager.getItem("sound") ? 1 : 0
            let audioID = cc.audioEngine.play(clip, false, volume);
            self.current_clip.push(audioID)
        });
    }

    public play_get_gold() {
        this.playSFX("get_gold.ogg");
    }

    public playerBgm1() {
        this.backgroundAudio.stop();
        this.backgroundAudio.clip = this.audioClip1;
        this._firstTimePlayed = false;
        this.startBackgroundMusic();
    }

    public playerBgm2() {
        this.backgroundAudio.stop();
        this.backgroundAudio.clip = this.audioClip2;
        this._firstTimePlayed = false;
        this.startBackgroundMusic();
    }

    public playPlot(map_id: number) {
        this.backgroundAudio.stop();
        if (map_id == 1) {
            this.backgroundAudio.clip = this.plot_1;
        }
        else if (map_id == 2) {
            this.backgroundAudio.clip = this.plot_2;
        }
        else if (map_id == 3) {
            this.backgroundAudio.clip = this.plot_3;
        }
        else if (map_id == 4) {
            this.backgroundAudio.clip = this.plot_4;
        }
        else if (map_id == 5) {
            this.backgroundAudio.clip = this.plot_5;
        }
        else if (map_id == 6) {
            this.backgroundAudio.clip = this.plot_6;
        }
        this._firstTimePlayed = false;
        this.startBackgroundMusic(0.8);
    }

    public startBackgroundMusic(volume: number = 0.4) {
        if (!window.appContext.StoreManager.getItem("music")) {
            volume = 0
        }
        this._isMusicToStop = false;
        this._isMusicToStart = true;
        if (this.backgroundAudio.isPlaying) {
            this.backgroundAudio.volume = 0;
        }
        if (this._firstTimePlayed) {
            this.backgroundAudio.volume = volume;
            this.backgroundAudio.resume();
        }
        else {
            this.backgroundAudio.volume = volume;
            this.backgroundAudio.play();
            this._firstTimePlayed = true;
        }
    }

    public stopBackgroundMusic() {
        this._isMusicToStop = true;
        this._isMusicToStart = false;
    }
}
