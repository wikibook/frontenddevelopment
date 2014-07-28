var LightTable = function(htOptions){
    var sTemplate = htOptions.sTemplate || '/template/lightTable.ejs';
    var sImages = htOptions.aImages || [];

    $('body').append(new EJS({url : sTemplate}))
             .render({images : sImages});
};

