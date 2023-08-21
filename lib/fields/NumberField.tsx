import { FiledPropsDefine, CommonWidgetNames } from '../types'
import { defineComponent } from 'vue'

import { getWidget } from '../theme'

export default defineComponent({
  name: 'NumberField',
  props: FiledPropsDefine,
  setup(props) {
    const handleChange = (v: string) => {
      // const value = e.target.value

      const num = Number(v)

      if (Number.isNaN(num)) {
        props.onChange(undefined)
      } else {
        props.onChange(num)
      }
    }

    const NumberWidgetRef = getWidget(CommonWidgetNames.NumberWidget)

    return () => {
      const { rootSchema, errorSchema, ...rest } = props

      const NumberWidget = NumberWidgetRef.value

      return (
        <NumberWidget
          {...rest}
          onChange={handleChange}
          errors={errorSchema.__errors}
        />
      )
    }
  },
})
