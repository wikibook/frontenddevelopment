function translate(welTarget, nDist, nVelocity){
    var htTranslate = {};

    nVelocity = nVelocity || 0;

    htTranslate.transform = 'translateX('+ nDist +'px)';
    htTranslate.transition = 'All '+ nVelocity + 'ms ease';

    if(nVelocity === 0){
        htTranslate.transition = '';
    }

    welTarget.css(htTranslate);
}