import { ButtonBase } from '@/components/Buttons/ButtonBase'
import { render, fireEvent, waitForElementToBeRemoved } from '@testing-library/react'

describe('ButtonBase Component', () => {
  it('should click with ripple', async () => {
    const onClickMock = jest.fn()
    const { container, getByRole, getByTestId } = render(<ButtonBase onClick={onClickMock}>Click</ButtonBase>)

    // expect(container).toMatchSnapshot()
    expect(container.textContent).toEqual('Click')

    fireEvent.click(getByRole('button'))
    expect(onClickMock).toBeCalledTimes(1)

    await waitForElementToBeRemoved(getByTestId('ripple'))
  })

  it('should click without ripple', () => {
    const onClickMock = jest.fn()
    const { container, getByRole, getByTestId } = render(
      <ButtonBase onClick={onClickMock} disableRipple>
        Click
      </ButtonBase>
    )

    // expect(container).toMatchSnapshot()
    expect(container.textContent).toEqual('Click')

    fireEvent.click(getByRole('button'))
    expect(onClickMock).toBeCalledTimes(1)

    expect(() => {
      getByTestId('ripple')
    }).toThrow()
  })
})
