const Values = {
  first: 1,
  second: 2,
  third: 3,
}

const wellTypedEntries = <K extends string, V>(o: Record<K, V>): [K, V][] =>
  Object.entries(o) as [K, V][]

class JSEnumComboBox<E extends string = string> {
  private domElement: HTMLSelectElement
  private keyLookup: Record<string, E> = {}
  private _enum: Record<E, any> = {} as any
  constructor(container: HTMLElement) {
    this.domElement = document.createElement("select")
    container.appendChild(this.domElement)
  }

  setEnumClass<N extends string>(
    _enum: Record<N, any>,
  ): asserts this is JSEnumComboBox<N> {
    this.keyLookup = {}
    this._enum = _enum as any as Record<E, any>

    while (this.domElement.firstChild)
      this.domElement.removeChild(this.domElement.firstChild)

    for (const [k, v] of wellTypedEntries(this._enum)) {
      const option = document.createElement("option")
      option.innerText = k
      option.setAttribute("value", v)
      this.domElement.appendChild(option)
      this.keyLookup[v] = k
    }
  }

  currentEnum(): E {
    return this.keyLookup[this.domElement.value]
  }

  setCurrentEnum(e: E) {
    this.domElement.value = this._enum[e]
    this.domElement.dispatchEvent(new InputEvent("input"))
  }

  observeCurrentEnum(listener: (v: E) => void) {
    listener(this.currentEnum())
    this.domElement.addEventListener("input", () =>
      listener(this.currentEnum()),
    )
  }
}

const box: JSEnumComboBox = new JSEnumComboBox(document.body)
box.setEnumClass(Values)

for (const [k] of wellTypedEntries(Values)) {
  const b = document.createElement("button")
  b.innerText = "Set to " + k
  b.onclick = () => box.setCurrentEnum(k)
  document.body.appendChild(b)
}

const message = document.createElement("div")
document.body.appendChild(message)
box.observeCurrentEnum((v) => (message.innerText = `The box's value is ${v}`))
