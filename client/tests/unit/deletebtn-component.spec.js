import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import DeleteBtn from '@/components/utilities/DeleteBtn.vue'
import Values from '@/components/value/Values.vue'
import Value from '@/components/value/Value.vue'
import Principles from '@/components/principle/Principles.vue'
import Principle from '@/components/principle/Principle.vue'
import createStoreConfig from '../create-store-config'
import Vuex from 'vuex'
import mockedAxios from '../mocks/axios'

jest.mock('axios')

const localVue = createLocalVue()

localVue.use(Vuex)

describe('DeleteBtn.vue', () => {
  let store

  beforeEach(async () => {
    store = new Vuex.Store(createStoreConfig())

    mockedAxios()

    await store.dispatch('value/fetchAll')
    await store.dispatch('principle/fetchAll')
  })

  it('should remove a value', async () => {
    const loader = store.state.value.loader

    const delFunc = (args) => {
      store.dispatch('value/destroyOne', args)
    }

    const wrapper = shallowMount(DeleteBtn, {
      localVue,
      store,
      propsData: {
        loader,
        uuid: '1',
        delFunc,
      },
    })

    let valuesEl = shallowMount(Values, {
      localVue,
      store,
    })

    expect(valuesEl.findAllComponents(Value)).toHaveLength(3)

    await wrapper.find('.delete').trigger('click')

    valuesEl = shallowMount(Values, {
      localVue,
      store,
    })

    expect(valuesEl.findAllComponents(Value)).toHaveLength(2)
  })
  it('should remove a principle', async () => {
    const loader = store.state.principle.loader

    const delFunc = (args) => {
      store.dispatch('principle/destroyOne', args)
    }

    const wrapper = shallowMount(DeleteBtn, {
      localVue,
      store,
      propsData: {
        loader,
        uuid: '4',
        delFunc,
      },
    })

    let principleEl = shallowMount(Principles, {
      localVue,
      store,
    })

    expect(principleEl.findAllComponents(Principle)).toHaveLength(3)

    await wrapper.find('.delete').trigger('click')

    principleEl = shallowMount(Principles, {
      localVue,
      store,
    })

    expect(principleEl.findAllComponents(Principle)).toHaveLength(2)
  })
})
