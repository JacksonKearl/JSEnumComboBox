const Values = {
    first: 1,
    second: 2,
    third: 3,
};
const wellTypedEntries = (o) => Object.entries(o);
class JSEnumComboBox {
    domElement;
    keyLookup = {};
    _enum = {};
    constructor(container) {
        this.domElement = document.createElement("select");
        container.appendChild(this.domElement);
    }
    setEnumClass(_enum) {
        this.keyLookup = {};
        this._enum = _enum;
        while (this.domElement.firstChild)
            this.domElement.removeChild(this.domElement.firstChild);
        for (const [k, v] of wellTypedEntries(this._enum)) {
            const option = document.createElement("option");
            option.innerText = k;
            option.setAttribute("value", v);
            this.domElement.appendChild(option);
            this.keyLookup[v] = k;
        }
    }
    currentEnum() {
        return this.keyLookup[this.domElement.value];
    }
    setCurrentEnum(e) {
        this.domElement.value = this._enum[e];
        this.domElement.dispatchEvent(new InputEvent("input"));
    }
    observeCurrentEnum(listener) {
        listener(this.currentEnum());
        this.domElement.addEventListener("input", () => listener(this.currentEnum()));
    }
}
const box = new JSEnumComboBox(document.body);
box.setEnumClass(Values);
for (const [k] of wellTypedEntries(Values)) {
    const b = document.createElement("button");
    b.innerText = "Set to " + k;
    b.onclick = () => box.setCurrentEnum(k);
    document.body.appendChild(b);
}
const message = document.createElement("div");
document.body.appendChild(message);
box.observeCurrentEnum((v) => (message.innerText = `The box's value is ${v}`));
fetch("./index.ts").then(async (r) => {
    const details = document.createElement("details");
    const summary = document.createElement("summary");
    summary.innerText = "View TS Source";
    details.appendChild(summary);
    const source = document.createElement("pre");
    source.innerText = await r.text();
    details.appendChild(source);
    document.body.appendChild(details);
});
fetch("./index.js").then(async (r) => {
    const details = document.createElement("details");
    const summary = document.createElement("summary");
    summary.innerText = "View JS Source";
    details.appendChild(summary);
    const source = document.createElement("pre");
    source.innerText = await r.text();
    details.appendChild(source);
    document.body.appendChild(details);
});
