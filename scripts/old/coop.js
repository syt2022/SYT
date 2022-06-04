const fs = require('fs')
const coopJson = require('./coop.json').translation

const scriptConst = fs.readFileSync('./MapScript.galaxy').toString()
const stringsConst = fs.readFileSync('./GameStrings.txt').toString()

let script = scriptConst

let stringName = ''

for (let index in coopJson) {
  script = script.replace(coopJson[index].en, `TextToString(StringExternal(Coop/Describe/${index}))`)
  stringName = stringName + `Coop/Describe/${index}=${coopJson[index].cn}\n`
}

console.log(stringName)

fs.writeFileSync('./MapScript.galaxy', script)
fs.writeFileSync('./GameStrings.txt', stringsConst + '\n' + stringName)
