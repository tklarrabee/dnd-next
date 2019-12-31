const express = require("express");
const session = require('express-session')
const app = express();
const bodyParser = require('body-parser');
const path = require("path");
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const crypto = require('crypto');
const uuid = require('node-uuid');

// const game = require('./routes/game');
const PORT = process.env.PORT || 3001;




app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

app.use(session({
    genid: req => {
        return crypto.createHash('sha256').update(uuid.v1()).update(crypto.randomBytes(256)).digest("hex");
    },
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
  })) 

  
  
  // ============= Database =================
  
  const models = require('./models')
  
  // Require API routes
//   require('./routes/game')(app)
  
  // Socket.io utils
  require('./socket/utils')(app, io);


models.sequelize.sync({ force: true }).then(function () {
    console.log(`\n●○▷●○▷●○▷●○▷●○▷●○▷●○▷●○▷●○▷\n●○▷ Database is Online! ●○▷\n●○▷●○▷●○▷●○▷●○▷●○▷●○▷●○▷●○▷`)
}).catch(function (err) {
    console.log(err, 'Something went wrong with the Database Update!')
});



app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

server.listen(PORT, err => {
    if (!err) { console.log(`🌎 ==> API server now on port ${PORT}!`); }
});
