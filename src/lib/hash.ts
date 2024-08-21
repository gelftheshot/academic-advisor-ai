import bcrypt from 'bcryptjs'

export async function hashWord(value: string) {
  const salt = await bcrypt.genSalt(10)
  const hashedValue = await bcrypt.hash(value, salt)
  return hashedValue
}

export async function isHashValid(value: string, hashedValue: string) {
  const isValid = await bcrypt.compare(value, hashedValue)
  return isValid
}
