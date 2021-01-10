import { shallowMount, createLocalVue } from '@vue/test-utils'
import Value from '@/components/value/Value.vue'
import createStoreConfig from '../create-store-config'
import Vuex from 'vuex'
import mockedAxios from '../mocks/axios'

jest.mock('axios')

const localVue = createLocalVue()

localVue.use(Vuex)

describe('Value.vue', () => {
  let store

  beforeEach(async () => {
    store = new Vuex.Store(createStoreConfig())

    mockedAxios()

    await store.dispatch('value/fetchAll')
    await store.dispatch('principle/fetchAll')
  })

  it('should display the body', async () => {
    const stateValues = store.state.value.values

    stateValues.forEach((value) => {
      const wrapper = shallowMount(Value, {
        localVue,
        store,
        propsData: {
          value,
        },
      })

      expect(wrapper.text()).toContain(value.body)
    })
  })
})
