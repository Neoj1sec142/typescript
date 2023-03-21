const graphql = require('graphql');

const { 
    GraphQLObjectType, GraphQLSchema, GraphQLString,
    GraphQLID, GraphQLInt, GraphQLList
} = graphql;

// Dummy Data
var books = [
    {name: 'The Lies of Locke Lamora', genre: 'Fantasy', id: '1', authorId: '1'},
    {name: 'A Song of Fire and Ice', genre: 'Fantasy', id: '2', authorId: '2'},
    {name: 'Elantris', genre: 'Fantasy', id: '3', authorId: '3'},
    {name: 'Red Seas Over Red Skies', genre: 'Fantasy', id: '4', authorId: '1'},
    {name: 'A Dance of Dragons', genre: 'Fantasy', id: '5', authorId: '2'},
    {name: 'Mistborn', genre: 'Fantasy', id: '6', authorId: '3'},
]
var authors = [
    {name: 'Scott Lynch', age: 44, id: '1'},
    {name: 'George RR Martin', age: 53, id: '2'},
    {name: 'Brandon Sanderson', age: 42, id: '3'},
]
const findById = (array, targetId) => array.find(obj => obj.id === targetId) || null;
const filterByAuthorId = (array, targetId) => array.filter(obj => obj.authorId === targetId);
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent, args){
                return findById(authors, parent.authorId)
            }
        }
    })
});
const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return filterByAuthorId(books, parent.id)
            }
        }
    })
});


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return findById(books, args.id)
            }
        },
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return findById(authors, args.id)
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})