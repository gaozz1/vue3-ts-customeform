import SelectionWidget from './SelectionWidget'

import { CommonWidgetPropsDefine, CommonWidgetDefine } from '../types'
import { defineComponent } from 'vue'

import TextWidgets from './TextWidget'
import NumberWidgets from './NumberWidget'

const CommonWidget = defineComponent({
  name: 'CommonWidget',
  props: CommonWidgetPropsDefine,
  setup() {
    return () => null
  },
}) as CommonWidgetDefine

export default {
  widgets: {
    SelectionWidget,
    TextWidget: TextWidgets,
    NumberWidget: NumberWidgets,
  },
}
