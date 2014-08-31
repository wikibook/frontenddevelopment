/**
 * 스핀박스 뷰 클래스
 * @param {naver.SpinboxModel} oSpinboxModel 스핀박스의 모델
 * @constructor
 */
naver.SpinboxView = function(oSpinboxModel){
    this._oSpinboxModel = oSpinboxModel;

    console.log(oSpinboxModel);
    this._assignElements();
    this._bindEvents();
    this._valueRender();
};

naver.SpinboxView.prototype = {

    /**
     * 엘리먼트를 캐쉬한다.
     * @private
     */
    _assignElements : function(){
        this.welSpinboxWrap = $('#spinbox-wrap');
        this.welSpinboxIpt = $('#spinbox');
        this.welIncreaseBtn = this.welSpinboxWrap.find('.increase');
        this.welDecreaseBtn = this.welSpinboxWrap.find('.decrease');
    },

    /**
     * 이벤트를 바인딩한다.
     * @private
     */
    _bindEvents : function(){
        this.welSpinboxIpt.on('blur', $.proxy(this._onBlurSetValue, this));
        this.welIncreaseBtn.on('click', $.proxy(this._onClickIncrease, this));
        this.welDecreaseBtn.on('click', $.proxy(this._onClickDecrease, this));
    },

    /**
     * 인풋박스 blur 이벤트 리스너, 값을 설정한다.
     * @param {MouseEvent} oEvent
     * @private
     */
    _onBlurSetValue : function(oEvent){
        var sValue = this.welSpinboxIpt.val();

        this._oSpinboxModel.setValue(sValue);
        this._valueRender();
    },

    /**
     * 증가 버튼 click 이벤트 리스너, 값을 1 증가시킨다.
     * @param {MouseEvent} oEvent
     * @private
     */
    _onClickIncrease : function(oEvent){
        this._oSpinboxModel.increase();
        this._valueRender();
    },

    /**
     * 감소 버튼 click 이벤트 리스너, 값을 1 감소시킨다.
     * @param {MouseEvent} oEvent
     * @private
     */
    _onClickDecrease : function(oEvent){
        this._oSpinboxModel.decrease();
        this._valueRender();
    },

    /**
     * 모델의 값을 뷰에 렌더링한다.
     * @private
     */
    _valueRender : function(){
        this.welSpinboxIpt.val(this._oSpinboxModel.getValue());
    }
};
