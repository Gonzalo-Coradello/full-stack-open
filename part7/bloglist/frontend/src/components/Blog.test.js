import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

// Unit tests are not updated

describe('<Blog />', () => {
  let container

  const blog = {
    title: 'Unit testing in React',
    author: 'Gonzalo Coradello',
    url: 'http://localhost:3001/api/blogs/11',
    user: { name: 'Gonzalo Coradello' },
    likes: 0,
  }

  const blogUser = {
    name: 'Gonzalo Coradello',
  }

  const mockHandler = jest.fn()

  beforeEach(() => {
    container = render(
      <Blog
        blog={blog}
        user={blogUser}
        handleUpdate={mockHandler}
        handleDelete={mockHandler}
      />,
    ).container
  })

  test('only title and author are rendered by default', () => {
    const div = container.querySelector('.blog')
    expect(div).toHaveTextContent('Unit testing in React - Gonzalo Coradello')

    const url = screen.queryByText('http://localhost:3001/api/blogs/11')
    expect(url).toBeNull()

    const likes = screen.queryByText('likes')
    expect(likes).toBeNull()

    const blogInfo = container.querySelector('.blogInfo')
    expect(blogInfo).toHaveStyle('display: none')
  })

  test('url and number of likes are shown when the button is clicked', async () => {
    const button = container.querySelector('.toggle')
    const user = userEvent.setup()
    await user.click(button)

    const url = screen.getByText('http://localhost:3001/api/blogs/11', {
      exact: false,
    })
    const likes = screen.getByText('likes: 0')

    expect(url).toBeDefined()
    expect(likes).toBeDefined()

    const blogInfo = container.querySelector('.blogInfo')
    expect(blogInfo).not.toHaveStyle('display: none')
  })

  test('if the like button is clicked twice, the event handler is called twice', async () => {
    const button = container.querySelector('.toggle')
    const user = userEvent.setup()
    await user.click(button)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
