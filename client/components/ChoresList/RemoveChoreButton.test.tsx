// @vitest-environment jsdom
import nock from 'nock'
import { beforeAll, describe, expect, it, vi } from 'vitest'
import { renderWithQuery } from '../../test-utils'
import RemoveChoreButton from './RemoveChoreButton'

beforeAll(() => {
  nock.disableNetConnect()
})

vi.mock('@auth0/auth0-react', () => ({
  useAuth0: () => ({
    user: {
      sub: 'auth0|123',
      email: '',
    },
    isAuthenticated: true,
    getAccessTokenSilently: vi.fn(() => 'token'),
  }),
}))

describe('Remove button test for chore list', () => {
  it('removes a chore item', async () => {
    const respDelChore = nock('http://localhost')
      .delete('/api/v1/chores/1')
      .reply(204)

    const screen = renderWithQuery(
      <RemoveChoreButton flatId={'1'} choreId={1} />,
    )
    const { user } = screen
    const getRemoveButton = screen.getByTestId('remove-chore-item-button')

    expect(getRemoveButton).toBeVisible()
    await user.click(getRemoveButton)

    expect(respDelChore.isDone()).toBe(true)
  })
})
