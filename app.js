// npm start: Запускает приложение. Эта команда выполняет скрипт "start" из раздела "scripts" в файле package.json.
// npm install: Устанавливает все зависимости, указанные в файле package.json.
// npm run <название_скрипта>: Запускает пользовательский скрипт, указанный в файле package.json в разделе "scripts".
// npm init: Инициализирует новый проект, создавая файл package.json, где вы указываете информацию о проекте и его зависимостях.
// npm test: Запускает тесты, если они настроены в файле package.json.
// npm install <пакет>: Устанавливает конкретный пакет.


const express = require("express");
const mySQL = require('mysql2');
const dotenv = require('dotenv');
const path = require('path');
const app = express();


dotenv.config({path: "./.env"});

const db = mySQL.createConnection({
  host: process.env.DATABASE_HOST ,
  user: process.env.DATABASE_USER ,
  database: process.env.DATABASE ,
  password: process.env.DATABASE_PASSWORD ,
  socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock"
})

const publicDirectory = path.join(__dirname, "./public")
app.use(express.static(publicDirectory));


// Parse URL-encoded bodies (as sent by HTML form)
app.use(express.urlencoded({ extended: false }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.set("view engine", "hbs")


db.connect( (err) => {
  if (err){
    console.log(err)
  } else {
    console.log("MySQL Connected");
  }
})

// Define Routes
app.use("/" , require("./routes/pages"));
app.use("/auth", require("./routes/auth"))


app.listen(5001 , () => {
  console.log("Server started on port 5001");
})