export function uuid() {
  const chars = '0123456789abcdef'.split('')

  const newUuid = []
  const rnd = Math.random
  let r = 0

  newUuid[8] = newUuid[13] = newUuid[18] = newUuid[23] = '-'
  newUuid[14] = '4' // version 4

  for (let i = 0; i < 36; i++) {
    if (!newUuid[i]) {
      r = 0 | (rnd() * 16)

      newUuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r & 0xf]
    }
  }

  return newUuid.join('')
}
