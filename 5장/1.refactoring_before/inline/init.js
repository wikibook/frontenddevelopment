system.init(function(){
    var aDirectories = ['/build', '/test', '/src'];

    aDirectories.forEach(function(sDirectory){
        system.mkdir(system.destpath() + sDirectory);
    });
});