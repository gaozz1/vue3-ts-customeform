import {
  defineComponent,
  inject,
  watchEffect,
  DefineComponent,
  ExtractPropTypes,
} from 'vue'

import { FiledPropsDefine, commonFieldDefine } from '../types'

import SchemaForm from '../SchemaForm'
import { isObject } from '../utils'
import { SchemaFormContextKey, useVJSFContext } from '../context'

const schema = {
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

export default defineComponent({
  name: 'ObjectFiled',
  props: FiledPropsDefine,
  setup(props) {
    const context = useVJSFContext()

    if (!context) {
      throw Error('SchemaForm should be used')
    }

    const handleObjectFieldChange = (key: string, v: any) => {
      const value: any = isObject(props.value) ? props.value : {}

      if (v === undefined) {
        delete value[key]
      } else {
        value[key] = v
      }

      props.onChange(value)
    }

    return () => {
      const { schema, rootSchema, value, errorSchema, uiSchema } = props

      const { SchemaItem } = context

      const properties = schema.properties || {}

      const currentValue: any = isObject(value) ? value : {}

      return Object.keys(properties).map((k: string, index: number) => (
        <SchemaItem
          schema={properties[k]}
          rootSchema={rootSchema}
          value={currentValue[k]}
          key={index}
          uiSchema={uiSchema.properties ? uiSchema.properties || {} : {}}
          errorSchema={errorSchema[k] || {}}
          onChange={(v: any) => handleObjectFieldChange(k, v)}
        />
      ))
    }
  },
})
