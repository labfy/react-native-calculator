"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_native_1 = require("react-native");
var mathjs_1 = require("mathjs");
var Button_1 = require("./Button");
var Display_1 = require("./Display");
var interface_1 = require("./interface");
var utils_1 = require("./utils");
var ActionEnum;
(function (ActionEnum) {
    ActionEnum[ActionEnum["CLEAR"] = 0] = "CLEAR";
    ActionEnum[ActionEnum["DIVIDE"] = 1] = "DIVIDE";
    ActionEnum[ActionEnum["MULTIPLY"] = 2] = "MULTIPLY";
    ActionEnum[ActionEnum["BACK"] = 3] = "BACK";
    ActionEnum[ActionEnum["MINUS"] = 4] = "MINUS";
    ActionEnum[ActionEnum["PLUS"] = 5] = "PLUS";
    ActionEnum[ActionEnum["ENTER"] = 6] = "ENTER";
})(ActionEnum || (ActionEnum = {}));
var StackKindEnum;
(function (StackKindEnum) {
    StackKindEnum[StackKindEnum["NUMBER"] = 0] = "NUMBER";
    StackKindEnum[StackKindEnum["SIGN"] = 1] = "SIGN";
})(StackKindEnum || (StackKindEnum = {}));
var Calculator = /** @class */ (function (_super) {
    __extends(Calculator, _super);
    function Calculator(props) {
        var _this = _super.call(this, props) || this;
        _this.calculated = false;
        _this.stacks = [];
        _this.calculate = _this.calculate.bind(_this);
        _this.state = {
            text: '',
            done: false
        };
        return _this;
    }
    Calculator.prototype.getButtonSize = function (window) {
        var _a = this.props, keyboardHeight = _a.keyboardHeight, hideDisplay = _a.hideDisplay;
        var _b = this.props, displayHeight = _b.displayHeight, height = _b.height, width = _b.width;
        if (!height) {
            height = window.height - window.y;
        }
        if (!width) {
            width = window.width - window.x;
        }
        width = width / 4;
        var containerHeight = height;
        if (keyboardHeight) {
            height = keyboardHeight / 5;
        }
        else {
            if (displayHeight || hideDisplay) {
                height = (height - (displayHeight || 0)) / 5;
            }
            else {
                height = height / 6;
            }
        }
        if (!displayHeight) {
            displayHeight = hideDisplay
                ? 0
                : keyboardHeight
                    ? containerHeight - keyboardHeight
                    : height;
        }
        return {
            width: width,
            height: height,
            displayHeight: displayHeight
        };
    };
    Calculator.prototype.componentDidMount = function () {
        this.clear(this.props.value);
    };
    Calculator.prototype.render = function () {
        var _this = this;
        var style = this.props.style;
        return (<react_native_1.View style={style} onLayout={function (e) {
            var btnSize = _this.getButtonSize(e.nativeEvent.layout);
            _this.setState({ btnSize: btnSize }, function () {
                if (_this.display) {
                    _this.display.tryNewSize(true);
                }
            });
        }}>
        {this.renderMain()}
      </react_native_1.View>);
    };
    Calculator.prototype.renderMain = function () {
        var _this = this;
        var _a = this.state, text = _a.text, btnSize = _a.btnSize;
        var _b = this.props, decimalSeparator = _b.decimalSeparator, calcButtonBackgroundColor = _b.calcButtonBackgroundColor, calcButtonColor = _b.calcButtonColor, acceptButtonBackgroundColor = _b.acceptButtonBackgroundColor, acceptButtonColor = _b.acceptButtonColor, displayBackgroundColor = _b.displayBackgroundColor, displayColor = _b.displayColor, borderColor = _b.borderColor, fontSize = _b.fontSize, width = _b.width, hasAcceptButton = _b.hasAcceptButton, hideDisplay = _b.hideDisplay, displayTextAlign = _b.displayTextAlign, noDecimal = _b.noDecimal;
        var done = this.state.done && hasAcceptButton;
        if (!btnSize) {
            return null;
        }
        return (<react_native_1.View>
        {!hideDisplay && (<react_native_1.View style={[
            Styles.displayContainer,
            {
                backgroundColor: displayBackgroundColor,
                borderColor: borderColor,
                width: width,
                height: btnSize.displayHeight
            }
        ]}>
            <Display_1.Display height={btnSize.displayHeight} width={btnSize.width * 4 - 20} value={text} ref={function (e) {
            _this.display = e;
        }} style={{ color: displayColor, textAlign: displayTextAlign }}/>
          </react_native_1.View>)}
        <react_native_1.View style={[
            Styles.row,
            hideDisplay
                ? { borderTopWidth: 1, borderTopColor: borderColor }
                : undefined
        ]}>
          {this.renderActionButton(btnSize, 'C', ActionEnum.CLEAR, true)}
          {this.renderActionButton(btnSize, '/', ActionEnum.DIVIDE)}
          {this.renderActionButton(btnSize, '*', ActionEnum.MULTIPLY)}
          {this.renderActionButton(btnSize, '❮', ActionEnum.BACK)}
        </react_native_1.View>
        <react_native_1.View style={Styles.row}>
          {this.renderNumberButton(btnSize, '7', true)}
          {this.renderNumberButton(btnSize, '8')}
          {this.renderNumberButton(btnSize, '9')}
          {this.renderActionButton(btnSize, '-', ActionEnum.MINUS)}
        </react_native_1.View>
        <react_native_1.View style={Styles.row}>
          {this.renderNumberButton(btnSize, '4', true)}
          {this.renderNumberButton(btnSize, '5')}
          {this.renderNumberButton(btnSize, '6')}
          {this.renderActionButton(btnSize, '+', ActionEnum.PLUS)}
        </react_native_1.View>
        <react_native_1.View style={Styles.row}>
          <react_native_1.View style={{}}>
            <react_native_1.View style={Styles.row}>
              {this.renderNumberButton(btnSize, '1', true)}
              {this.renderNumberButton(btnSize, '2')}
              {this.renderNumberButton(btnSize, '3')}
            </react_native_1.View>
            {noDecimal ? (<react_native_1.View style={Styles.row}>
                {this.renderNumberButton(btnSize, '0', true)}
                {this.renderNumberButton(btnSize, '000', false, 2)}
              </react_native_1.View>) : (<react_native_1.View style={Styles.row}>
                {this.renderNumberButton(btnSize, '0', true)}
                {this.renderNumberButton(btnSize, '000')}
                {!noDecimal &&
            this.renderNumberButton(btnSize, decimalSeparator)}
              </react_native_1.View>)}
          </react_native_1.View>
          <Button_1.Button style={[
            Styles.square,
            {
                borderColor: borderColor,
                height: btnSize.height * 2,
                backgroundColor: done
                    ? acceptButtonBackgroundColor
                    : calcButtonBackgroundColor,
                width: btnSize.width
            }
        ]} textStyle={{
            color: done ? acceptButtonColor : calcButtonColor,
            fontSize: fontSize * 2
        }} text={done ? '↲' : '='} onPress={this.calculate}/>
        </react_native_1.View>
      </react_native_1.View>);
    };
    Calculator.prototype.renderNumberButton = function (btnSize, value, mostLeft, scaleX) {
        var _this = this;
        if (mostLeft === void 0) { mostLeft = false; }
        if (scaleX === void 0) { scaleX = 1; }
        var _a = this.props, decimalSeparator = _a.decimalSeparator, numericButtonBackgroundColor = _a.numericButtonBackgroundColor, numericButtonColor = _a.numericButtonColor, borderColor = _a.borderColor, fontSize = _a.fontSize;
        return (<Button_1.Button style={[
            Styles.square,
            {
                borderColor: borderColor,
                backgroundColor: numericButtonBackgroundColor,
                borderLeftWidth: mostLeft ? 1 : 0,
                width: btnSize.width * scaleX,
                height: btnSize.height
            }
        ]} textStyle={{ color: numericButtonColor, fontSize: fontSize }} text={value} onPress={function () {
            // Value filter
            var value_holder = value;
            if (value_holder === ',') {
                if (!!(/\d+(\,+)\d*$/.exec(_this.state.text)))
                    return;
                else if (!!(/[^\d]$/.exec(_this.state.text)))
                    value_holder = '0,';
            }
            var textval = (_this.state.text + value_holder).replace(/\./g, '').replace(/,/g, '.');
            var totalval = mathjs_1.evaluate(textval);
            if (totalval > 99999999.99 || totalval < -99999999.99 || totalval === Infinity)
                return;
            if (_this.calculated) {
                // clear answer replace with entered number
                _this.calculated = false;
                _this.stacks = [
                    {
                        kind: StackKindEnum.NUMBER,
                        value: '',
                        text: '',
                        trailing: ''
                    }
                ];
            }
            var stack = _this.stacks[_this.stacks.length - 1];
            // add new stack if current tag is a sign
            if (stack.kind === StackKindEnum.SIGN) {
                stack = {
                    kind: StackKindEnum.NUMBER,
                    value: '',
                    text: '',
                    trailing: ''
                };
                _this.stacks.push(stack);
            }
            // evaluating decimal separator
            if (value === decimalSeparator) {
                if (!stack.value && !stack.text) {
                    stack.text = '0';
                    stack.value = '0';
                }
                if (stack.value.indexOf(decimalSeparator) > -1 ||
                    stack.value === 'Infinity' ||
                    stack.value === '-Infinity') {
                    return;
                }
                stack.trailing = decimalSeparator;
            }
            else if (value === '0' || value === '000') {
                if (stack.value.indexOf(decimalSeparator) > -1 ||
                    stack.trailing !== '') {
                    stack.trailing = stack.trailing + value;
                    value = '';
                }
            }
            else {
                if (stack.trailing) {
                    value = stack.trailing + value;
                    stack.trailing = '';
                }
            }
            // get editing value
            var val = parseFloat((stack.value + value).replace(decimalSeparator, '.'));
            // modify current stack
            stack.value = val.toString();
            stack.text = _this.format(val);
            _this.setText();
        }}/>);
    };
    Calculator.prototype.renderActionButton = function (btnSize, value, action, mostLeft) {
        var _this = this;
        if (mostLeft === void 0) { mostLeft = false; }
        var _a = this.props, actionButtonBackgroundColor = _a.actionButtonBackgroundColor, actionButtonColor = _a.actionButtonColor, borderColor = _a.borderColor, fontSize = _a.fontSize;
        return (<Button_1.Button style={[
            Styles.square,
            {
                borderColor: borderColor,
                backgroundColor: actionButtonBackgroundColor,
                borderLeftWidth: mostLeft ? 1 : 0,
                width: btnSize.width,
                height: btnSize.height
            }
        ]} textStyle={{ color: actionButtonColor, fontSize: fontSize }} text={value} onPress={function () {
            if (_this.calculated) {
                // continue to use this answer
                _this.calculated = false;
            }
            // tslint:disable-next-line:switch-default
            switch (action) {
                case ActionEnum.CLEAR:
                    _this.clear();
                    break;
                case ActionEnum.PLUS:
                    _this.setSign('+');
                    break;
                case ActionEnum.MINUS:
                    _this.setSign('-');
                    break;
                case ActionEnum.MULTIPLY:
                    _this.setSign('*');
                    break;
                case ActionEnum.DIVIDE:
                    _this.setSign('/');
                    break;
                case ActionEnum.BACK:
                    if (!_this.stacks.length) {
                        _this.clear();
                    }
                    else {
                        var stack = _this.stacks[_this.stacks.length - 1];
                        if (stack.kind === StackKindEnum.SIGN) {
                            _this.popStack();
                        }
                        else {
                            var value_1 = stack.value, trailing = stack.trailing;
                            var decimalSeparator = _this.props.decimalSeparator;
                            if (!value_1 ||
                                (value_1.length === 2 && value_1.startsWith('-')) ||
                                value_1 === '-' ||
                                value_1 === 'Infinity' ||
                                value_1 === '-Infinity') {
                                _this.clear();
                                return;
                            }
                            if (value_1 === '0' && !trailing) {
                                return;
                            }
                            if (trailing !== '') {
                                stack.trailing = trailing.slice(0, trailing.length - 1);
                            }
                            else {
                                if (value_1.length <= 1) {
                                    _this.popStack();
                                }
                                else {
                                    value_1 = value_1.slice(0, value_1.length - 1);
                                    while (value_1.slice(-1) === '0') {
                                        value_1 = value_1.slice(0, value_1.length - 1);
                                        trailing = trailing + '0';
                                    }
                                    // keep decimal separator displayed
                                    var sep = '';
                                    if (value_1[value_1.length - 1] === '.') {
                                        sep = _this.props.decimalSeparator;
                                    }
                                    else {
                                        // skip trailing when no decimal separator found
                                        value_1 += trailing;
                                        trailing = '';
                                    }
                                    // get editing value
                                    var val = parseFloat(value_1.replace(decimalSeparator, '.'));
                                    stack.value = val.toString();
                                    stack.text = _this.format(val);
                                    stack.trailing = sep + trailing;
                                }
                            }
                        }
                    }
                    _this.setText();
                    break;
            }
        }}/>);
    };
    Calculator.prototype.calculate = function () {
        var _this = this;
        var _a = this.props, onCalc = _a.onCalc, onAccept = _a.onAccept, hasAcceptButton = _a.hasAcceptButton, _b = _a.roundTo, roundTo = _b === void 0 ? 2 : _b;
        if (!this.stacks.length) {
            this.clear();
            return;
        }
        var stack = this.stacks[this.stacks.length - 1];
        if (stack.kind === StackKindEnum.SIGN) {
            this.popStack();
        }
        else if (this.stacks.length === 1 && stack.value === '-') {
            this.clear();
            return;
        }
        // tslint:disable-next-line:no-eval
        var num = eval(this.stacks.map(function (x) { return x.value; }).join('') || '0');
        var value = Math.round(num * Math.pow(10, roundTo)) / Math.pow(10, roundTo);
        var text = this.format(value);
        this.stacks = [
            {
                kind: StackKindEnum.NUMBER,
                value: value.toString(),
                text: text,
                trailing: ''
            }
        ];
        this.setText(true, function () {
            if (onCalc) {
                onCalc(value, text);
            }
            if (hasAcceptButton && onAccept && _this.state.done) {
                onAccept(value, text);
            }
            _this.calculated = true;
        });
    };
    Calculator.prototype.popStack = function () {
        this.stacks.pop();
        if (!this.stacks.length) {
            this.clear();
        }
    };
    Calculator.prototype.clear = function (value) {
        if (value === void 0) { value = 0; }
        this.stacks = [
            {
                kind: StackKindEnum.NUMBER,
                value: value.toString(),
                text: this.format(value),
                trailing: ''
            }
        ];
        this.setText();
    };
    Calculator.prototype.setSign = function (sign) {
        var stack = this.stacks[this.stacks.length - 1];
        if (stack.kind === StackKindEnum.SIGN) {
            // only '-' sign allowed for first input
            if (this.stacks.length <= 1 && sign !== '-') {
                return;
            }
            stack.text = sign;
            stack.value = sign;
        }
        else {
            if (!stack.value ||
                stack.value === 'Infinity' ||
                stack.value === '-Infinity') {
                return;
            }
            if (sign === '-' && this.stacks.length === 1 && stack.value === '0') {
                stack.kind = StackKindEnum.SIGN;
                stack.text = sign;
                stack.value = sign;
            }
            else {
                this.stacks.push({
                    kind: StackKindEnum.SIGN,
                    text: sign,
                    value: sign,
                    trailing: ''
                });
            }
        }
        this.setText();
    };
    Calculator.prototype.setText = function (done, callback) {
        var _this = this;
        if (done === void 0) { done = false; }
        var text = this.stacks.map(function (s) { return s.text + (s.trailing || ''); }).join(' ');
        if (!done) {
            done = this.stacks.length === 1;
        }
        this.setState({ text: text, done: done }, function () {
            var onTextChange = _this.props.onTextChange;
            if (onTextChange) {
                onTextChange(text);
            }
            if (callback) {
                callback();
            }
        });
    };
    Calculator.prototype.format = function (num) {
        var _a = this.props, decimalSeparator = _a.decimalSeparator, thousandSeparator = _a.thousandSeparator;
        return utils_1.formatNumber(num, decimalSeparator, thousandSeparator);
    };
    Calculator.defaultProps = interface_1.DefaultCommonProps;
    return Calculator;
}(React.Component));
exports.Calculator = Calculator;
var Styles = react_native_1.StyleSheet.create({
    displayContainer: {
        borderStyle: 'solid',
        borderWidth: 1,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 0,
        paddingTop: 0,
        margin: 0
    },
    row: {
        flexDirection: 'row',
        alignContent: 'stretch',
        flexWrap: 'wrap'
    },
    square: {
        borderStyle: 'solid',
        borderRightWidth: 1,
        borderBottomWidth: 1
    }
});
//# sourceMappingURL=Calculator.js.map