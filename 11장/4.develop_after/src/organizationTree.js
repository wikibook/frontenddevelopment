/**
 * @author    anonymous
 * @version   0.0.1
 * @copyright 2014 Licensed under the MIT license.
 * @global
 * @param {Object} htOptions
 * @param {number} htOptions.sApiUrl 조직 리스트를 요청, 추가, 변경, 삭제할 수 있는 HTTP API 주소
 * @param {string} htOptions.sSelector 조직도 트리 뷰 셀렉터
 * @param {boolean} htOptions.useContextMenu 컨텍스트 메뉴 사용 여부
 * @returns {naver.view.OrganizationTree|naver.view.OrganizationTreeContextMenu}
 * @example
 * var oOrganizationTree = organizationTree({
 *     sApiUrl : '/api/organizations',
 *     sSelector : '.snb_organization',
 *     useContextMenu : true
 * });
 */
var organizationTree = function(htOptions){
    var oOrganizations = new naver.collection.Organizations(htOptions.sApiUrl),
        oOrganizationTree = new naver.view.OrganizationTree(htOptions.sSelector, oOrganizations);

    if(htOptions.useContextMenu){
        oOrganizationTree = new naver.view.OrganizationTreeContextMenu(oOrganizationTree);
    }

    return oOrganizationTree;
};
