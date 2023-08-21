import { mount, shallowMount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'

import JsonSchemaForm, { NumberFiled, StringField } from '../../lib'

describe('ObjectFiled', () => {
  let schema: any = undefined

  beforeEach(() => {
    schema = {
      type: 'object',
      properties: {
        name: {
          type: 'string',
        },
        age: {
          type: 'number',
        },
      },
    }
  })

  it('should render properties to correct fileds', async () => {
    const wrapper = mount(JsonSchemaForm, {
      props: {
        schema: schema,
        value: {},
        onChange: (v: any) => {},
      },
    })

    const strFiled = wrapper.findComponent(StringField)
    const numberFiled = wrapper.findComponent(NumberFiled)

    expect(strFiled.exists()).toBeTruthy()
    expect(numberFiled.exists()).toBeTruthy()
  })

  it('should change value when sub fileds trigger onChange', async () => {
    let value: any = {}
    const wrapper = mount(JsonSchemaForm, {
      props: {
        schema: schema,
        value: value,
        onChange: (v: any) => {
          value = v
        },
      },
    })

    const strFiled = wrapper.findComponent(StringField)
    const numberFiled = wrapper.findComponent(NumberFiled)

    await strFiled.props('onChange')('1')
    await numberFiled.props('onChange')(1)

    // expect(numberFiled.exists()).toBeTruthy()
    expect(value.name).toEqual('1')
    expect(value.age).toEqual(1)
  })

  // it('should render properties to correct fileds', async () => {
  //   let value: any = {}
  //   const wrapper = mount(JsonSchemaForm, {
  //     props: {
  //       schema: schema,
  //       value: value,
  //       onChange: (v: any) => {
  //         value = v
  //       },
  //     },
  //   })

  //   const strFiled = wrapper.findComponent(StringField)
  //   // const numberFiled = wrapper.findComponent(NumberFiled)
  //   strFiled.props('onChange')('undefined')

  //   expect(value.name).toBeUndefined()
  //   // expect(numberFiled.exists()).toBeTruthy()
  // })
})
