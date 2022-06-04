const fs = require('fs')
const coopJson = require('./coop_gs.json').translation

const scriptConst = fs.readFileSync('./GameStrings.txt').toString()

let script = scriptConst

for (let index in coopJson) {
  for (let i = 0; i < 3; i++) {
    script = script.replace(coopJson[index].en, coopJson[index].cn)
  }
}

fs.writeFileSync('./GameStrings.txt', script)
