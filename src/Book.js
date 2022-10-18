import { Author } from './Author.js';
import { User } from './User.js';

/**
 * @param {string} title
 * @param {Date} year
 * @param {User} publicationBy
 * @param {Author[]} authors
 * @constructor
 * @property {string} title
 * @property {Date} year
 * @property {Author[]} authors
 * @property {User[]} likedUsers
 * @property {User} publicationBy
 */
export function Book(title, year, publicationBy, authors) {
    this.title = title;
    this.year = year;
    this.publicationBy = publicationBy;
    this.authors = authors;
    this.likedUsers = [];

    authors.map(author => {
        author.books.push(this);
    })

    publicationBy.myBooks.push(this);

    function connectString (massObj) {
        const sortArr = massObj.filter((it, index) => index === massObj.indexOf(it.trim()));
        return sortArr.join(', ');
    }

    Object.defineProperty(this, "suggestedBooks", {
        get(){
            const nameBooks = [];
            authors.map(item => {
                item.books.map(item => {
                    if (item !== this){
                        nameBooks.push(item.title);
                    }
                })
            })
            return connectString(nameBooks);
        }
    })

    Object.defineProperty(this, 'suggestedPublicators', {
        get() {
            const massName = [];
           this.authors.map(item =>{
               item.books.map(item => {
                   if (item.publicationBy.name !== this.publicationBy.name) {
                       massName.push(item.publicationBy.name);
                   }
               })
           })
            return connectString(massName);
        }
    })



}
