/**
 * SINON.js를 이용해 조직도 모듈 HTTP API FakeServer를 만듭니다.
 */
(function(){
    var nLastId = 20,
        oServer = sinon.fakeServer.create(),
        aOrganizationList = [],
        aErrorMessage = [];

    oServer.autoRespond = true;
    //oServer.autoRespondAfter = 1000;

    aOrganizationList = [
        {"id": 0, "name": "회사", "parentId": -1, "depth": 1},
        {"id": 1, "name": "조직미지정", "parentId": -1, "depth": 1},
        {"id": 2, "name": "경영관리부", "parentId": 0, "depth": 2},
        {"id": 3, "name": "기획개발부", "parentId": 0, "depth": 2},
        {"id": 4, "name": "기술연구소", "parentId": 0, "depth": 2},
        {"id": 5, "name": "개발본부", "parentId": 0, "depth": 2},
        {"id": 6, "name": "디자인센터", "parentId": 0, "depth": 2},
        {"id": 7, "name": "마케팅사업부", "parentId": 0, "depth": 2},
        {"id": 8, "name": "서비스부", "parentId": 0, "depth": 2},
        {"id": 9, "name": "모바일개발팀", "parentId": 5, "depth": 3},
        {"id": 10, "name": "웹개발팀", "parentId": 5, "depth": 3},
        {"id": 11, "name": "플랫폼개발팀", "parentId": 5, "depth": 3}
    ];

    aErrorMessage = [
        '조직미지정을 제외한 조직에만 하위 조직을 추가할 수 있습니다.',
        '조직은 깊이 4이하로 추가할 수 있습니다.',
        '최상위 조직을 제외한 조직만 이름을 변경할 수 있습니다.',
        '조직의 이름은 12자 이하로 지정할 수 있습니다.',
        '최상위 조직을 제외한 조직만 삭제할 수 있습니다.'
    ];

    /**
     * @param {number} nId
     * @returns {{}}
     */
    function findOrganization(nId){
        return _.findWhere(aOrganizationList, {id : parseInt(nId, 10)});
    }

    // 조직도 리스트를 반환한다.
    // GET /organizations
    oServer.respondWith('GET', '/api/organizations', [
        200, {'Content-Type': "application/json"},
        JSON.stringify(aOrganizationList)
    ]);

    // 조직을 추가한다.(새로운 하위 조직을 생성한다.)
    // POST /organizations/{:id}
    oServer.respondWith('POST', /\/api\/organizations\/(\d+)/, function(oXhr, nParentId){
        nParentId = parseInt(nParentId, 10);
        nLastId = nLastId + 1;

        var nDepth = findOrganization(nParentId).depth + 1,
            htNew = {id : nLastId, name : '새조직', parentId : nParentId, depth : nDepth};

        if(nParentId === 1){
            oXhr.respond(400, { "Content-Type": "text/plain" }, aErrorMessage[0]);
        }else if(nDepth >= 5){
            oXhr.respond(400, { "Content-Type": "text/plain" }, aErrorMessage[1]);
        }else{
            aOrganizationList.push(htNew);
            oXhr.respond(200, { "Content-Type": "application/json" }, JSON.stringify(htNew));
        }
    });

    // 조직의 이름을 변경한다.
    // PUT /organizations/{:id}?name={:name}
    oServer.respondWith('PUT', /\/api\/organizations\/(\d+)/, function(oXhr, nId){
        var sName = oXhr.url.replace(/\S+\?name=(\S+)/, '$1');

        if(findOrganization(nId).parentId === -1){
            oXhr.respond(400, { "Content-Type": "text/plain" }, aErrorMessage[2]);
        }else if(sName.length > 13){
            oXhr.respond(400, { "Content-Type": "text/plain" }, aErrorMessage[3]);
        }else{
            oXhr.respond(
                200, { "Content-Type": "application/json" },
                JSON.stringify({
                    id : parseInt(nId, 10),
                    name : oXhr.url.replace(/\S+\?name=(\S+)/, '$1'),
                    parentId : '',
                    depth : 0
                })
            );
        }
    });

    // 조직을 삭제한다.
    // DELETE /organizations/{:id}
    oServer.respondWith('DELETE', /\/api\/organizations\/(\d+)/, function(oXhr, nId){
        if(findOrganization(nId).parentId === -1){
            oXhr.respond(400, { "Content-Type": "text/plain" }, aErrorMessage[4]);
        }else{
            oXhr.respond(
                200, { "Content-Type": "application/json" },
                JSON.stringify({
                    id : parseInt(nId, 10)
                })
            );
        }
    });
}());