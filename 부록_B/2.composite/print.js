/**
 * @param {Entry} oEntry
 * @param {number} nDepth
 * @returns {string}
 */
var generating = function(oEntry, nDepth){
    var sHtml = '',
        aChildren = null,
        nCount = 0,
        i = 0;

    nDepth = nDepth || 1;
    sHtml = sHtml + new Array(nDepth).join("-") + oEntry.sName + '<br/>';

    if(oEntry.getChildren() !== null){
        aChildren = oEntry.getChildren();
        nCount = aChildren.length;

        nDepth = nDepth + 3;

        for(i = 0; i < nCount; i++){
            sHtml = sHtml + generating(aChildren[i], nDepth);
        }
    }

    return sHtml;
};