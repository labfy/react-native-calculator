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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_native_1 = require("react-native");
var Calculator_1 = require("./Calculator");
var interface_1 = require("./interface");
var utils_1 = require("./utils");
function propsToState(props) {
    var value = props.value || 0;
    return {
        value: props.value || 0,
        text: utils_1.formatNumber(value, props.decimalSeparator, props.thousandSeparator),
        disabled: props.disabled
    };
}
var CalculatorInput = /** @class */ (function (_super) {
    __extends(CalculatorInput, _super);
    function CalculatorInput(props) {
        var _this = _super.call(this, props) || this;
        _this.calculatorModalToggle = _this.calculatorModalToggle.bind(_this);
        _this.state = __assign(__assign({}, propsToState(props)), { modalVisible: false });
        return _this;
    }
    CalculatorInput.getDerivedStateFromProps = function (props, state) {
        if (props.value !== state.value) {
            return propsToState(props);
        }
        return null;
    };
    CalculatorInput.prototype.render = function () {
        var _this = this;
        return (<react_native_1.View onLayout={function () {
            if (_this.state.modalVisible) {
                _this.forceUpdate();
            }
        }}>
        {this.renderTextField()}
        {!this.state.disabled && this.renderCalulatorModal()}
      </react_native_1.View>);
    };
    CalculatorInput.prototype.renderTextField = function () {
        var _a = this.props, fieldContainerStyle = _a.fieldContainerStyle, fieldTextStyle = _a.fieldTextStyle, fieldDisabledContainerStyle = _a.fieldDisabledContainerStyle, fieldDisabledTextStyle = _a.fieldDisabledTextStyle, prefix = _a.prefix, suffix = _a.suffix;
        var _b = this.state, disabled = _b.disabled, text = _b.text;
        var renderText = function () { return (<react_native_1.Text style={[
            styles.text,
            fieldTextStyle,
            disabled ? fieldDisabledTextStyle : {}
        ]}>
        {prefix + text + suffix}
      </react_native_1.Text>); };
        return (<react_native_1.View style={[
            styles.container,
            fieldContainerStyle,
            disabled ? fieldDisabledContainerStyle : {}
        ]}>
        {disabled ? (<react_native_1.View style={styles.innerContainer}>{renderText()}</react_native_1.View>) : (<react_native_1.TouchableOpacity onPress={this.calculatorModalToggle} style={styles.innerContainer}>
            {renderText()}
          </react_native_1.TouchableOpacity>)}
      </react_native_1.View>);
    };
    CalculatorInput.prototype.renderCalulatorModal = function () {
        var _this = this;
        var _a = this.props, modalAnimationType = _a.modalAnimationType, modalBackdropStyle = _a.modalBackdropStyle, onBeforeChange = _a.onBeforeChange, onBeforeChangeAsync = _a.onBeforeChangeAsync, onChange = _a.onChange;
        var dimension = react_native_1.Dimensions.get('window');
        var height = this.props.height || dimension.height - dimension.height / 3;
        var width = this.props.width || dimension.width;
        // Without this the layout will break on some android devices (e.g. galaxy tab)
        var style = { height: height };
        return (<react_native_1.Modal transparent={true} visible={this.state.modalVisible} onRequestClose={this.calculatorModalToggle} animationType={modalAnimationType}>
        <react_native_1.TouchableWithoutFeedback onPress={this.calculatorModalToggle} style={styles.modalContainer}>
          <react_native_1.View style={[styles.backdrop, modalBackdropStyle]}>
            <Calculator_1.Calculator hasAcceptButton onAccept={function (value, text) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (onBeforeChange) {
                            if (!onBeforeChange(value, text)) {
                                return [2 /*return*/];
                            }
                        }
                        if (!onBeforeChangeAsync) return [3 /*break*/, 2];
                        return [4 /*yield*/, onBeforeChangeAsync(value, text)];
                    case 1:
                        if (!(_a.sent())) {
                            return [2 /*return*/];
                        }
                        _a.label = 2;
                    case 2:
                        this.setState({ value: value, text: text }, function () {
                            if (onChange) {
                                onChange(value, text);
                            }
                            _this.calculatorModalToggle();
                        });
                        return [2 /*return*/];
                }
            });
        }); }} {...this.props} value={this.state.value} height={height} width={width} style={style}/>
          </react_native_1.View>
        </react_native_1.TouchableWithoutFeedback>
      </react_native_1.Modal>);
    };
    CalculatorInput.prototype.calculatorModalToggle = function () {
        var modalVisible = this.state.modalVisible;
        this.setState({ modalVisible: !modalVisible });
    };
    CalculatorInput.defaultProps = __assign(__assign({}, interface_1.DefaultCommonProps), { suffix: '', prefix: '' });
    return CalculatorInput;
}(React.Component));
exports.CalculatorInput = CalculatorInput;
var styles = react_native_1.StyleSheet.create({
    container: {
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        height: 24,
        margin: 10
    },
    innerContainer: {
        width: '100%',
        height: '100%',
        justifyContent: 'center'
    },
    text: {
        fontSize: 16
    },
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    modalContainer: {
        flex: 1
    }
});
//# sourceMappingURL=CalculatorInput.js.map