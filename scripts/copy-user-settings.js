const chalk = require('chalk')
const inquirer = require('inquirer')
const os = require('os')
const Path = require('path')
const { existsSync, readFileSync, writeFileSync } = require('fs')

const BANNER = '// ===== VSCODE SETUP MERGED SETTINGS %s ====='
const REF_MARKER = '"**/.vscode-setup-settings-merged": true'

askForConfirmation({
  question: 'Should I merge our suggested settings in your User Settings?',
  yes: checkForPreviousMerge,
  no: displayAbort,
})

async function askForConfirmation({ question, yes, no, defaultReply = true }) {
  const { reply } = await inquirer.prompt({
    type: 'confirm',
    name: 'reply',
    message: question,
    default: defaultReply,
  })
  if (reply) {
    yes()
  } else {
    no()
  }
}

function checkForPreviousMerge() {
  const userSettingsText = getSettingsText(getUserSettingsPath())
  if (userSettingsText.includes(REF_MARKER)) {
    askForConfirmation({
      question:
        'It looks like you merged our settings already in the past. Do it again?',
      yes: mergeSettings,
      no: displayAbort,
      defaultReply: false,
    })
  } else {
    mergeSettings()
  }
}

function displayAbort() {
  console.info(chalk.blue('✖ Aborting settings merge.'))
  console.info(chalk.green('You’re done, thank you!'))
}

function getReferenceSettingsPath() {
  return Path.resolve(__dirname, '../.vscode/settings.json')
}

function getSettingsText(path) {
  const base = existsSync(path)
    ? readFileSync(path, { encoding: 'utf-8' })
    : '{}'
  return base
    .trim()
    .replace(/^\{|\}$/g, '')
    .trim()
}

function getUserSettingsPath() {
  const platform = os.platform()
  let path = null

  // See https://code.visualstudio.com/docs/getstarted/settings for reference.
  switch (platform) {
    case 'darwin':
      path = `${process.env.HOME}/Library/Application Support/Code/User/settings.json`
      break
    case 'win32':
      path = `${process.env.APPDATA}/Code/User/settings.json`
      break
    case 'linux':
      path = `${process.env.HOME}/.config/Code/User/settings.json`
      break
    default:
      throw new Error(`Unsupported VSCode platform: ${platform}`)
  }

  return Path.normalize(path)
}

function mergeSettings() {
  const userSettingsPath = getUserSettingsPath()
  const userSettingsText = getSettingsText(userSettingsPath)
  const referenceSettingsText = getSettingsText(getReferenceSettingsPath())

  const newSettingsText =
    userSettingsText === ''
      ? `{
  ${referenceSettingsText}
}`
      : `{
  ${userSettingsText},

  ${BANNER.replace('%s', new Date().toISOString())}

  ${referenceSettingsText}
}`

  const backupPath = `${userSettingsPath}.bak`
  const baseBackupPath = Path.basename(backupPath)
  if (userSettingsText !== '') {
    writeFileSync(backupPath, userSettingsText, {
      encoding: 'utf-8',
    })
  }
  writeFileSync(userSettingsPath, newSettingsText, {
    encoding: 'utf-8',
  })

  console.info(chalk.green('✔︎ Successfully merged settings.'))
  if (userSettingsText !== '') {
    console.info(
      chalk.gray.dim(
        `(former User Settings were backed up to ${baseBackupPath})`
      )
    )
  }
}
