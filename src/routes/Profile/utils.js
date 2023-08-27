import { flagsMap } from './config'

export const getDecodedFlags = (flags) => {
  const decodedFlags = []
  let flagsCopy = flags

  Object.entries(flagsMap)
    .sort((a, b) => b[1] - a[1])
    .forEach(([key, value]) => {
      const result = flagsCopy - (1 << value)

      if (result < 0) return

      flagsCopy = result
      return decodedFlags.push(key)
    })

  return decodedFlags
}
