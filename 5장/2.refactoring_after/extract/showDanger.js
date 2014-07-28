var showDanger = function (sElementId, sMassage) {
    sMassage = sMassage || '잘못된 시도입니다.';
    sElementId = sElementId || 'msg-danger';

    var elDanger = document.getElementById(sElementId);
    elDanger.innerHTML = sMassage;
};

