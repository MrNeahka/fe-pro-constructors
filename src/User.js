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


  this.addAndRemoveFriends = (user) => {
    if(this.friends.includes(user)){
      this.friends = this.friends.filter(item => item !== user);
      user.friends = user.friends.filter(item => item !== this);
      return;
    }
    this.friends.push(user);
    user.friends.push(this);
  }

  this.addToFriends = (user) => {
    this.addAndRemoveFriends(user);
  }

  this.removeFriend = (user) => {
    this.addAndRemoveFriends(user);
  }

  this.likeAndUnlikeBook = (book) => {
   if(this.likes.includes(book)){
     this.likes = this.likes.filter(item => item !== book);
     book.likedUsers = book.likedUsers.filter(item => item !== this);
     return;
   }
   this.likes.push(book);
   book.likedUsers.push(this);
  }

  this.likeBook = (Book) =>{
    this.likeAndUnlikeBook(Book);
  }

  this.unlikeBook = (Book) => {
    this.likeAndUnlikeBook(Book);
  }

  this.connectInTheOneStr = (inputArray, name) => {
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
