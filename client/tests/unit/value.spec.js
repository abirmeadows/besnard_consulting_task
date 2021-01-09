import { createLocalVue } from '@vue/test-utils'
import createStoreConfig from '../create-store-config'
import Vuex from 'vuex'
import mockedAxios from '../mocks/axios'
import { values, singleValue } from '../data'

jest.mock('axios')

const localVue = createLocalVue()

localVue.use(Vuex)

describe('Values', () => {
  let store

  beforeEach(async () => {
    store = new Vuex.Store(createStoreConfig())

    mockedAxios()

    await store.dispatch('value/fetchAll')
  })

  it('should fetch all', async () => {
    expect(store.state.value.values).toBe(values)
  })
  it('should create one', async () => {
    const body = 'New value'

    await store.dispatch('value/addOne', {
      body,
      clearForm: jest.fn(),
    })

    const stateValues = store.state.value.values

    expect(stateValues).toContainEqual({ ...singleValue, body })
  })
  it('should not create one if body is empty', async () => {
    const body = ''

    await store.dispatch('value/addOne', {
      body,
      clearForm: jest.fn(),
    })

    const stateError = store.state.value.errors.add

    expect(stateError).toEqual(['Body must not be empty'])
  })
  it('should update one', async () => {
    const body = 'Updated value'

    await store.dispatch('value/updateOne', {
      body,
      uuid: '1',
    })

    const stateValues = store.state.value.values

    expect(stateValues).toContainEqual({ ...singleValue, body, uuid: '1' })
  })
  it('should not update one if body is empty', async () => {
    const body = ''

    await store.dispatch('value/updateOne', {
      body,
      uuid: '1',
    })

    const stateError = store.state.value.errors.update

    expect(stateError).toEqual(['Body must not be empty'])
  })
  it('should delete one', async () => {
    await store.dispatch('value/destroyOne', {
      uuid: '1',
    })

    expect(store.state.value.values.some(({ uuid }) => uuid === '1')).toBe(
      false
    )
  })
})
