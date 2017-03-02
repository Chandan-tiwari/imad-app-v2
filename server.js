var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app=express();
app.use(morgan('combined'));



var Pool=require('pg').Pool;

var config={
    user:'chandan-tiwari',
    database:'chandan-tiwari',
    host:'db.imad.hasura-app.io', 
    port:'5432',
    password:process.env.DB_PASSWORD
};
var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var counter=0;
app.get('/counter',function(req, res)
{
  counter=counter+1;
  res.send(counter.toString());
});

var pool=new Pool(config);
app.get('/test-db',function(req,res){
    //make a select requst 
    //return a response
    pool.query('SELECT *FROM test',function(err, result){
        if (err){
            res.status(500).send(err.toString());
        } else {
            res.send(JSON.stringify(result.rows));
        }
    });
});

   var articles ={ 
      'article-one':{
    title:'Article one |CHANDAN TIWARI',
    heading:'Article one',
    date:'4th feb,2017',
    content:    ` 
           <p>
                This is the content for my first article.    This is the content for my first article.    This is the content for my first article.    This is the content for my first article.    This is the content for my first article.    This is the content for my first article.    This is the content for my first article.    This is the content for my first article.
            </p>
            <p>
                    This is the content for my first article.    This is the content for my first article.    This is the content for my first article.    This is the content for my first article.    This is the content for my first article.    This is the content for my first article.
            </p>
            <p>
                   This is the content for my first article.    This is the content for my first article.    This is the content for my first article.    This is the content for my first article.    This is the content for my first article.    This is the content for my first article.    This is the content for my first article.
            </p>` 
            
              },
              
        'article-two':{
            title:'Article Two |CHANDAN TIWARI',
            heading:'Article two',
            date:'5th feb,2017',
            content:    ` 
                   <p>
                      This is the content for my second article.    
            
                   </p>`
              },
   
        'article-three': { title:'Article Three |CHANDAN TIWARI',
        heading:'Article three',
        date:'7th feb,2017',
        content:    ` 
           <p>
                This is the content for my third article.    
            
            </p>`},
   };
function createTemplate (data) {
   var title =data.title;
   var date= data.date;
   var heading = date.heading;
   var containt = data.containt;
   
   var hrmlTemplate = `
    <html>
    <head>
        <title>
            ${title}
        </title>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <style>
            .container{
                max-width:800px;
                margin:0 auto;
                color:blue;
                font-family:sans-seri;
            }
        </style>
    </head>
    <body>
        <div class="container">
        <div>
            <a hrf="/">HOME</a>
        </div>
        <hr/>
        <h3>
            ${heading}
        </h3>
        <div>
            ${date}
        </div>
        <div>
        ${content}
           </p>
        </div></div>
    </body>
    </html>
   `;
   return htmlTemplate;
}   
 
 app.get('/',function(req,res){
  res.sendFile(path.join(__dirname,'ui','index.html'));
 });

app.get('/:articleName',function(req,res){
    //articleName=articlr-one
    var articleName = req.params.articleName;
    res.send(createTemplate(articles[articleName ]));
   });

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
