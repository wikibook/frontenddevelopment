system.init(function(){
    ['/build', '/test', '/src'].forEach(function(sDirectory){
        system.mkdir(system.destpath() + sDirectory);
    });
});

