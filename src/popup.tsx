import { useState } from "react"

import { useMath } from "~use-math"

function IndexPopup() {
  const math = useMath()

  const [a, setA] = useState(0)
  const [b, setB] = useState(0)

  if (!math.isReady) {
    return null
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 16
      }}>
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
      <input
        readOnly
        disabled
        value={`A + B = ${math.addWasmInstance.exports.add(a, b)}`}
      />
      <input
        readOnly
        disabled
        value={`A * B = ${math.multiplyWasmInstance.exports.multiply(a, b)}`}
      />
    </div>
  )
}

export default IndexPopup
