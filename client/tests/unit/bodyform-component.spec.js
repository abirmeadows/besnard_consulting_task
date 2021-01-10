import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import BodyForm from '@/components/utilities/BodyForm.vue'
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

describe('BodyForm.vue', () => {
  let store

  beforeEach(async () => {
    store = new Vuex.Store(createStoreConfig())

    mockedAxios()

    await store.dispatch('value/fetchAll')
    await store.dispatch('principle/fetchAll')
  })

  it('should display the body of value added', async () => {
    const errors = store.state.value.errors
    const loader = store.state.value.loader

    const submitFunc = (args) => {
      store.dispatch('value/addOne', args)
    }

    const wrapper = shallowMount(BodyForm, {
      localVue,
      store,
      propsData: {
        formType: 'add',
        dataType: 'value',
        prevBody: '',
        errors,
        loader,
        submitFunc,
      },
    })

    const body = 'New value'

    await wrapper.find('textarea').setValue(body)
    await wrapper.find('form').trigger('submit.prevent')

    const valuesEl = mount(Values, {
      localVue,
      store,
    })

    expect(wrapper.find('textarea').element.value).toMatch('')

    const newValue = valuesEl.findAllComponents(Value).at(0)

    expect(newValue.exists).toBeTruthy()
    expect(newValue.text()).toContain(body)

    expect(wrapper.text()).toContain('value')
    expect(wrapper.text()).toContain('add')
  })
  it('should show error if body of value is empty', async () => {
    let errors = store.state.value.errors
    const loader = store.state.value.loader

    const submitFunc = (args) => {
      store.dispatch('value/addOne', args)
    }

    const wrapper = shallowMount(BodyForm, {
      localVue,
      store,
      propsData: {
        formType: 'add',
        dataType: 'value',
        prevBody: '',
        errors,
        loader,
        submitFunc,
      },
    })

    const body = ''

    await wrapper.find('textarea').setValue(body)
    await wrapper.find('form').trigger('submit.prevent')

    await wrapper.setProps({
      errors: store.state.value.errors,
    })

    expect(wrapper.find('.error').text()).toContain('Body must not be empty')

    expect(wrapper.find('textarea').element.value).toMatch(body)

    expect(wrapper.text()).toContain('value')
    expect(wrapper.text()).toContain('add')
  })
  it('should display the body of value updated', async () => {
    const errors = store.state.value.errors
    const loader = store.state.value.loader

    const submitFunc = (args) => {
      store.dispatch('value/updateOne', args)
    }

    const wrapper = shallowMount(BodyForm, {
      localVue,
      store,
      propsData: {
        formType: 'update',
        dataType: 'value',
        prevBody: 'Value one',
        prevUuid: '1',
        errors,
        loader,
        submitFunc,
      },
    })

    const body = 'Updated value'

    await wrapper.find('textarea').setValue(body)
    await wrapper.find('form').trigger('submit.prevent')

    const valuesEl = mount(Values, {
      localVue,
      store,
    })

    expect(wrapper.find('textarea').element.value).toMatch(body)

    const existingValue = valuesEl.findAllComponents(Value).at(0)

    expect(existingValue.exists).toBeTruthy()
    expect(existingValue.text()).toContain(body)

    expect(wrapper.text()).toContain('value')
    expect(wrapper.text()).toContain('update')
  })
  it('should show error if body of updated value is empty', async () => {
    const errors = store.state.value.errors
    const loader = store.state.value.loader

    const submitFunc = (args) => {
      store.dispatch('value/updateOne', args)
    }

    const wrapper = shallowMount(BodyForm, {
      localVue,
      store,
      propsData: {
        formType: 'update',
        dataType: 'value',
        prevBody: 'Value one',
        prevUuid: '1',
        errors,
        loader,
        submitFunc,
      },
    })

    const body = ''

    await wrapper.find('textarea').setValue(body)
    await wrapper.find('form').trigger('submit.prevent')

    await wrapper.setProps({
      errors: store.state.value.errors,
    })

    expect(wrapper.find('.error').text()).toContain('Body must not be empty')

    expect(wrapper.find('textarea').element.value).toMatch(body)

    expect(wrapper.text()).toContain('value')
    expect(wrapper.text()).toContain('update')
  })
  it('should display the body of principle added', async () => {
    const errors = store.state.principle.errors
    const loader = store.state.principle.loader

    const submitFunc = (args) => {
      store.dispatch('principle/addOne', args)
    }

    const wrapper = shallowMount(BodyForm, {
      localVue,
      store,
      propsData: {
        formType: 'add',
        dataType: 'principle',
        prevBody: '',
        errors,
        loader,
        submitFunc,
      },
    })

    const body = 'New principle'

    await wrapper.find('textarea').setValue(body)
    await wrapper.find('form').trigger('submit.prevent')

    const principlesEl = mount(Principles, {
      localVue,
      store,
    })

    expect(wrapper.find('textarea').element.value).toMatch('')

    const newPrinciple = principlesEl.findAllComponents(Principle).at(0)

    expect(newPrinciple.exists).toBeTruthy()
    expect(newPrinciple.text()).toContain(body)

    expect(wrapper.text()).toContain('principle')
    expect(wrapper.text()).toContain('add')
  })
  it('should show error if body of principle is empty', async () => {
    const errors = store.state.principle.errors
    const loader = store.state.principle.loader

    const submitFunc = (args) => {
      store.dispatch('principle/addOne', args)
    }

    const wrapper = shallowMount(BodyForm, {
      localVue,
      store,
      propsData: {
        formType: 'add',
        dataType: 'principle',
        prevBody: '',
        errors,
        loader,
        submitFunc,
      },
    })

    const body = ''

    await wrapper.find('textarea').setValue(body)
    await wrapper.find('form').trigger('submit.prevent')

    await wrapper.setProps({ errors: store.state.principle.errors })

    expect(wrapper.find('.error').text()).toContain('Body must not be empty')

    expect(wrapper.find('textarea').element.value).toMatch(body)

    expect(wrapper.text()).toContain('principle')
    expect(wrapper.text()).toContain('add')
  })
  it('should display the body of principle updated', async () => {
    const errors = store.state.principle.errors
    const loader = store.state.principle.loader

    const submitFunc = (args) => {
      store.dispatch('principle/updateOne', args)
    }

    const wrapper = shallowMount(BodyForm, {
      localVue,
      store,
      propsData: {
        formType: 'update',
        dataType: 'principle',
        prevBody: 'Principle one',
        prevUuid: '4',
        errors,
        loader,
        submitFunc,
      },
    })

    const body = 'Updated principle'

    await wrapper.find('textarea').setValue(body)
    await wrapper.find('form').trigger('submit.prevent')

    const principlesEl = mount(Principles, {
      localVue,
      store,
    })

    expect(wrapper.find('textarea').element.value).toMatch(body)

    const existingPrinciple = principlesEl.findAllComponents(Principle).at(0)

    expect(existingPrinciple.exists).toBeTruthy()
    expect(existingPrinciple.text()).toContain(body)

    expect(wrapper.text()).toContain('principle')
    expect(wrapper.text()).toContain('update')
  })
  it('should show error if body of updated principle is empty', async () => {
    const errors = store.state.principle.errors
    const loader = store.state.principle.loader

    const submitFunc = (args) => {
      store.dispatch('principle/updateOne', args)
    }

    const wrapper = shallowMount(BodyForm, {
      localVue,
      store,
      propsData: {
        formType: 'update',
        dataType: 'principle',
        prevBody: 'Principle one',
        prevUuid: '4',
        errors,
        loader,
        submitFunc,
      },
    })

    const body = ''

    await wrapper.find('textarea').setValue(body)
    await wrapper.find('form').trigger('submit.prevent')

    await wrapper.setProps({
      errors: store.state.principle.errors,
    })

    expect(wrapper.find('.error').text()).toContain('Body must not be empty')

    expect(wrapper.find('textarea').element.value).toMatch(body)

    expect(wrapper.text()).toContain('principle')
    expect(wrapper.text()).toContain('update')
  })
})
