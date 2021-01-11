// 1- require express
const express = require('express');

// 2- Initialize express
const app = express();
//console.log(app)

// 4- app.get() => send a message to the browser
/* app.get('/', (req, res) => {
  console.log('method', req.method);
  console.log('url', req.url);
  res.send('Home Page');
  //res.send('<h1 style="color:red;" >Home Page</h1>');
});

app.get('/products', (req, res) => {
  console.log('method', req.method);
  console.log('url', req.url);
  res.send('<h1 style="color:red;" >Products Page</h1>');
}); */

// 5- Get the html files using sendFile
// app.get("/", (req, res) => {
res.sendFile('/Public/index.html'); //==> error: __ dirname is missing
//   res.sendFile(__dirname + "/Public/index.html");
// });

// app.get("/products", (req, res) => {
res.sendFile('/Public/products.html'); //==> error: __ dirname is missing
//   res.sendFile(__dirname + "/Public/products.html");
// });

// serve the css
// app.get("/style.css", (req, res) => {
res.sendFile(__dirname + '/Public/style.css');
// });

// 6- Create a middleWare
function logger(req, res, next) {
  console.table({ method: req.method, path: req.url });
  //block the request
  if (5 < 4) {
    next();
  } else {
    res.send('Oups, the request is blocked!');
  }
}
// 7- app level middleware ==> global middlewares
app.use(logger);

// 8- use express.static to staticly serve all files
app.use('/static', express.static(__dirname + '/Public'));

// 3- Start The Server
const port = 5000;
app.listen(port, () => {
  console.log(`🚀 The Server is running on port ${port}`);
});
