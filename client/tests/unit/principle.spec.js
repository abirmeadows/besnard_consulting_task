import { createLocalVue } from '@vue/test-utils'
import createStoreConfig from '../create-store-config'
import Vuex from 'vuex'
import mockedAxios from '../mocks/axios'
import { principles, singlePrinciple } from '../data'

jest.mock('axios')

const localVue = createLocalVue()

localVue.use(Vuex)

describe('Principles', () => {
  let store

  beforeEach(async () => {
    store = new Vuex.Store(createStoreConfig())

    mockedAxios()

    await store.dispatch('principle/fetchAll')
  })

  it('should fetch all', async () => {
    expect(store.state.principle.principles).toBe(principles)
  })
  it('should create one', async () => {
    const body = 'New principle'

    await store.dispatch('principle/addOne', {
      body,
      clearForm: jest.fn(),
    })

    const statePrinciples = store.state.principle.principles

    expect(statePrinciples).toContainEqual({ ...singlePrinciple, body })
  })
  it('should not create one if body is empty', async () => {
    const body = ''

    await store.dispatch('principle/addOne', {
      body,
      clearForm: jest.fn(),
    })

    const stateError = store.state.principle.errors.add

    expect(stateError).toEqual(['Body must not be empty'])
  })
  it('should update one', async () => {
    const body = 'Updated principle'

    await store.dispatch('principle/updateOne', {
      body,
      uuid: '4',
    })

    const statePrinciples = store.state.principle.principles

    expect(statePrinciples).toContainEqual({
      ...singlePrinciple,
      body,
      uuid: '4',
    })
  })
  it('should not update one if body is empty', async () => {
    const body = ''

    await store.dispatch('principle/updateOne', {
      body,
      uuid: '4',
    })

    const stateError = store.state.principle.errors.update

    expect(stateError).toEqual(['Body must not be empty'])
  })
  it('should delete one', async () => {
    await store.dispatch('principle/destroyOne', {
      uuid: '1',
    })

    expect(
      store.state.principle.principles.some(({ uuid }) => uuid === '1')
    ).toBe(false)
  })
})
