import { IoClose } from 'react-icons/io5'

import { IconButton } from '@/components/Buttons/IconButton'
import { render } from '@testing-library/react'

describe('IconButton Component', () => {
  it('should render the button', () => {
    const { container } = render(<IconButton icon={IoClose} />)
    // expect(container).toMatchSnapshot()
  })
})
