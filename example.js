let Carets = require('./index')

let carets = new Carets({caret: '>', caretText: 'hello', caretMultilineText: 'hello document'})

carets.on('doc', doc => {
  console.log(doc)
})

carets.on('line', line => {
  console.log(line)
})

carets.change({caret: '!', caretText: 'different', caretMultilineText: 'different document'})