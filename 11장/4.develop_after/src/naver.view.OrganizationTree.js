/**
 * @param {string} sSelector
 * @param {naver.collection.Organizations} oCollection
 * @constructor
 */
naver.view.OrganizationTree = function(sSelector, oCollection){
    this._sSelector = sSelector;
    this.oCollection = oCollection;

    this._assignElements();
    this._bindEvents();
    this.render();
};

naver.view.OrganizationTree.prototype = {


    /**
     * 조직도 트리를 렌더링 한다.
     */
    render : function(){
        this._renderRootOrganization();
        this._renderPlainOrganization();
    },

    /**
     * 조직 엘리먼트를 찾아서 반환한다.
     * @param {number} nId
     * @returns {jQuery}
     */
    getElementNodeById : function(nId){
        return this.welTreeSet.find('a[data-organization-id=' + nId + ']');
    },

    /**
     * 하위 리스트 엘리먼트를 찾아서 반환한다.
     * @param {number} nId
     * @returns {jQuery}
     */
    getElementListById : function(nId){
        var welOrganization = this.getElementNodeById(nId),
            welChildrenList = welOrganization.siblings('ul');

        if(this.oCollection.find(nId).isRoot()){
            welChildrenList = welOrganization.parents('h4').siblings('ul');
        }

        return welChildrenList;
    },

    /**
     * 현재 선택된 노드에 새조직을 생성한다.
     * 생성 후 이름을 변경할 수 있도록 에디트 모드로 전환한다.
     */
    createNode : function(){
        var welOrganization = this.welTreeSet.find('a.selected'),
            nId = welOrganization.data('organization-id'),
            welChildrenList = this.getElementListById(nId),
            welButton = welOrganization.siblings('button'),
            oSelf = this;

        this.oCollection.create(nId).done(function(oNewOrganization){
            welChildrenList.append(oSelf._tmplPlainNode({organization: oNewOrganization}));
            welOrganization.addClass('has_child opened_child');
            welChildrenList.addClass('opened');
            welButton.html('폴더 닫기');
            oSelf.renameNode(oNewOrganization.nId);
        }).fail(function(error){
            alert(error.responseText);
        });
    },

    /**
     * ID에 해당 하는 조직의 이름을 변경할 수 있도록 상태를 변경한다.
     * @param {number} nId
     */
    renameNode : function(nId){
        var welOrganization = this.getElementNodeById(nId),
            oOrganization = this.oCollection.find(nId);

        if(!oOrganization.isRoot()){
            welOrganization.addClass('editing');
            welOrganization.find('input').focus();
        }
    },

    /**
     * 조직을 삭제한다.
     * @param {number} nId
     */
    removeNode : function(nId){
        var oOrganization = this.oCollection.find(nId),
            oParent = this.oCollection.find(oOrganization.nParentId),
            welOrganization = this.getElementNodeById(nId),
            welParent = this.getElementNodeById(oParent.nId);

        this.oCollection.remove(nId).done(function(){
            welOrganization.parent('li').remove();

            if(!oParent.hasChildren()){
                welParent.removeClass('has_child opened_child')
                    .siblings('ul').removeClass('opened');
            }
        }).fail(function(oError){
            alert(oError.responseText);
        });
    },

    /**
     * 엘리먼트를 할당한다.
     * @private
     */
    _assignElements : function(){
        this.welOrganizations = $(this._sSelector);
        this.welTitleSet = this.welOrganizations.children('.title_set');
        this.welTreeSet = this.welOrganizations.children('.tree_set');
        this._tmplRootNode = _.template($('#tmpl_root_node')[0].innerHTML);
        this._tmplPlainNode = _.template($('#tmpl_plain_node')[0].innerHTML);
    },

    /**
     * 이벤트를 바인드한다.
     * @private
     */
    _bindEvents : function(){
        this.welTreeSet.on('click', 'a.link', $.proxy(this._onClickSelectOrganization, this));
        this.welTreeSet.on('click', 'a.link', $.proxy(this._onClickOpenCloseOrganization, this));
        this.welTreeSet.on('click', 'input.edit_name', $.proxy(this._onClickInputName, this));
        this.welTreeSet.on('keyup', 'input.edit_name', $.proxy(this._onKeyupInoutName, this));
        this.welTreeSet.on('focusout', 'input.edit_name', $.proxy(this._onFocusoutInputName, this));
        this.welTitleSet.on('click', 'button', $.proxy(this._onClickAddOrganization, this));
    },

    /**
     * 조직 클릭 이벤트 리스너, 선택 모드로 전환한다.
     * @param {MouseEvent} oEvent
     * @private
     */
    _onClickSelectOrganization : function(oEvent){
        var welOrganization = $(oEvent.currentTarget);

        this.welOrganizations.find('a.link').removeClass('selected');
        welOrganization.addClass('selected');
    },

    /**
     * 조직 클릭 이벤트 리스너, 선택 모드로 전환한다.
     * @param {MouseEvent} oEvent
     * @private
     */
    _onClickOpenCloseOrganization : function(oEvent){
        var nId = $(oEvent.currentTarget).data('organization-id'),
            welOrganization = this.getElementNodeById(nId),
            welChildrenList = this.getElementListById(nId),
            welButton = welOrganization.siblings('button');

        if(this.oCollection.find(nId).hasChildren()){
            welOrganization.toggleClass('opened_child');
            welChildrenList.toggleClass('opened');
            welButton.html('폴더 열기');

            if(welOrganization.hasClass('opened_child')){
                welButton.html('폴더 닫기');
            }
        }
    },

    /**
     * 이름 입력 상자 click 이벤트 리스너
     * @param {MouseEvent} oEvent
     * @private
     */
    _onClickInputName : function(oEvent){
        oEvent.stopPropagation();
    },

    /**
     * 이름 입력 상저 keyup 이벤트 리스너
     * @param {KeyboardEvent} oEvent
     * @private
     */
    _onKeyupInoutName : function(oEvent){
        var nEnterKey = 13;

        if(oEvent.keyCode === nEnterKey){
            $(oEvent.currentTarget).blur();
        }
    },

    /**
     * 이름 입력 상자 focusout 이벤트 리스너
     * @param {MouseEvent} oEvent
     * @private
     */
    _onFocusoutInputName : function(oEvent){
        var welInputName = $(oEvent.currentTarget),
            welOrganization = welInputName.parents('a.link'),
            sNewName = welInputName.val(),
            nId = welOrganization.data('organization-id');

        welOrganization.removeClass('editing');

        this.oCollection.rename(nId, sNewName).done(function(){
            welOrganization.find('span.name').html(sNewName);
        }).fail(function(oError){
            alert(oError.responseText);
        });
    },

    /**
     * 조직 추가 버튼 클릭 이벤트 리스너
     * @private
     */
    _onClickAddOrganization : function(){
        this.createNode();
    },

    /**
     * 최상위 조직을 렌더링한다.
     * @private
     */
    _renderRootOrganization : function(){
        this.welTreeSet.append(this._tmplRootNode({
            company : this.oCollection.find(this.oCollection.COMPANY_NODE),
            unspecified : this.oCollection.find(this.oCollection.UNSPECIFIED_NODE)
        }));
    },

    /**
     * 그 외 조직을 렌더링한다.
     * @private
     */
    _renderPlainOrganization : function(){
        var oSelf = this,
            welList = this.welTreeSet.find('ul.list');

        this.oCollection.each(function(oOrganization){
            if (!oOrganization.isRoot()) {
                var welParent = welList.find('a[data-organization-id=' + oOrganization.nParentId + ']'),
                    welOrganization = $(oSelf._tmplPlainNode({organization : oOrganization}));

                if (welParent.length === 0) {
                    welList.append(welOrganization);
                } else {
                    welParent.siblings('ul').append(welOrganization);
                }
            }
        });
    }
};
