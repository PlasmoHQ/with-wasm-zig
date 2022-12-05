import type { AddWasm, MultiplyWasm } from "math"
import addWasm from "raw:~/resources/add.wasm"
import multiplyWasm from "raw:~/resources/multiply.wasm"
import { useState } from "react"

import { useWasmInstance } from "~use-wasm-instance"

function IndexPopup() {
  const addWasmInstance = useWasmInstance<AddWasm>(addWasm)
  const multiplyWasmInstance = useWasmInstance<MultiplyWasm>(multiplyWasm)

  const [a, setA] = useState(0)
  const [b, setB] = useState(0)

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 16
      }}>
      <h1>Zig Calculator MK19000</h1>
      <input
        maxLength={8}
        value={`A = ${a}`}
        onChange={(e) => setA(parseInt(e.target.value.substring(4)) || 0)}
      />
      <input
        maxLength={8}
        value={`B = ${b}`}
        onChange={(e) => setB(parseInt(e.target.value.substring(4)) || 0)}
      />
      {addWasmInstance && (
        <input
          readOnly
          disabled
          value={`A + B = ${addWasmInstance.add(a, b)}`}
        />
      )}
      {multiplyWasmInstance && (
        <input
          readOnly
          disabled
          value={`A * B = ${multiplyWasmInstance.multiply(a, b)}`}
        />
      )}
    </div>
  )
}

export default IndexPopup
