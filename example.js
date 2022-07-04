import Carets from './index.js'

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