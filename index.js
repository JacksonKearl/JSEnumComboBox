var Values = {
    first: 1,
    second: 2,
    third: 3
};
var wellTypedEntries = function (o) {
    return Object.entries(o);
};
var JSEnumComboBox = /** @class */ (function () {
    function JSEnumComboBox(container) {
        this.keyLookup = {};
        this._enum = {};
        this.domElement = document.createElement("select");
        container.appendChild(this.domElement);
    }
    JSEnumComboBox.prototype.setEnumClass = function (_enum) {
        this.keyLookup = {};
        this._enum = _enum;
        while (this.domElement.firstChild)
            this.domElement.removeChild(this.domElement.firstChild);
        for (var _i = 0, _a = wellTypedEntries(this._enum); _i < _a.length; _i++) {
            var _b = _a[_i], k = _b[0], v = _b[1];
            var option = document.createElement("option");
            option.innerText = String(k);
            option.setAttribute("value", String(v));
            this.domElement.appendChild(option);
            this.keyLookup[v] = k;
        }
    };
    JSEnumComboBox.prototype.currentEnum = function () {
        return this.keyLookup[this.domElement.value];
    };
    JSEnumComboBox.prototype.setCurrentEnum = function (e) {
        this.domElement.value = this._enum[e];
        this.domElement.dispatchEvent(new InputEvent("input"));
    };
    JSEnumComboBox.prototype.observeCurrentEnum = function (listener) {
        var _this = this;
        this.domElement.addEventListener("input", function () {
            return listener(_this.currentEnum());
        });
        listener(this.currentEnum());
    };
    return JSEnumComboBox;
}());
var box = new JSEnumComboBox(document.body);
box.setEnumClass(Values);
var _loop_1 = function (k) {
    var b = document.createElement("button");
    b.innerText = "Set to " + k;
    b.onclick = function () { return box.setCurrentEnum(k); };
    document.body.appendChild(b);
};
for (var _i = 0, _a = wellTypedEntries(Values); _i < _a.length; _i++) {
    var k = _a[_i][0];
    _loop_1(k);
}
var message = document.createElement("div");
document.body.appendChild(message);
box.observeCurrentEnum(function (v) { return (message.innerText = "The box's value is " + v); });
