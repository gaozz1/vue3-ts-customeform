import { mount, shallowMount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
// import HelloWorld from '@/components/HelloWorld.vue'

import JsonSchemaForm, { NumberFiled } from '../../lib'
import TestComponent from './utils/TestComponent'

describe('JsonSchemaForm', () => {
  it('should render correct number field', async () => {
    let value = ''
    const wrapper = mount(TestComponent, {
      props: {
        schema: {
          type: 'number',
        },
        value: value,
        onChange: (v: any) => {
          value = v
        },
      },
    })

    const numberField = wrapper.findComponent(NumberFiled)
    expect(numberField.exists()).toBeTruthy()
    // await numberField.props('onChange')('123')
    const input = numberField.find('input')
    input.element.value = '123'
    input.trigger('input')
    expect(value).toBe(123)
  })
})
