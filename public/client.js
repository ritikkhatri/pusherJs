    Pusher.logToConsole = false;

    
    var pusher = new Pusher('d07e09c9e0e3313e681d', {
          cluster: 'ap2',
          encrypted: true
        });
   

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
    
    fetch("http://localhost:3000/newbook",{
      method : 'post',
      headers: {
        'Content-Type': 'application/json',
    },
      body :JSON.stringify(newBook)
    })
    .then(resp=>resp.json())
    
}

channel.bind('new_book', (data)=> {
        if(data){
            console.log(data)
            $('#books-list').append($('<li>').html('<b>'+data.bookname+'</b>')); 
        }
      })
     
    
