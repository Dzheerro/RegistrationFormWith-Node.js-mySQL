const mySQL = require('mysql2')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")


const db = mySQL.createConnection({
  host: process.env.DATABASE_HOST ,
  user: process.env.DATABASE_USER ,
  database: process.env.DATABASE ,
  password: process.env.DATABASE_PASSWORD ,
  socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock"
})

exports.register = (req , res) => {
  console.log(req.body);

  const  { name , email , password, passwordConfirm } = req.body

  db.query("SELECT email FROM users WHERE email = ?", [email], async(error, results) => {
    if(error) {
      console.log(error);
    }

    if(results.length > 0) {
      return res.render("register" , {
        message: "That email already use"
      })
    } else if (password !== passwordConfirm) {
      return res.render("register" , {
        message: "Password do not match"
      });
    }

    let hashedPassword = await bcrypt.hash(password, 8);
    console.log(hashedPassword);

    db.query("INSERT INTO users SET ?" , { name: name, email: email, password: hashedPassword }, (error, results) => {
      if(error) {
        console.log(error);
      } else {
        console.log(results);
        return res.render("register" , {
          message: "User Registered"
        });
      }
    })

  });

  



}