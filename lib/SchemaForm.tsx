import {
  defineComponent,
  PropType,
  provide,
  reactive,
  Ref,
  shallowRef,
  watch,
  watchEffect,
  ref,
} from 'vue'

import { Schema, SchemaTypes, FiledPropsDefine, Theme, UISchema } from './types'

import SchemaItem from './SchemaItem'
import { SchemaFormContextKey } from './context'

import Ajv, { Options } from 'ajv'

import { validateFormData, ErrorSchema } from './validator'

type A = typeof SchemaItem

interface ContextRef {
  doValidate: () => Promise<{
    errors: any[]
    valid: boolean
  }>
}

const defaultAjvOptions = {
  allErrors: true,
  // jsonPointers: true,
} as Options

export default defineComponent({
  props: {
    schema: {
      type: Object as PropType<Schema>,
      required: true,
    },
    value: {
      required: true,
    },
    onChange: {
      type: Function as PropType<(v: any) => void>,
      required: true,
    },
    contextRef: {
      type: Object as PropType<Ref<ContextRef | undefined>>,
    },
    // theme: {
    //   type: Object as PropType<Theme>,
    //   required: true,
    // },
    ajvOptions: {
      type: Object as PropType<Options>,
    },
    locale: {
      type: String,
      default: 'zh',
    },
    customValidate: {
      type: Function as PropType<(data: any, errors: any) => Promise<void>>,
    },
    uiSchema: {
      type: Object as PropType<UISchema>,
    },
  },
  // props: FiledPropsDefine,
  name: 'SchemaForm',
  setup(props, { slots, emit, attrs }) {
    const handleChange = (v: any) => {
      props.onChange(v)
    }

    const context: any = {
      SchemaItem,
      // theme: props.theme,
    }

    const errorSchemaRef: Ref<ErrorSchema> = shallowRef({})

    const validatorRef: Ref<Ajv> = shallowRef() as any

    watchEffect(() => {
      validatorRef.value = new Ajv({
        ...defaultAjvOptions,
        ...props.ajvOptions,
      })
    })

    const validateResolveRef = ref()
    const validateIndex = ref(0)

    watch(
      () => props.value,
      () => {
        if (validateResolveRef.value) {
          doValidate()
        }
      },
      { deep: true },
    )

    async function doValidate() {
      const index = (validateIndex.value += 1)
      const result = await validateFormData(
        validatorRef.value,
        props.value,
        props.schema,
        props.locale,
        props.customValidate,
      )

      if (index !== validateIndex.value) return

      errorSchemaRef.value = result.errorSchema

      validateResolveRef.value(result)
      validateResolveRef.value = undefined
    }

    watch(
      () => props.contextRef,
      () => {
        if (props.contextRef) {
          // eslint-disable-next-line vue/no-mutating-props
          props.contextRef.value = {
            doValidate() {
              // const valid = validatorRef.value.validate(
              //   props.schema,
              //   props.value,
              // ) as boolean

              // const result = await validateFormData(
              //   validatorRef.value,
              //   props.value,
              //   props.schema,
              //   props.locale,
              //   props.customValidate,
              // )

              // errorSchemaRef.value = result.errorSchema

              // return result

              return new Promise((resolve) => {
                validateResolveRef.value = resolve
                doValidate()
              })
            },
          }
        }
      },
      {
        immediate: true,
      },
    )

    provide(SchemaFormContextKey, context)

    return () => {
      // const schema = props.schema
      // const type = schema?.type
      // switch (type) {
      //   case SchemaTypes.STRING: {
      //     return <input type="text" />
      //   }
      // }
      const { schema, value, uiSchema } = props
      return (
        <SchemaItem
          schema={schema}
          rootSchema={schema}
          value={value}
          uiSchema={uiSchema || {}}
          errorSchema={errorSchemaRef.value}
          onChange={handleChange}
        />
      )
    }
  },
})
