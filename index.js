const readline = require('node:readline')
const EventEmitter = require('events')
const { captureRejectionSymbol } = require('node:events')
const rl = readline.createInterface( process.stdin, process.stdout )

const Carets = function(params){
  let carets = this
  const events = new EventEmitter()

  carets.on = events.on.bind(events),
  carets.once = events.once.bind(events),
  carets.emit = events.emit.bind(events)
  carets.off = events.off.bind(events)

  const stdin = process.stdin
  stdin.setEncoding('utf8')
  const stdout = process.stdout
  stdout.setEncoding('utf8')


  let caretSymbol = params.caret
  let caretext = params.caretext
  let caret = caretext ? caretext + ' ' + caretSymbol + ' ' : caretSymbol + ' '
  let caretMultilineText = params.caretMultilineText
  let docmode = false
  let doc = {}

  rl.setPrompt(caret)
  rl.prompt(true)

  readline.emitKeypressEvents(stdin)

  if (process.stdin.isTTY) process.stdin.setRawMode(true)

  process.stdin.on('keypress', (str, key) => {
    if(key.ctrl && key.name === 'w'){
      docmode ? docmode = false : docmode = true
      if(docmode){
        rl.setPrompt(caretMultilineText + ' ' + caretSymbol + ' ')
        doc = {}
      } else {
        rl.setPrompt(caret)
      }
      if(doc && !docmode){
        if(Object.keys(doc).length > 0)
        carets.emit('doc', doc)
        rl.prompt()
      }
      rl.prompt()
    }
  })

  rl.on('line', data => {
    if(docmode){
      let date = new Date().getTime()
      doc[date] = data + '\r\n'
    } else {
      carets.emit('line', data)
      rl.prompt()
    }
  })

  return carets
}

module.exports = Carets