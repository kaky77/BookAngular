import { Injectable } from '@angular/core';
import { Book } from '../models/book.model';
import { Subject } from 'rxjs';
import { child, DatabaseReference, DataSnapshot, getDatabase, onValue, ref, set } from "firebase/database";
//import * as firebase from '@firebase/app';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  // aurez un array local  books  et un Subject pour l'émettre ;
  books: Book[] = [];
  booksSubject = new Subject<Book[]>();
//Ajoutez un constructor au service pour appeler  getBooks()  au démarrage de l'application 
  constructor() { 
    this.getBooks();
  }

  emitBooks() {
    this.booksSubject.next(this.books);
  }
  //utiliser une méthode mise à disposition par Firebase pour enregistrer la liste sur un node de la base de données — la méthode  set()
  //La méthode  ref()  retourne une référence au node demandé de la base de données, et  set()  fonctionne plus ou moins comme  put()  pour le
  // HTTP : il écrit et remplace les données au node donné.
  //pour enregistrer la liste des livres sur le serveur,
  saveBooks() {
    const db = getDatabase();
  set(ref(db, '/Books'),{
    bookName:this.books,
  });
 }

//pour récupérer la liste des livres depuis le serveur,
getBooks() {
  const db = getDatabase();
    onValue(ref(db, '/Books'), (data: DataSnapshot) => {
        this.books = data.val() ? data.val() : [];
        this.emitBooks();
      }
    );
}

//pour récupérer un seul livre,
getSingleBook(id: number) {
  return new Promise(
    (resolve, reject) => {
      onValue(ref(getDatabase(),'/Books/' + id),then(
        (data: DataSnapshot) => {
          resolve(data.val());
        }, (error: any) => {
          reject(error);
        }
      ));
    }
  ); 
}
//pour créer un nouveau livre,
createNewBook(newBook: Book) {
  this.books.push(newBook);
  this.saveBooks();
  this.emitBooks();
}

//pour supprimer un livre existant.
removeBook(book: Book) {
  const bookIndexToRemove = this.books.findIndex(
    (bookEl) => {
      if(bookEl === book) {
        return true;
      }
      return false;
    }
  );
  this.books.splice(bookIndexToRemove, 1);
  this.saveBooks();
  this.emitBooks();
}

}




function then(arg0: (data: DataSnapshot) => void, arg1: (error: any) => void): (snapshot: DataSnapshot) => unknown {
  throw new Error('Function not implemented.');
}


