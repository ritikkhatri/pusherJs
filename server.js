var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');


var Pusher = require('pusher');

var pusher = new Pusher({
    appId: '814509',
    key: 'd07e09c9e0e3313e681d',
    secret: 'c97bc3ef2453c17a64a6',
    cluster: 'ap2',
    encrypted: true
});

var db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'libbooksdb'
  });

  let data=[] ;
  db.connect((err)=>{
      if(err){
          throw err ;
      }
      
// First, run 'npm install pusher'



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.get('/',(req,res)=>{
})
app.get('/allbooks',(req,res)=>{
    db.query("SELECT * FROM `books name`", function (err, result, fields) {
        if (err) throw err;
         res.json(result)
}); 
})

app.post('/newbook',(req,res)=>{
    // console.log(req.body);
    console.log("Post wala call hua h");
    let bookdetail = {Name : req.body.bookname, Price : 122};
    let sql = 'INSERT INTO `books name` SET ?';
    let query = db.query(sql, bookdetail, (err, result) => {
        if(err) throw err;
        console.log(result);
        // res.send('Post 1 added...');
    });

    db.query("SELECT * FROM `books name`", function (err, result, fields) {
        if (err) throw err;
         data = result;
         console.log(data)
      
    var newBook = {
        bookname : req.body.bookname,
        books : data
    }
    pusher.trigger('Lib-books', 'new_book', newBook);
    res.json({  created: true });
});
})
app.listen(3000, () => {
    console.log("Listening on port 3000" );
  }); 

  
})
