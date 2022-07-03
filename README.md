# Carets
## A terminal prompt input library for node with easy multiline input

### Install
```
npm i carets
```

### Example
```js
let Carets = require('carets')

let carets = new Carets({caret: '>', caretText: 'hello', caretMultilineText: 'hello document'})

carets.on('doc', doc => {
  console.log(doc)
})

carets.on('line', line => {
  console.log(line)
})

carets.change({caret: '!', caretText: 'different', caretMultilineText: 'different document'})
```

## Keystroke Commands
### `CTRL+W`
Toggle between document / multiline object creation mode or line mode

When in document / multiline mode, lines are inserted into an object with the date string as their keys. This may be used to sort the document when it is returned.

For example:
```js
carets.on('doc', doc => {
  let docOrder = Object.keys(doc)
  docOrder.sort()
  for(let i in docOrder){
    process.stdout.write(doc[docOrder[i]])
  }
  docOrder.reverse()
  for(let i in docOrder){
    process.stdout.write(doc[docOrder[i]])
  }
})
```

### `CTRL+C` or `CTRL+D`
Exit the application

### Other `CTRL+` key Combinations
See [readline TTY keybindings documentation](https://nodejs.org/api/readline.html#tty-keybindings)

## Extraordinarily Simple API
### `new Carets(params)`
Creates a new instance of Carets

#### Example
```js
let carets = new Carets({caret: '>', caretText: 'hello', caretMultilineText: 'hello document'})
```
#### `params`

##### `params.caret`
The string you would like to use as your caret

##### `params.caretText`
The text you would like your prompt to show before the caret

##### `params.ceretMultilineText`
The text you would like your prompt to show when it is in document / multiline mode.

## Methods
### `carets.change(params)
Change the carets

This is experimental and may have unexpected results.

#### Example
```js
carets.change({caret: '!', caretText: 'different', caretMultilineText: 'different document'})
```

## Events
### `carets.on('line', data)`
Listen for new line input

#### Example 
```js
carets.on('line', line => {
  console.log(line)
})
```

### `carets.on('doc', data)`
Listen for new document / multiline object input

#### Example
```js
carets.on('doc', doc => {
  console.log(doc)
})
```
