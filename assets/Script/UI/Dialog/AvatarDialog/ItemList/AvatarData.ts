import { Util } from "../../../../Common/Utils/Util";
import { AvatarData } from "../../../../Common/JsonData/JsonData";

export class FrameData {
    public avatar: AvatarData;
    public avatar_type: string;
    public avatar_id: number;
    public activated: boolean;
    public selected: boolean = false;

    public select() {
        this.selected = true
    }

    constructor(avatar_type: string, avatar_id: number) {
        this.avatar_type = avatar_type
        this.avatar_id = avatar_id
        this.activated = window.appContext.DataContainer.AvatarData.head_frames.indexOf(avatar_id) > -1
        this.avatar = window.appContext.ConfigManager.GetAvatar(avatar_type, avatar_id)
    }
}

export class HeadData {
    public avatar: AvatarData;
    public avatar_type: string;
    public avatar_id: number;
    public activated: boolean;
    public selected: boolean = false;

    public select() {
        this.selected = true
    }

    constructor(avatar_type: string, avatar_id: number) {
        this.avatar_type = avatar_type
        this.avatar_id = avatar_id
        this.activated = window.appContext.DataContainer.AvatarData.heads.indexOf(avatar_id) > -1
        this.avatar = window.appContext.ConfigManager.GetAvatar(avatar_type, avatar_id)
    }
}

export class AnimationData {
    public avatar: AvatarData;
    public avatar_type: string;
    public avatar_id: number;
    public activated: boolean;
    public selected: boolean = false;

    public select() {
        this.selected = true
    }

    constructor(avatar_type: string, avatar_id: number) {
        this.avatar_type = avatar_type
        this.avatar_id = avatar_id
        this.activated = window.appContext.DataContainer.AvatarData.fight_animations.indexOf(avatar_id) > -1
        this.avatar = window.appContext.ConfigManager.GetAvatar(avatar_type, avatar_id)
    }
}