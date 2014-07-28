function translate(welTarget, nDist, nSpeed){
    var htTranslate = {};

    nSpeed = nSpeed || 0;

    htTranslate.transform = 'translateX('+ nDist +'px)';
    htTranslate.transition = 'All '+ nSpeed + 'ms ease';

    if(nSpeed === 0){
        htTranslate.transition = '';
    }

    welTarget.css(htTranslate);
}

