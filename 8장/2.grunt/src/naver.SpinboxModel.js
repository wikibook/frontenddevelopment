/**
 * 스핀박스 모델 클래스
 * @param {number} nValue 스핀박스의 기본 값
 * @constructor
 */
naver.SpinboxModel = function(nValue){
    this._nMax = 300;
    this._nMin = 100;
    this._nValue = nValue;
};

naver.SpinboxModel.prototype = {

    /**
     * 스핀박스의 값을 반환한다.
     * @returns {number}
     */
    getValue : function(){
        return this._nValue;
    },

    /**
     * 스핀박스의 값을 설정한다.
     * @param {(number|string)?} nValue 스핀박스에 설정할 값
     */
    setValue : function(nValue){
        if(nValue !== undefined){
            nValue = this._refineValue(nValue);
            nValue = this._checkOverValue(nValue);
            nValue = this._checkUnderValue(nValue);

            this._nValue = nValue;
        }
    },

    /**
     * 스핀박스의 값을 1 증가시킨다.
     */
    increase : function(){
        this._nValue = this._checkOverValue(this._nValue + 1);
    },

    /**
     * 스핀박스의 값을 1 감소시킨다.
     */
    decrease : function(){
        this._nValue = this._checkUnderValue(this._nValue - 1);
    },

    /**
     * 값을 정제하여 반환한다.
     * @param {(number|string)?} nValue 정제할 값
     * @returns {number}
     * @private
     */
    _refineValue : function(nValue){
        nValue = nValue.toString();
        nValue = nValue.match(/(^[\-+])?([0-9])+/g).join('');

        return parseInt(nValue, 10);
    },

    /**
     * 값이 최대치 이상인지 검사하여 반환한다.
     * @param {number} nValue 검사할 값
     * @returns {number}
     * @private
     */
    _checkOverValue : function(nValue) {
        if (nValue > this._nMax) {
            return this._nMax;
        }
        return nValue;
    },

    /**
     * 값이 최소치 이하인지 검사하여 반환한다.
     * @param {number} nValue 검사할 값
     * @returns {number}
     * @private
     */
    _checkUnderValue : function(nValue) {
        if (nValue < this._nMin) {
            return this._nMin;
        }
        return nValue;
    }
};
