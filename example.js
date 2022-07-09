import Carets from './index.js'

let params = {
  caret: 'carets > ',
  docCaret: '$ '
}

// Creates a new Carets instance with the params
let carets = new Carets(params)

carets.prompt(params.caret)

carets.on('line', data => {
  // Commands example
  let cmd = data.split(' ')
  if(cmd[0] === '`'){
    cmd.shift()
    cmd = cmd.join(' ')
    carets.prompt(cmd ? cmd : '')
  } 
  else if(cmd[0] === '~'){
    console.log(carets.history)
    carets.prompt(params.caret)
  } else {
    console.log(data)
  }
})

let docname
carets.on('doc', data => {
  let doc = {}
  let keys = Object.keys(data)
  let docname = data[Math.min(...keys)]
  delete data[docname]
  console.log('Name:', docname)
  delete data[keys[0]]
  if(keys.length > 0){
    doc = data
    console.log(docname, doc)
  }
})

carets.on('docmode', bool => {
  if(bool) {
    // do something when in docmode
    setTimeout(()=>{
      carets.prompt('')
    })
  }
  else {
    // do something when docmode exits
    carets.prompt(params.caret)
  }
})

setTimeout(()=>{
  // Change the prompt at a later time
  carets.prompt('Howdy doody > ')
  
  // get a history of prompts
  let history = carets.history
  console.log()
  console.log(history)

  // Change the prompt to something in history
  carets.prompt(Object.keys(history)[0])

}, 10000)