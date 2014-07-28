var LightTable = function(htOptions){
    $('body').append(new EJS({url : htOptions.sTemplate || '/template/lightTable.ejs'}))
             .render({images : htOptions.aImages || []});
};