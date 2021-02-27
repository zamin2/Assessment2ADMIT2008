
const fileService = require('./fileService')
// importing fileService

// authentication of user
exports.authenticate = (credential) => {

  const { email, password } = { ...credential }
  const users = fileService.getFileContents('../data/users.json');


  const authUser = users.reduce((authObj, user) => {

    if (user.email === email) {
      authObj.validEmail = true;
    } else {
     
    }

    if (user.password === password) {
      authObj.validPassword = true;
    } else {
      
    }

    if (authObj.validEmail === true && authObj.validPassword === true) {
      authObj.user = user;
    }

    return authObj

  }, { validEmail: false, validPassword: false, user: null })

  
  const auth0 = authUser.user ? { user: authUser.user } : formatErrors(authUser);
  return auth0

}


// setting the warning texts
const formatErrors = function (user) {
  let passwordWarning = ""
  let emailWarning = ""

  if (user.validPassword === false) { passwordWarning = `password doesn't match with our records` }
  if (user.validEmail === false) { emailWarning = `email doesn't match with our records` }

  return { user: null, emailWarning, passwordWarning }
}
