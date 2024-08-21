import { Snackbar } from '@/components/Feedback/Snackbar'
import { render, waitFor } from '@testing-library/react'

describe('Snackbar Component', () => {
  it('should open and close the snackbar', async () => {
    const onCloseMock = jest.fn()
    const { container, getByTestId } = render(
      <Snackbar open={true} message="Snackbar test" type="success" onClose={onCloseMock} duration={0.5} />
    )

    // expect(container).toMatchSnapshot()
    expect(container.textContent).toEqual('Snackbar test')

    await waitFor(
      () => {
        expect(getByTestId('snackbar').classList.contains('-left-full')).toBe(true)
      },
      { timeout: 1000 }
    )

    await waitFor(() => expect(onCloseMock).toHaveBeenCalledTimes(1))
  })
})
