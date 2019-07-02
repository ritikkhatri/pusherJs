// var pusher = new Pusher("d07e09c9e0e3313e681d", {
//     cluster: 'ap2'
//   });
//   Pusher.logToConsole = true;
// var channel = pusher.subscribe('Lib-books');
// channel.bind('pusher:subscription_succeeded', function(members) {
//     alert('successfully subscribed!');
// });
        // channel.bind('new_book', function(data) {
        //     if(data){
        //     alert('An event was triggered with message: ')};
        //   });


    // Enable pusher logging - don't include this in production
    Pusher.logToConsole = false;

    
    var pusher = new Pusher('d07e09c9e0e3313e681d', {
          cluster: 'ap2',
          encrypted: true
        });
        // Subscribing to the 'flash-comments' Channel
   

fetch("http://localhost:3000/allbooks")
.then(res => res.json())
.then(result =>{
    result.map(book=>{
        $('#books-list').append($('<li>').html('<b>'+book.Name+'</b>'));
    })
})
var channel = pusher.subscribe('Lib-books');
var serverUrl = "/";
var bookForm = document.getElementById("book-form");
bookForm.addEventListener("submit", addNewBook);
  
  function addNewBook(event){
    event.preventDefault();
    var newBook = {
      "bookname": document.getElementById('book-name').value,
    }

    var xhr = new XMLHttpRequest();
    xhr.open("POST", serverUrl+"newbook", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function () {
      if (xhr.readyState != 4 || xhr.status != 200) return;

      // On Success of creating a new book
      console.log("Success: " + xhr.responseText);
      bookForm.reset();
    };
    xhr.send(JSON.stringify(newBook));
}

channel.bind('new_book', (data)=> {
        if(data){
            console.log(data)
            $('#books-list').append($('<li>').html('<b>'+data.bookname+'</b>')); 
        }
      })
     
    
