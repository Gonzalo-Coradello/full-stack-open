const { GraphQLError } = require('graphql')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const jwt = require('jsonwebtoken')

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.author && args.genre) {
        const author = await Author.findOne({ name: args.author })
        if (!author) return null

        return Book.find({ author: author._id, genres: args.genre })
      } else if (args.author) {
        const author = await Author.findOne({ name: args.author })
        if (!author) return null

        return Book.find({ author: author._id })
      } else if (args.genre) {
        return Book.find({ genres: args.genre })
      } else {
        return Book.find({})
      }
    },
    allAuthors: async () => Author.find({}),
    me: (root, args, context) => {
      return context.currentUser
    },
  },
  Book: {
    author: async root => await Author.findById(root.author),
  },
  Author: {
    bookCount: async root => (await Book.find({ author: root.id })).length,
  },
  Mutation: {
    addBook: async (root, args, context) => {
      console.log(context.currentUser)
      if (!context.currentUser) {
        throw new GraphQLError('Unauthorized', {
          extensions: {
            code: 'FORBIDDEN',
          },
        })
      }

      const author = await Author.findOne({ name: args.author })

      if (author) {
        const book = new Book({ ...args, author: author._id || author.id })

        try {
          return book.save()
        } catch (error) {
          throw new GraphQLError('Saving book failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.title,
              error,
            },
          })
        }
      } else {
        const newAuthor = new Author({ name: args.author })

        try {
          await newAuthor.save()
        } catch (error) {
          throw new GraphQLError('Saving book author failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.author,
              error,
            },
          })
        }

        const book = new Book({
          ...args,
          author: newAuthor._id || newAuthor.id,
        })

        try {
          return book.save()
        } catch (error) {
          throw new GraphQLError('Saving book failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.title,
              error,
            },
          })
        }
      }
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError('Unauthorized', {
          extensions: {
            code: 'FORBIDDEN',
          },
        })
      }

      const author = await Author.findOne({ name: args.name })
      if (!author) return null

      author.born = args.setBornTo

      try {
        return author.save()
      } catch (error) {
        throw new GraphQLError('Editing author failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error,
          },
        })
      }
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      })

      return user.save().catch(error => {
        throw new GraphQLError('Creating the user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.username,
            error,
          },
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new GraphQLError('Wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },
  },
}

module.exports = resolvers
