const fs = require('fs')
const HJSON = require('hjson')

const cipher = new Map(HJSON.parse(fs.readFileSync('./cipher.hjson', 'utf-8')))
const cipheredText = fs.readFileSync('./ciphered.txt', 'utf-8')

// From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
}

function tokenize(txt, tokens) {
  return txt.match(new RegExp(`${tokens.map(escapeRegExp).join('|')}|\n|.`, 'g'))
}

function decipher(txt, cipher) {
  const tokens = [...cipher.keys()]
  const deciphered = tokenize(txt, tokens).map((token) => cipher.get(token) ?? token)
  return deciphered.join('')
}

const decipheredText = decipher(cipheredText, cipher)

fs.writeFileSync('./deciphered.txt', decipheredText)
console.log(decipheredText)
