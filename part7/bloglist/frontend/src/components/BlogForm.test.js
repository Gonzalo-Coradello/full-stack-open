import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

// Unit tests are not updated

describe('<BlogForm />', () => {
  test('the event handler is called with the right details', async () => {
    const createBlog = jest.fn()
    const user = userEvent.setup()

    render(<BlogForm createBlog={createBlog} />)

    const titleInput = screen.getByPlaceholderText('write blog title here')
    const authorInput = screen.getByPlaceholderText('John Doe')
    const urlInput = screen.getByPlaceholderText('https://yoursite.com')
    const button = screen.getByText('create')

    await user.type(titleInput, 'Learning React Testing Library')
    await user.type(authorInput, 'Gonzalo Coradello')
    await user.type(urlInput, 'http://localhost:3001/api/blogs/12')
    await user.click(button)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0]).toEqual({
      title: 'Learning React Testing Library',
      author: 'Gonzalo Coradello',
      url: 'http://localhost:3001/api/blogs/12',
    })
  })
})
