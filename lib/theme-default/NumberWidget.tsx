import { CommonWidgetPropsDefine, CommonWidgetDefine } from '../types'
import { defineComponent } from 'vue'

import { withFormItem } from './FormItem'

const NumberWidget: CommonWidgetDefine = withFormItem(
  defineComponent({
    name: 'NumberWidget',
    props: CommonWidgetPropsDefine,
    setup(props) {
      const handleChange = (e: any) => {
        const value = e.target.value
        e.target.value = props.value
        props.onChange(value)
      }

      return () => {
        const { value } = props
        return (
          <input value={value as any} type="number" onInput={handleChange} />
        )
      }
    },
  }),
)

export default NumberWidget
