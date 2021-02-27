
window.addEventListener("load", function (e) {
let store = [];

// fetching from the custom API
fetch('https://zahid-assessment2a.herokuapp.com/api/v1/users')
  .then(response => response.json())
  .then((data) => {
      store = [...data];
      const users = createMarkup();
      displayUsers(users);
  })
  .catch((error) => console.warn(`Error: ${error}`));
  
  // adding markup to the DOM
  const displayUsers = function(elements){
    elements.forEach(function(user){
        document.querySelector('.userView').appendChild(user)
    })
    }

    // creating markup
  const createMarkup = function () {
    const markup = store.map(function (user) {
      
      const template = `           
   
      <aside class="user">
        <ul class="details">
            <li><p>User ID: ${user.id}</p></li>
          <li><p>Full Name: ${user.fullname}</p></li>
          <li><p>Email: ${user.email}</p></li>
          <li><p>Password: ${user.password}</p></li>
            <br/>
            <br/>

         
        </ul>
      </aside>
               `;
      return document
        .createRange()
        .createContextualFragment(template)
        .querySelector("aside");
    });
    return markup;
  };

});


  


    



