
require('dotenv').config()

const express = require('express');

const path = require('path')
const cors = require('cors')
const cookSession = require('cookie-session')


const loginService = require('./services/loginService')
const fileService = require('./services/fileService')






const app = express()


const PORT = process.env.PORT || 5000



app.use(cors())

app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.use(cookSession({
  name: "session",
  keys: ['SDFLU9iw2308dlsfuwe2adfl', 'LDFA34gsdfgFOPW2323DA7FS2']
}))


app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, './views'))




app.use(express.static(path.join(__dirname, "../client"), { extensions: ["html", 'htm'] })
);



app.get('/dashboard', (req, res) => {
  if (req.session.isValid) {
    res.render('dashboard')
  } else {
    res.redirect('/login')
  }
})

app.get('/login', (req, res) => {

  res.render('login', { passwordWarning: "", emailWarning: "", email: "", password: "" })

})

app.get('/api/v1/users', (req, res) =>{
  const users = fileService.getFileContents('../data/users.json');
  res.send(users)
 

})

const { v4: uuidv4 } = require('uuid');


app.get('/signup', (req, res) => {

  res.render('signup', { passwordWarning: "", emailWarning: "", NameWarning:"", email: "", password:"", fullname:"" })

})

const { body, validationResult } = require('express-validator');



app.post('/signup', [
  body('fullname').isLength({ min: 6 }),
  body('email').isEmail(),
  body('password').isLength({ min: 6 })
], (req, res) => {
  
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    fileService.writeFileContents('../data/users.json',{"id":uuidv4(),"fullname":req.body.fullname,"email":req.body.email,"password":req.body.password});
    res.redirect('login')
  }
  else{
    
    const user = errors.array().reduce((a,b) => {

      if (b.param === "password"){
        a.passwordWarn = true
      }
      if (b.param === "email"){
        a.emailWarn = true
      }
      if (b.param === "fullname"){
        a.NameWarn = true
      }

      return a;
      
    },{passwordWarn : false, emailWarn:false, NameWarn:false })

    
    let passwordWarningText = ""
    let emailWarningText = ""
    let NameWarningText = ""
  
    if (user.passwordWarn === true) { passwordWarningText = `password must be at least 6 characters long` }
    if (user.emailWarn === true) { emailWarningText = `please enter a valid email` }
    if (user.NameWarn === true) { NameWarningText = `Name must be at least 6 characters long` }
    res.render('signup', {
      passwordWarning: passwordWarningText,
      NameWarning: NameWarningText,
      emailWarning: emailWarningText,
      email: req.body.email,
      password: req.body.password,
      fullname: req.body.fullname
    })
    
  }

})




app.post('/login', (req, res) => {
  
  const credentials = {
    email: req.body.email,
    password: req.body.password
  }

  const isValidUser = loginService.authenticate(credentials)

  
  if (isValidUser.user !== null) {
   
    if (!req.session.isValid) {
      req.session.isValid = true;
    }
    res.redirect('dashboard')
  }

  if (isValidUser.user === null) {
    
    res.render('login', {
      emailWarning: isValidUser.emailWarning,
      passwordWarning: isValidUser.passwordWarning,
      email: req.body.email,
      password: req.body.password
    })
  }
})






app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "../client/404.html"));
});




app.listen(PORT, () => {
  console.log(`server started on http://localhost:5000`);
});
