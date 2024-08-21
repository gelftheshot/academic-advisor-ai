import { Spinner } from '@/components/Spinner'
import { render } from '@testing-library/react'

describe('Spinner Component', () => {
  it('should render the spinner', () => {
    const { container } = render(<Spinner />)
    // expect(container).toMatchSnapshot()
  })
})
