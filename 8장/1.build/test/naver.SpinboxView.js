/**
 * 스핀박스 뷰 테스트
 *   1. 인풋박스의 기본 값을 가져올 수 있다.
 *   2. 인풋박스에 값을 문자열과 정수 조합으로 설정하고 포커스 아웃하면 문자는 제거되고 정수만 설정 된다.
 *   3. 증가 버튼을 클릭하여 값을 1 증가시킬 수 있다.
 *   4. 감소 버튼을 클릭하여 값을 1 감소시킬 수 있다.
 *   6. 인풋박스의 값은 300 이하로 설정할 수 있다.
 *   7. 인풋박스의 값은 100 이상으로 설정할 수 있다.
 *   8. 인풋박스의 값은 300 이하로 증가 시킬 수 있다.
 *   9. 인풋박스의 값은 100 이상으로 감소 시킬 수 있다.
 */

QUnit.module('Spinbox View', {
    setup : function(){
        document.body.innerHTML = __html__['test/naver.SpinboxView.html'];
        this._oSpinboxModel = new naver.SpinboxModel(200);
        this._oSpinboxView = new naver.SpinboxView(this._oSpinboxModel);
    },

    teardown : function(){
        this._oSpinboxModel = null;
        this._oSpinboxView = null;
    }
});

QUnit.test('인풋박스의 기본 값을 설정할 수 있다.', function(){
    //given
    //when
    var nValue = this._oSpinboxView.welSpinboxIpt.val();

    //then
    equal(nValue, 200);
});

QUnit.test('인풋박스에 값을 문자열과 정수 조합으로 설정하고 포커스 아웃하면 문자는 제거되고 정수만 설정 된다.', function(){
    //given
    //when
    this._oSpinboxView.welSpinboxIpt.val('a1b2c3');
    this._oSpinboxView.welSpinboxIpt.trigger('blur');
    var nValue = this._oSpinboxView.welSpinboxIpt.val();

    //then
    equal(nValue, 123);
});

QUnit.test('증가 버튼을 클릭하여 값을 1 증가시킬 수 있다.', function(){
    //given
    //when
    this._oSpinboxView.welIncreaseBtn.trigger('click');
    var nValue = this._oSpinboxView.welSpinboxIpt.val();

    //then
    equal(nValue, 201);
});

QUnit.test('감소 버튼을 클릭하여 값을 1 감소시킬 수 있다.', function(){
    //given
    //when
    this._oSpinboxView.welDecreaseBtn.trigger('click');
    var nValue = this._oSpinboxView.welSpinboxIpt.val();

    //then
    equal(nValue, 199);
});

QUnit.test('인풋박스의 값은 300 이하로 설정할 수 있다.', function(){
    //given
    //when
    this._oSpinboxView.welSpinboxIpt.val(400);
    this._oSpinboxView.welSpinboxIpt.trigger('blur');
    var nValue = this._oSpinboxView.welSpinboxIpt.val();

    //then
    equal(nValue, 300);
});

QUnit.test('인풋박스의 값은 100 이상으로 설정할 수 있다.', function(){
    //given
    //when
    this._oSpinboxView.welSpinboxIpt.val(-100);
    this._oSpinboxView.welSpinboxIpt.trigger('blur');
    var nValue = this._oSpinboxView.welSpinboxIpt.val();

    //then
    equal(nValue, 100);
});

QUnit.test('인풋박스의 값은 300 이하로 증가 시킬 수 있다.', function(){
    //given
    //when
    this._oSpinboxView.welSpinboxIpt.val(300);
    this._oSpinboxView.welSpinboxIpt.trigger('blur');
    this._oSpinboxView.welIncreaseBtn.trigger('click');
    var nValue = this._oSpinboxView.welSpinboxIpt.val();

    //then
    equal(nValue, 300);
});

QUnit.test('인풋박스의 값은 100 이상으로 감소 시킬 수 있다.', function(){
    //given
    //when
    this._oSpinboxView.welSpinboxIpt.val(100);
    this._oSpinboxView.welSpinboxIpt.trigger('blur');
    this._oSpinboxView.welDecreaseBtn.trigger('click');
    var nValue = this._oSpinboxView.welSpinboxIpt.val();

    //then
    equal(nValue, 100);
});