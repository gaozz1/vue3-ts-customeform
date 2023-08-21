import { mount, shallowMount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'

import {
  NumberFiled,
  StringField,
  ArrayField,
  SelectionWidget,
} from '../../lib'

import TestComponent from './utils/TestComponent'

describe('ArrayFiled', () => {
  it('should render multi type', () => {
    const wrapper = mount(TestComponent, {
      props: {
        schema: {
          type: 'array',
          items: [
            {
              type: 'string',
            },
            {
              type: 'number',
            },
          ],
        },
        value: [],
        onChange: () => {},
      },
    })
    const arr = wrapper.findComponent(ArrayField)
    const strFiled = arr.findComponent(StringField)
    const numberFiled = arr.findComponent(NumberFiled)
    expect(strFiled.exists()).toBeTruthy()
    expect(numberFiled.exists()).toBeTruthy()
  })
  it('should render single type', () => {
    const wrapper = mount(TestComponent, {
      props: {
        schema: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
        value: ['1', '2'],
        onChange: () => {},
      },
    })
    const arr = wrapper.findComponent(ArrayField)
    const strs = arr.findAllComponents(StringField)
    expect(strs.length).toBe(2)
    expect(strs[0].props('value')).toBe('1')
  })
  it('should render multi array type', () => {
    const wrapper = mount(TestComponent, {
      props: {
        schema: {
          type: 'array',
          items: {
            type: 'string',
            enum: ['1', '2', '3'],
          },
        },
        value: [],
        onChange: () => {},
      },
    })
    const arr = wrapper.findComponent(ArrayField)
    const select = arr.findComponent(SelectionWidget)
    expect(select.exists()).toBeTruthy()
    // expect(select[0]).toBe(2)
  })
})
