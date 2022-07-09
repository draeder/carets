# Carets
## A terminal prompt input library for node with easy multiline input

### Install
```
npm i carets
```

### Example
```js
import Carets from 'carets'

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
```

## Keystroke Commands
### `CTRL+W` or `OPT+BACKSPACE`
Toggle between document / multiline object creation mode or line mode

When in document / multiline mode, lines are inserted into an object with UNIX time as their keys. This may be used to sort the document when it is returned.

Exit this mode, save and emit the document / multiline object (if it has data) with `CTRL+W` or `OPT+BACKSPACE`.

### `CTRL-V`
Paste data from the clipboard into the document

> Note: `COMMAND-V` does not work to paste from the clipboard. This is a limitation of the OS terminal.

### `CTRL+C`
Exit the application

### Other `CTRL+` key Combinations
See [readline TTY keybindings documentation](https://nodejs.org/api/readline.html#tty-keybindings)

## API
### `new Carets(params)`
Creates a new instance of Carets

#### Example
```js
let params = {
  caret: 'carets > ',
  docCaret: '$ '
}
let carets = new Carets(params)
```

Document mode treats the first line entered as the document name. Each subsequent line is the document body. You may paste multiline data from the clipboard with `CTRL-V`.

#### `params`

##### `params.caret`
The string you would like to use as your caret

##### `params.docCaret`
The string you would like to use as your caret in document / multiline mode

## Methods
### `carets.prompt()`
Display a prompt

### `carets.pause()`
Pause the prompt and terminal input processing

### `carets.resume()`
Resume the prompt and terminal input processing. This enables the prompt to repeat after processing new input.

#### Example
```js
carets.on('line', data => { 
  console.log(data)
  carets.pause()
  
  console.log('Anything')
  
  carets.resume()
  carets.prompt()

})
```

## Events
### `carets.on('line', data)`
Listen for new line input

#### Example 
```js
carets.on('line', data => { 
  console.log(data)
})
```

### `carets.on('doc', data)`
Listen for new document / multiline object input

#### Example
```js
let doc = {}
let docName = ''
carets.on('doc', data => {
  if(data && typeof data === 'string') docName = data
  else if(Object.keys(data).length > 0){
    doc = data
    console.log('Name:', docName, '\r\n', doc)
  }
})
```

### LICENCE
MIT