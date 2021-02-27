
window.addEventListener("load", function (e) {
let store = [];

fetch('http://127.0.0.1:5000/api/v1/users')
  .then(response => response.json())
  .then((data) => {
      store = [...data];
      const users = createMarkup();
      displayUsers(users);
  })
  .catch((error) => console.warn(`Error: ${error}`));

  const displayUsers = function(elements){
    elements.forEach(function(user){
        document.querySelector('.userView').appendChild(user)
    })
    }

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


  
    const rentalRequest = fetch("./js/data.json");
    
    rentalRequest
    .then((response) => response.json())
    .then((data) => {
      store = [...data];
      const rentals = createMarkup();
      displayRentals(rentals);
    })
    .catch((error) => console.warn(`Error: ${error}`));

    



