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
var FACTOR = 0.5;
var Display = /** @class */ (function (_super) {
    __extends(Display, _super);
    function Display(props) {
        var _this = _super.call(this, props) || this;
        _this._mounted = false;
        _this.tryNewSize = _this.tryNewSize.bind(_this);
        _this.state = {
            size: props.height - FACTOR,
            fixSize: props.height - FACTOR,
            fixValue: props.value,
            complete: false,
            ready: false,
            fontHeight: FACTOR
        };
        return _this;
    }
    Display.prototype.tryNewSize = function (force) {
        var _this = this;
        if (!this._mounted || react_native_1.Platform.OS === 'ios') {
            return;
        }
        if (force) {
            this.setState({ complete: false, ready: false });
        }
        react_native_1.NativeModules.UIManager.measureLayoutRelativeToParent(react_native_1.findNodeHandle(this._text), function () {
            throw new Error('error');
        }, function (_x, _y, w, h) {
            _this.isSizeOk(w, h);
        });
    };
    Display.prototype.isSizeOk = function (w, h) {
        if (!this._mounted) {
            return;
        }
        var complete = this.state.complete;
        var size = this.state.size;
        var _a = this.props, height = _a.height, width = _a.width, value = _a.value;
        if (h > height || w > width) {
            if (size === FACTOR) {
                this.setState({ complete: true });
            }
            else {
                this.setState({ size: (size -= FACTOR), complete: true });
                this.tryNewSize();
            }
        }
        else {
            if (!complete) {
                this.setState({ size: (size += FACTOR) });
                this.tryNewSize();
            }
            else {
                this.setState({
                    ready: true,
                    fixSize: size,
                    fixValue: value,
                    fontHeight: h
                });
            }
        }
    };
    Display.prototype.componentDidMount = function () {
        this._mounted = true;
        this.tryNewSize();
    };
    Display.prototype.componentWillUnmount = function () {
        this._mounted = false;
    };
    Display.prototype.componentDidUpdate = function (newProps) {
        if (react_native_1.Platform.OS === 'ios') {
            return;
        }
        if (this.props.value !== newProps.value) {
            this.setState({ complete: false }, this.tryNewSize);
        }
    };
    Display.prototype.render = function () {
        return react_native_1.Platform.OS === 'ios' ? this.renderIOS() : this.renderAndroid();
    };
    Display.prototype.renderIOS = function () {
        var _a = this.props, height = _a.height, style = _a.style, value = _a.value;
        return (<react_native_1.View>
        <react_native_1.Text adjustsFontSizeToFit={true} numberOfLines={1} style={[
            styles.displayText,
            style,
            {
                fontSize: height,
                height: height,
                lineHeight: height,
                // @ts-ignore
                color: style.color
            }
        ]}>
          {value}
        </react_native_1.Text>
      </react_native_1.View>);
    };
    Display.prototype.renderAndroid = function () {
        var _this = this;
        var _a = this.state, size = _a.size, fixSize = _a.fixSize, fixValue = _a.fixValue, fontHeight = _a.fontHeight, ready = _a.ready;
        var _b = this.props, value = _b.value, height = _b.height, style = _b.style;
        return (<react_native_1.View>
        <react_native_1.Text ref={function (component) { return (_this._text = component); }} style={[styles.hiddenText, { fontSize: size }]}>
          {value}
        </react_native_1.Text>
        <react_native_1.Text style={[
            // ready ? styles.displayText : styles.hiddenText,
            styles.displayText,
            style,
            {
                fontSize: fixSize,
                height: height,
                top: (height - fontHeight) / 2,
                // @ts-ignore
                color: ready ? style.color : 'transparent'
            }
        ]}>
          {fixValue}
        </react_native_1.Text>
      </react_native_1.View>);
    };
    return Display;
}(React.Component));
exports.Display = Display;
var styles = react_native_1.StyleSheet.create({
    hiddenText: {
        backgroundColor: 'transparent',
        color: 'transparent'
    },
    displayText: {
        flex: 1,
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
        backgroundColor: 'transparent'
    }
});
//# sourceMappingURL=Display.js.map