/**
 * @param {string} sSelector 엘리먼트 ID
 * @param {StoreModel} oStoreModel 상점 모델
 * @constructor
 */
var StoreView = function(sSelector, oStoreModel){
    this.sSelector = sSelector;
    this.oStore = oStoreModel;

    // element assign & event bind
    this.elStoreInfo = document.getElementById(this.sSelector);
    this.tmplStore = document.getElementById('tmpl-store').innerHTML;
    this.elStoreInfo.addEventListener('keyup', this._onKeyupChangeDescription.bind(this));

    this.render();
};

StoreView.prototype = {

    /**
     * 상점 설명 인풋 박스의 keyup 이벤트 리스너
     * @param {KeyboardEvent} oEvent
     * @private
     */
    _onKeyupChangeDescription : function(oEvent){
        if(oEvent.target.tagName.toLowerCase() === 'input'){
            this.oStore.setDescription(oEvent.target.value);
            this.elStoreInfo.querySelector('input').value = this.oStore.sDescription;
        }
    },

    /**
     * 뷰를 렌더링한다.
     */
    render : function(){
        var sTemplate = '';

        if(this.oStore.isClosed()){
            sTemplate = '영업시간이 끝났습니다.';
        }else{
            sTemplate = this.tmplStore
                .replace(/\{\{sImage\}\}/, this.oStore.sImage)
                .replace(/\{\{sName\}\}/, this.oStore.sName)
                .replace(/\{\{sName\}\}/, this.oStore.sName)
                .replace(/\{\{sEndTime\}\}/, this.oStore.getEndTime())
                .replace(/\{\{sDescription\}\}/, this.oStore.sDescription);
        }

        this.elStoreInfo.innerHTML = sTemplate;
    }
};