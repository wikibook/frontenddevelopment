function createUser(sEmail, sName, sImagePath){
    var oUser= new Users(),
        oImages = new Images();

    oImages.create(sImagePath).then(function(nImageId){
        return oUser.create(sEmail, sName, nImageId);
    }).fail(function(oErr){
        console.log(oErr);
    });
}

function createArticle(sContentsText, sImagePath){
    var oArticle = new Article(),
        oImages = new Images();

    oImages.create(sImagePath).then(function(nImageId){
        return oArticle.create(sContentsText, nImageId);
    }).fail(function(oErr){
        console.log(oErr);
    });
}