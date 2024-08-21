import Page from '@/app/components/page'
import { render } from '@testing-library/react'

describe('Components page', () => {
  it('should render the page', () => {
    const { container, getByTestId } = render(<Page />)
    // expect(container).toMatchSnapshot()

    expect(getByTestId('h1Title')).toBeInTheDocument()
  })
})
