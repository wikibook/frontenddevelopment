var Spinbox = function(nValue){
    this._nValue = nValue;
    this._nMax = 300;
    this._nMin = 100;
};

Spinbox.prototype = {

    setValue : function(nValue){
        if(this._isOverValue(nValue)){
            this._nValue = this._nMax;
            return false;
        }

        if(this._isUnderValue(nValue)){
            this._nValue = this._nMin;
            return false;
        }

        this._nValue = nValue;
        return true;
    },

    _isOverValue : function(nValue){
        return this._nMax < nValue;
    },

    _isUnderValue : function(nValue){
        return this._nMin > nValue;
    }
};