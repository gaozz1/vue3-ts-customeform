import { PropType, defineComponent } from 'vue'
import JsonSchemaForm, { Schema, ThemeProvider } from '../../../lib'
import defaultTheme from '../../../lib/theme-default'

// vjs-theme-default // import {} from vue3-jsonschema-form
// vue3-jsonschema-from

export const ThemeDefaultProvider = defineComponent({
  setup(p, { slots }) {
    return () => (
      <ThemeProvider theme={defaultTheme}>
        {slots.default && slots.default()}
      </ThemeProvider>
    )
  },
})

export default defineComponent({
  name: 'TestComponent',
  props: {
    schema: {
      type: Object as PropType<Schema>,
      required: true,
    },
    value: {
      required: true,
    },
    onChange: {
      type: Function as PropType<(v: string) => void>,
      required: true,
    },
  },
  setup(props) {
    return () => (
      <ThemeDefaultProvider>
        <JsonSchemaForm {...props} />
      </ThemeDefaultProvider>
    )
  },
})
