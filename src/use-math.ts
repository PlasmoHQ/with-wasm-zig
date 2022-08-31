import type * as CustomMath from "math"
import addWasm from "raw:~/resources/add.wasm"
import multiplyWasm from "raw:~/resources/multiply.wasm"
import { useEffect, useMemo, useState } from "react"

const useWasmInstance = <T extends WebAssembly.Exports>(location: string) => {
  const [instance, setInstance] = useState<WebAssembly.Instance>()

  useEffect(() => {
    WebAssembly.instantiateStreaming(fetch(location)).then(({ instance }) => {
      setInstance(instance)
    })
  }, [])

  return instance as {
    exports: T
  }
}

export const useMath = () => {
  const addWasmInstance = useWasmInstance<{
    add: CustomMath.add
  }>(addWasm)
  const multiplyWasmInstance = useWasmInstance<{
    multiply: CustomMath.multiply
  }>(multiplyWasm)

  return useMemo(
    () => ({
      isReady: !!addWasmInstance && !!multiplyWasmInstance,
      addWasmInstance,
      multiplyWasmInstance
    }),
    [addWasmInstance, multiplyWasmInstance]
  )
}
