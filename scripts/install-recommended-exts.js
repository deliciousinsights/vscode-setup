const chalk = require('chalk')
const { execSync } = require('child_process')
const { parse } = require('json5')
const { readFileSync } = require('fs')
const { resolve } = require('path')

const recommendedList = getExtensionList()
const installedList = getInstalledExtensionList()
const finalList = sortList(pareDown(recommendedList, installedList))

if (finalList.length === 0) {
  console.log('All recommended extensions are installed already.')
} else {
  finalList.forEach(installExt)
}

// ========================================================

function getExtensionList() {
  const extFilePath =
    process.argv[2] || resolve(__dirname, '../.vscode/extensions.json')
  return parse(readFileSync(extFilePath)).recommendations.map(s =>
    s.toLowerCase()
  )
}

function getInstalledExtensionList() {
  return invokeCode('list-extensions')
    .split('\n')
    .map(s => s.toLowerCase())
}

function installExt(ext, index, { length }) {
  index += 1
  if (length >= 10) {
    index = String(index).padStart(2, ' ')
  }
  const [author, baseName] = ext.split('.')
  console.log(
    chalk`{white ${index}/${length}} {gray - Installing }{cyan ${baseName}}{gray  (${author})…}`
  )
  invokeCode('install-extension', ext)
}

function invokeCode(...args) {
  return execSync(`code --${args.join(' ')}`, { encoding: 'utf-8' })
}

function pareDown(source, excluded) {
  return source.filter(candidate => !excluded.includes(candidate))
}

function sortList(list) {
  return list.sort((ext1, ext2) =>
    ext1.split('.')[1].localeCompare(ext2.split('.')[1])
  )
}
