import { Button } from '@/components/Buttons'
import { Modal } from '@/components/Modal'
import { render, fireEvent } from '@testing-library/react'

import { resizeScreenSize } from '../../jest.setup'

describe('Modal Component', () => {
  it('should render the modal', () => {
    resizeScreenSize(640)
    const onCloseMock = jest.fn()
    const { container, getByTestId, getByText } = render(
      <Modal open={true} onClose={onCloseMock} fullScreen>
        <Modal.Content>Modal</Modal.Content>
        <Modal.Actions>
          <Button onClick={onCloseMock}>Close</Button>
          <Button onClick={onCloseMock}>Submit</Button>
        </Modal.Actions>
      </Modal>
    )
    // expect(container).toMatchSnapshot()

    fireEvent.click(getByTestId('modal'))
    expect(onCloseMock).toBeCalledTimes(1)

    fireEvent.click(getByText('Close'))
    expect(onCloseMock).toBeCalledTimes(2)

    fireEvent.click(getByText('Submit'))
    expect(onCloseMock).toBeCalledTimes(3)
  })
})
