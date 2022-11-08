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

    Object.defineProperty(this, "suggestedBooks", {
        get(){
           return authors.reduce((acc, item) => {
                const bookName = new Set (item.books.map((title) => title));
                return [...bookName];
            }, []).filter(title => title !== this).map(({ title } )=> title).join(', ');
        }
    })

    Object.defineProperty(this, 'suggestedPublicators', {
        get() {
            return authors.reduce((acc, item) => {
                const massName = new Set (item.books.map((book) => book.publicationBy));
                return [...massName];
            }, []).filter(item => item !== this.publicationBy).map(({ name } )=> name).join(', ');
        }
    })



}
