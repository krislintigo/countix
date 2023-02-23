import pbkdf2Hmac from 'pbkdf2-hmac'
import * as bigintConversion from 'bigint-conversion'

const derivedKey = await pbkdf2Hmac('Testing71$', '/TYJOh8tY42raJcgUzcGuQ==', 512, 48, "SHA-1")

console.log(bigintConversion.bufToHex(derivedKey))
