import { PropType, defineComponent, ref, watch, watchEffect } from 'vue'

export default defineComponent({
  name: 'SelectionWidget',
  props: {
    value: {},
    onChange: {
      type: Function as PropType<(v: any) => void>,
      required: true,
    },
    options: {
      type: Array as PropType<
        {
          key: string
          value: any
        }[]
      >,
      required: true,
    },
  },
  setup(props) {
    const currentValueRef = ref(props.value)

    watch(currentValueRef, (old, newv) => {
      if (newv !== old) {
        props.onChange(newv)
      }
    })

    watch(
      () => props.value,
      (v) => {
        if (v !== currentValueRef.value) {
          currentValueRef.value = v
        }
      },
    )

    // watchEffect(() => {
    //   console.log(currentValueRef.value)
    // })

    return () => {
      const { options } = props

      return (
        <div>
          <select multiple={true} v-model={currentValueRef.value}>
            {options.map((op) => (
              <option value={op.value}>{op.value}</option>
            ))}
          </select>
        </div>
      )
    }
  },
})
