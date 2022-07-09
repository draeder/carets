import util from 'node:util'
import readline from'node:readline'
import EventEmitter from'events'
import clipboard from 'clipboardy'

const events = new EventEmitter()

const Carets = function(params){
  const carets = this

  carets.on = events.on.bind(events),
  carets.once = events.once.bind(events),
  carets.emit = events.emit.bind(events)
  carets.off = events.off.bind(events)

  if(params && params.caret) params.caret = params.caret
  if(params && params.docCaret) params.docCaret = params.docCaret

  const stdin = process.stdin
  stdin.setEncoding('utf8')
  const stdout = process.stdout
  stdout.setEncoding('utf8')

  const rl = readline.createInterface( stdin, stdout )

  let docmode = false
  let caret = params.caret

  carets.history = {}
  carets.prompt = (string) => {
    let hist = Object.keys(carets.history)
    if(!hist.includes(string)) carets.history[string] = +new Date()
    caret = string
    rl.setPrompt(caret)
    rl.prompt()
    readline.cursorTo(stdin, caret.length)
  }

  readline.emitKeypressEvents(stdin)
  stdin.setRawMode(true)

  let doc = {}
  rl.on('line', async line => {
    if(!docmode) carets.emit('line', line)
    else doc[+new Date()] = line
  })

  stdin.on('keypress', async (str, key) => {
    if(key.name === 'w' && key.ctrl === true){
      !docmode ? docmode = true : docmode = false
      if(docmode) {
        carets.emit('docmode', docmode)
        caret = params.docCaret
      } else
      if(!docmode) {
        carets.emit('docmode', docmode)
        console.log()
        carets.emit('doc', doc)
        doc = {}
      }
    }
    if(key.name === 'return' || key.name === 'w' && key.ctrl === true) {
      carets.prompt(caret)
      readline.cursorTo(stdin, caret.length)
    }
    if(key.name === 'v' && key.ctrl === true){
      if(docmode){
        let clip = await clipboard.read()
        console.log(clip)
        carets.prompt(caret)
        if(clip){
          doc[+new Date()] = clip
        }
      }
    }
  })
}

export default Carets