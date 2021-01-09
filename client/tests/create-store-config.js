import value from '@/store/modules/value'
import principle from '@/store/modules/principle'

export default function createStoreConfig() {
  const valueState = {
    values: [],
    loader: {},
    errors: null,
  }

  const principleState = {
    principles: [],
    loader: {},
    errors: null,
  }

  return {
    modules: {
      value: {
        namespaced: true,
        state: valueState,
        actions: value.actions,
        mutations: value.mutations,
      },
      principle: {
        namespaced: true,
        state: principleState,
        actions: principle.actions,
        mutations: principle.mutations,
      },
    },
  }
}
