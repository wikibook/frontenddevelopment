/**
 * @param {string} sName 상점 명
 * @param {string} sImage 상점 이미지
 * @param {Date?} dEndTime 영업 종료 시간
 * @constructor
 */
var StoreModel = function(sName, sImage, dEndTime){
    var dDefaultEndTime = new Date();
    dDefaultEndTime.setHours(19, 30);

    this.sName = sName;
    this.sImage = sImage;
    this._dEndTime = dEndTime || dDefaultEndTime;
    this.sDescription = '';
};

StoreModel.prototype = {

    /**
     * 영업 종료 시간을 반환한다.
     * @returns {string}
     */
    getEndTime : function(){
        return this._dEndTime.getHours()+ ':' +this._dEndTime.getMinutes();
    },

    /**
     * 상점 설명을 설정한다. 상점 설명은 10자 이하로
     * 등록 가능하다.
     * @param {string} sDescription
     */
    setDescription : function(sDescription){
        if(sDescription.length > 10){
            sDescription = sDescription.substr(0, 10);
        }

        this.sDescription = sDescription;
    },

    /**
     * 영업이 끝났는지 파악한다.
     * @returns {boolean}
     */
    isClosed : function(){
        return new Date().getTime() > this._dEndTime.getTime();
    }
};