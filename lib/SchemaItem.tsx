import { PropType, defineComponent, computed } from 'vue'

import NumberField from './fields/NumberField'
import StringField from './fields/StringField'
import { Schema, SchemaTypes, FiledPropsDefine } from './types'

import { retrieveSchema } from './utils'

import ObjectField from './fields/ObjectField'
import ArrayField from './fields/ArrayField'

export default defineComponent({
  name: 'SchemaItem',
  props: FiledPropsDefine,
  setup(props) {
    const retrievedSchemaRef = computed(() => {
      const { schema, rootSchema, value } = props
      return retrieveSchema(schema, rootSchema, value)
    })

    return () => {
      const { schema, rootSchema, value } = props

      const retrievedSchema = retrievedSchemaRef.value

      // TODO: 如果type没有指定，我们需要猜测type

      const type = schema.type

      let Component: any

      switch (type) {
        case SchemaTypes.STRING: {
          Component = StringField
          break
        }
        case SchemaTypes.NUMBER: {
          Component = NumberField
          break
        }
        case SchemaTypes.OBJECT: {
          Component = ObjectField
          break
        }
        case SchemaTypes.ARRAY: {
          Component = ArrayField
          break
        }
        default: {
          console.log(`${type} is no supported`)
        }
      }

      return <Component {...props} schema={retrievedSchema} />
    }
  },
})
