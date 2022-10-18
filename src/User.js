import { Book } from './Book.js';

/**
 * @param {string} name
 * @param {Date} date
 * @constructor
 * @property {string} name
 * @property {Date} date
 * @property {Book[]} myBooks
 * @property {User[]} friends
 * @property {Book[]} likes
 */
export function User(name, date) {
  this.name = name;
  this.date = date;
  this.myBooks = [];
  this.friends = [];
  this.likes = [];

  //есть так же две похожее функции пытался их объединить, но не получается, код того как я их пытался объединить в copy_User.js
  this.addAndRemoveFriends = (User) => {//отказывается проходить тест на структуру всего User, так как считается Анонимной(как исправить не знаю)
    if(this.friends.length === 0) {
      this.friends.push(User);
      User.friends.push(this);
      return;
    }
    this.friends.map(item => {
      if (item === User){
        this.friends = this.friends.filter(item => item !== User);
        User.friends = User.friends.filter(item => item !== this);
      }else{
        this.friends.push(User);
        User.friends.push(this);
      }
    })
  }

  this.addToFriends = (User) => {
    this.addAndRemoveFriends(User);
  }

  this.removeFriend = (User) => {
    this.addAndRemoveFriends(User);
  }

  this.likeAndUnlikeBook = (Book) => { //отказывается проходить тест на структуру всего User, так как считается Анонимной(как исправить не знаю)
    if(this.likes.length === 0){
      this.likes.push(Book);
      Book.likedUsers.push(this);
      return;
    }
    this.likes.map(item => {
      if (item === Book){
        this.likes = this.likes.filter(item => item !== Book);
        Book.likedUsers = Book.likedUsers.filter(item => item !== this);
      }else{
        this.likes.push(Book);
        Book.likedUsers.push(this);
      }
    })

  }

  this.likeBook = (Book) =>{
    this.likeAndUnlikeBook(Book);
  }

  this.unlikeBook = (Book) => {
    this.likeAndUnlikeBook(Book);
  }

  this.connectInTheOneStr = (inputArray, name) => { //отказывается проходить тест на структуру всего User, так как считается Анонимной(как исправить не знаю)
    const res =  inputArray.reduce((acc, item) => {
        acc.push(item[name]);
        return acc;
      }, []);
    return res.join(', ');
  }

  Object.defineProperty(this, 'friendsNames', {
    get(){
      return this.connectInTheOneStr(this.friends, 'name');
    }
  })

  Object.defineProperty(this, 'likedBooks', {
    get(){
      return this.connectInTheOneStr(this.likes, 'title');
    }
  })

  Object.defineProperty(this, 'publishedBooks', {
    get(){
      return this.connectInTheOneStr(this.myBooks, 'title')
    }
  })

}
