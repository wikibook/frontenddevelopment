var Spinbox = function(nValue){
    this._nValue = nValue;
    this._nMax = 300;
    this._nMin = 100;
};

Spinbox.prototype = {

    setValue : function(nValue){
        if (this._nMax < nValue) {
            this._nValue = this._nMax;
            return false;
        }

        if (this._nMin > nValue) {
            this._nValue = this._nMin;
            return false;
        }

        this._nValue = nValue;
        return true;
    }
};







