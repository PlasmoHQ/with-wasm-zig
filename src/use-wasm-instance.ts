import { useEffect, useState } from "react"

export const useWasmInstance = <T>(location: string) => {
  const [exp, setExp] = useState<WebAssembly.Exports>()

  useEffect(() => {
    WebAssembly.instantiateStreaming(fetch(location)).then(({ instance }) => {
      setExp(instance.exports)
    })
  }, [])

  return exp as unknown as T
}
