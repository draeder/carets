import util from 'node:util'
import readline from'node:readline'
import EventEmitter from'events'

const rl = readline.createInterface( process.stdin, process.stdout )

const Carets = function(params){
  const carets = this

  const stdin = process.stdin
  stdin.setEncoding('utf8')
  const stdout = process.stdout
  stdout.setEncoding('utf8')

  const events = new EventEmitter()

  carets.on = events.on.bind(events),
  carets.once = events.once.bind(events),
  carets.emit = events.emit.bind(events)
  carets.off = events.off.bind(events)

  let prompt = ''
  let repeat = true

  carets.pause = () => {
    repeat = false
  }

  carets.resume = () => {
    repeat = true
  }

  carets.on('repeat', (string, bool) => {
    if(repeat) carets.prompt(string)
    else return
  })

  const caret = util.promisify(rl.question).bind(rl)

  let doc = {}
  rl.on('line', data => {
    doc[+new Date()] = data
  })

  carets.prompt = async (string) => {
    rl.setPrompt(string || params.caret)
    let data = await caret(string || params.caret)
    if(docmode) carets.emit('doc', data)
    carets.emit('line', data)
    if(repeat)
    carets.prompt(string)
  }

  let docmode = false
  let temp

  readline.emitKeypressEvents(stdin)
  process.stdin.isTTY ? process.stdin.setRawMode(true) : ''

  process.stdin.on('keypress', (str, key) => {
    if(key.ctrl && key.name === 'w'){
      temp = prompt
      if(!docmode){
        docmode = true
        carets.prompt(params.docCaret)
        carets.pause()
      } else {
        docmode = false
        carets.emit('doc', doc)
        carets.prompt(params.caret)
        carets.resume()
      }
    }
  })
}

export default Carets