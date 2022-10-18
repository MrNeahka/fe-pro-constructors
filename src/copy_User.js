function addAndDeleteElementOnMass (Item, thisItem, Element, thisElement) {
  if(thisElement.length === 0){
    thisElement.push(Item);
    Element.push(thisItem);
    return;
  }
  thisElement.map(item => {
    if (item === Item){
      thisElement = thisElement.filter(item => item !== Item);
      Element = Element.filter(item => item !== thisItem);
    }else {
      thisElement.push(Item);
      Element.push(thisItem);
    }
  })
}

this.addToFriends = (User) => {
  addAndDeleteElementOnMass(User, this, User.friends, this.friends);
}

this.removeFriend = (User) => {
  addAndDeleteElementOnMass(User, this, User.friends, this.friends);
}

this.likeBook = (Book) =>{
  addAndDeleteElementOnMass(Book, this, Book.likedUsers, this.likes);
}

this.unlikeBook = (Book) => {
  addAndDeleteElementOnMass(Book, this, Book.likedUsers, this.likes);
}