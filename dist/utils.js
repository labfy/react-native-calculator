"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function formatNumber(num, decimalSeparator, thousandSeparator) {
    var nums = num.toString().split('.');
    var n = nums[0];
    var res = n.replace(/\d(?=(?:\d{3})+(?:\.|$))/g, function (v) {
        return v + thousandSeparator;
    });
    return res + (nums.length > 1 ? decimalSeparator + nums[1] : '');
}
exports.formatNumber = formatNumber;
//# sourceMappingURL=utils.js.map