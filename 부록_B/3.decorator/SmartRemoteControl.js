/**
 * @param {RemoteControl} oRemoteControl RemoteControl 구현 객체
 * @extends {ExtendRemoteControl}
 * @constructor
 */
var SmartRemoteControl = function(oRemoteControl){
    // 부모 생성자를 빌려쓴다.
    ExtendRemoteControl.apply(this, [oRemoteControl]);
};

SmartRemoteControl.prototype = _.extend(ExtendRemoteControl.prototype, {
    on : function(){
        return this._oRemoteControl.on();
    },

    off : function(){
        return this._oRemoteControl.off();
    },

    movie : function(){
        return '영화 보기 모드로 전환했습니다.';
    },

    music : function(){
        return '음악 듣기 모드로 전환했습니다.';
    }
});

