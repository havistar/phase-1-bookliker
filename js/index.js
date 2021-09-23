document.addEventListener("DOMContentLoaded", function() {});

function myFetch(url, options={}) {
    return fetch(url, options)
      .then(res => res.json());
  }
  
  const url = 'http://localhost:3000/books';
  
  myFetch(url)
    .then(books => {
      for (const book of books) {
        makeMenuItem(book);
      }
    });
  
  function makeMenuItem(book) {
    const li = document.createElement('li');
  
    li.innerText = book.title;
    li.dataset.bookId = book.id;
  
    const menuUl = document.querySelector('#list');
  
    menuUl.append(li);

  
  const currentUser = {"id":1, "username":"pouros"};
  
  function makeLikeBtn(book) {
    const likeBtn = document.createElement('button');
    likeBtn.innerText = 'Like';
  
    likeBtn.addEventListener('click', () => {
      const usersArray = book.users;
  
      if (!usersArray.find(user => user.id === currentUser.id)) {
        usersArray.push(currentUser);
      }
  
      const options = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          users: usersArray
        })
      };
  
      myFetch(`${url}/${book.id}`, options)
        .then(book => {
          showBook(book);
        });
    });
  
    return likeBtn;
  }
  
  function showBook(book) {
    const thumbnail = document.createElement('img');
    thumbnail.src = book.img_url;
  
    const title = document.createElement('h2');
    title.innerText = book.title;
  
    const description = document.createElement('p');
    description.innerText = book.description;
  
    const usersList = document.createElement('ul');
  
    for (const user of book.users) {
      const li = document.createElement('li');
      li.innerText = user.username;
  
      usersList.append(li);
    }
    
    const likeBtn = makeLikeBtn(book);

    const showPanel = document.querySelector('#show-panel');
    showPanel.innerText = '';
    showPanel.append(thumbnail, title, description, usersList, likeBtn);
  }
  
  const menuUl = document.querySelector('#list');
  
  menuUl.addEventListener('click', e => {

    const bookId = e.target.dataset.bookId;
  
    fetch(`${url}/${bookId}`)
      .then(res => res.json())
      .then(book => {
        showBook(book);
      });
  });