# Carets
## A terminal prompt input library for node with easy multiline input

### Install
```
npm i carets
```

### Example
```js
import Carets from 'carets'

let carets = new Carets({caret: 'carets > ', docCaret: 'doc $ > '})

carets.prompt()

carets.on('line', data => { 
  console.log(data)
  carets.pause()
  setTimeout(()=>{
    carets.resume()
    carets.prompt()
  }, 1000)
})

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

## Keystroke Commands
### `CTRL+W` or `OPT+BACKSPACE`
Toggle between document / multiline object creation mode or line mode

When in document / multiline mode, lines are inserted into an object with UNIX time as their keys. This may be used to sort the document when it is returned.

Exit this mode, save and emit the document / multiline object (if it has data) with `CTRL+W` or `OPT+BACKSPACE`.

### `CTRL+C` or `CTRL+D`
Exit the application

### Other `CTRL+` key Combinations
See [readline TTY keybindings documentation](https://nodejs.org/api/readline.html#tty-keybindings)

## Simple API
### `new Carets(params)`
Creates a new instance of Carets

#### Example
```js
let carets = new Carets({caret: 'carets > ', docCaret: 'carets $ > '})
```
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

### `carets.resume([string])`
Resume the prompt and terminal input processing. This enables the prompt to repeat after processing new input.

#### Example
```js
carets.on('line', data => { 
  console.log(data)
  carets.pause()
  setTimeout(()=>{
    carets.resume()
    carets.prompt()
  }, 1000)
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