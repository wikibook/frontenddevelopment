/**
 * 스핀박스 모델 테스트
 *   1. 모델의 기본 값을 설정할 수 있다.
 *   2. 모델의 값을 설정 할 수 있다.
 *   3. 모델에 값을 문자열과 정수 조합으로 설정하면 문자는 제거되고 정수만 설정 된다.
 *   4. 모델의 값을 1 증가시킬 수 있다.
 *   5. 모델의 값을 1 감소시킬 수 있다.
 *   6. 모델의 값은 300 이하로 설정할 수 있다.
 *   7. 모델의 값은 100 이상으로 설정할 수 있다.
 *   8. 모델의 값은 300 이하로 증가 시킬 수 있다.
 *   9. 모델의 값은 100 이상으로 감소 시킬 수 있다.
 */

QUnit.module('Spinbox Model', {
    setup : function(){
        this._oSpinboxModel = new naver.SpinboxModel(200);
    },

    teardown : function(){
        this._oSpinboxModel = null;
    }
});

QUnit.test('모델의 기본 값을 설정할 수 있다.', function(){
    //given
    //when
    var nDefaultValue = this._oSpinboxModel.getValue();

    //then
    equal(nDefaultValue, 200);
});

QUnit.test('모델의 값을 셋 할 수 있다.', function(){
    //given
    //when
    this._oSpinboxModel.setValue(250);
    var nValue = this._oSpinboxModel.getValue();

    //then
    equal(nValue, 250);
});

QUnit.test('모델에 값을 문자열과 정수 조합으로 설정하면 문자는 제거되고 정수만 설정 된다.', function(){
    //given
    //when
    this._oSpinboxModel.setValue('a1b2c3');
    var nValue = this._oSpinboxModel.getValue();

    //then
    equal(nValue, 123);
});

QUnit.test('모델의 값을 1 증가시킬 수 있다.', function(){
    //given
    //when
    this._oSpinboxModel.increase();
    var nValue = this._oSpinboxModel.getValue();

    //then
    equal(nValue, 201);
});

QUnit.test('모델의 값을 1 감소시킬 수 있다.', function(){
    //given
    //when
    this._oSpinboxModel.decrease();
    var nValue = this._oSpinboxModel.getValue();

    //then
    equal(nValue, 199);
});

QUnit.test('모델의 값은 300 이하로 설정할 수 있다.', function(){
    //given
    //when
    this._oSpinboxModel.setValue(500);
    var nValue = this._oSpinboxModel.getValue();

    //then
    equal(nValue, 300);
});

QUnit.test('모델의 값은 100 이하로 설정할 수 있다.', function(){
    //given
    //when
    this._oSpinboxModel.setValue(-100);
    var nValue = this._oSpinboxModel.getValue();

    //then
    equal(nValue, 100);
});

QUnit.test('모델의 값은 300 이하로 증가 시킬 수 있다.', function(){
    //given
    //when
    this._oSpinboxModel.setValue(300);
    this._oSpinboxModel.increase();
    var nValue = this._oSpinboxModel.getValue();

    //then
    equal(nValue, 300);
});


QUnit.test('모델의 값은 100 이하로 감소 시킬 수 있다.', function(){
    //given
    //when
    this._oSpinboxModel.setValue(100);
    this._oSpinboxModel.decrease();
    var nValue = this._oSpinboxModel.getValue();

    //then
    equal(nValue, 100);
});