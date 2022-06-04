const fs = require('fs')

const scriptConst = fs.readFileSync('./MapScript.galaxy').toString()
const stringsConst = fs.readFileSync('./GameStrings.txt').toString()
let script = scriptConst

let stringName = ''
let stringDescribe = ''

let match = script.match(/lib1_gf_DefineCard\((.+?),(.+?),(.+?), \"(.+?)\",(.+?),(.+?),(.+?),(.+?),(.+?),(.+?), \"(.*)\",(.+?), SoundLink/ig)

for (let index in match) {
  let string = match[index]
  let result = string.match(/lib1_gf_DefineCard\((.+?),(.+?),(.+?), \"(.+?)\",(.+?),(.+?),(.+?),(.+?),(.+?),(.+?), \"(.*)\",(.+?), SoundLink/i)
  nameWOspace = result[4].replace(' ', '') // 将名字的space去掉
  if (result[11] == '"') result[11] = '' // 将描述BUG去掉
  console.log(string)
  script = script.replace(string, `lib1_gf_DefineCard\(${result[1]},${result[2]},${result[3]}, \"${result[4]}\", StringExternal("Card/Name/${nameWOspace}"),${result[5]},${result[6]},${result[7]},${result[8]},${result[9]},${result[10]}, StringExternal("Card/Describe/${nameWOspace}"),${result[12]}, SoundLink`)
  stringName = stringName + `Card/Name/${nameWOspace}=${result[4]}\n`
  stringDescribe = stringDescribe + `Card/Describe/${nameWOspace}=${result[11]}\n`
}

fs.writeFileSync('./MapScript.galaxy', script)
fs.writeFileSync('./GameStrings.txt', stringsConst + '\n' + stringName + stringDescribe)
