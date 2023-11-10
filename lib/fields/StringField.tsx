import { computed, defineComponent } from 'vue'

import {
  CommonWidgetDefine,
  CommonWidgetNames,
  FiledPropsDefine,
} from '../types'
import { getWidget } from '../theme'

export default defineComponent({
  name: 'StringField',
  props: FiledPropsDefine,
  setup(props) {
    const handleChange = (value: string) => {
      props.onChange(value)
    }

    const TextWidgetRef = computed(() => {
      const widgetRef = getWidget(CommonWidgetNames.TextWidget, props)
      return widgetRef.value
    })

    const widgetOptionsRef = computed(() => {
      const { widget, properties, items, ...rest } = props.uiSchema
      return rest
    })

    return () => {
      const { rootSchema, errorSchema, ...rest } = props

      const TextWidget = TextWidgetRef.value

      console.log('1232===============', widgetOptionsRef.value)

      return (
        <TextWidget
          {...rest}
          onChange={handleChange}
          errors={errorSchema.__errors}
          options={widgetOptionsRef.value}
        />
      )
    }
  },
})
