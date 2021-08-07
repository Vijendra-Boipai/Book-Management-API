//importing  or require express module
const express = require("express");

//Database
const database = require("./database");

//Initialise express
const booky = express();    //Instance of express

/*
Route           /
Description     Get all the books
Access          PUBLIC 
Parameter       NONE
Methods         GET
*/
booky.get("/", (request, response) => {
    return response.json({ books: database.books });
});

/*
Route           /is
Description     Get specific book onISBN
Access          PUBLIC 
Parameter       ISBN
Methods         GET
*/
booky.get("/is/:isbn", (request, response) => {
    const getSpecificBook = database.books.filter(
        (book) => book.ISBN === request.params.isbn
    );

    if (getSpecificBook.length === 0) {
        return response.json({ error: `No book found for the ISBN of ${request.params.isbn}` });
    }

    return response.json({ book: getSpecificBook });
});

/*
Route           /c
Description     Get specific book on category
Access          PUBLIC 
Parameter       category
Methods         GET
*/
booky.get("/c/:category", (req, res) => {
    const getSpecificBook = database.books.filter(
        (book) => book.category.includes(req.params.category)
    );

    if (getSpecificBook.length === 0) {
        return res.json({ error: `No book found for the category of ${req.params.category}` });
    }

    return res.json({ book: getSpecificBook });
})

/*
Route           /l
Description     Get specific book on language
Access          PUBLIC 
Parameter       language
Methods         GET
*/
booky.get("/l/:language", (req, res) => {
    const getSpecificBook = database.books.filter(
        (book) => book.language.includes(req.params.language)
    );

    if (getSpecificBook.length === 0) {
        return res.json({ error: `No book found for the specified language ${req.params.language}` });
    }

    return res.json({ book: getSpecificBook });
})

/*
Route           /author
Description     Get all authors
Access          PUBLIC 
Parameter       NONE
Methods         GET
*/

booky.get("/author", (req, res) => {
    return res.json({ author: database.author });
});

/*
Route           /author/i
Description     Get all authors based on id
Access          PUBLIC 
Parameter       id
Methods         GET
*/
booky.get("/author/i/:id", (req, res) => {
    const getSpecificAuthor = database.author.filter(
        (author) => author.id === parseInt(req.params.id)
    );

    if (getSpecificAuthor.length === 0) {
        return res.json({ error: `No author found on the book of id ${req.params.id}` });
    }

    return res.json({ getSpecificAuthor });
})

/*
Route           /author/book
Description     Get all authors based on books
Access          PUBLIC 
Parameter       isbn
Methods         GET
*/
booky.get("/author/books/:isbn", (req, res) => {
    const getSpecificAuthor = database.author.filter(
        (author) => author.books.includes(req.params.isbn)
    );

    if (getSpecificAuthor.length === 0) {
        return res.json({ error: `No author found on the book of ${req.params.isbn}` });
    }

    return res.json({ getSpecificAuthor });
})



booky.listen(3000, () => {
    console.log("Server is up and running");
});

/*
Route           /publications
Description     Get all publications
Access          PUBLIC 
Parameter       NONE
Methods         GET
*/
booky.get("/publications", (req, res) => {
    return res.json({ publication: database.publication });
})

/*
Route           /publications/n
Description     Get all books based on specific publication
Access          PUBLIC
Parameter       name
Methods         GET
*/
booky.get("/publications/n/:name", (req, res) => {
    const getSpecificPublications = database.publication.filter(
        (publications) => publications.name.includes(req.params.name)
    );

    if (getSpecificPublications.length === 0) {
        return res.json({ error: `NO book found on the specific publication ${req.params.name}` });
    }

    return res.json({ getSpecificPublications });
})

/*
Route           /publications/b
Description     Get all publications based on specific book
Access          PUBLIC
Parameter       books
Methods         GET
*/
booky.get("/publications/b/:books", (req, res) => {
    const getSpecificPublications = database.publication.filter(
        (publications) => publications.books.includes(req.params.books)
    );

    if (getSpecificPublications.length === 0) {
        return res.json({ error: `No book ${req.params.books} found on this specific publication` });
    }

    return res.json({ getSpecificPublications });
})