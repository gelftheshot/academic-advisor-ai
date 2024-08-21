import Page from '@/app/users/page'
import { render, waitFor } from '@testing-library/react'

describe('Users page', () => {
  it('should render the page', async () => {
    const { container, getByText } = render(await Page())
    // expect(container).toMatchSnapshot()

    await waitFor(() => {
      expect(getByText('Create User')).toBeInTheDocument()
    })
  })
})
