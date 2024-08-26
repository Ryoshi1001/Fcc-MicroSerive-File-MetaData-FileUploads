var express = require('express');
var cors = require('cors');
require('dotenv').config()

//Multer middleware for uploading files: https://www.npmjs.com/package/multer
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});


//Working Route with multer's upload variable using ".single()" method with input: name=upfile from the html form. 
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  //testing data in console
  console.log(req.file, req.file.filename, req.file.mimetype, req.file.size)

  //print: file name, type, and size in bytes within the JSON response to client.
  res.json({
    name: req.file.originalname, 
    type: req.file.mimetype, 
    size: req.file.size
  })
 
})

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
