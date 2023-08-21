<template>
  <input type="text" :value="value" @input="handleChange" />
</template>

<script lang="ts" setup="props">
import { ref, defineProps } from 'vue'
import { FiledPropsDefine } from '../types'

// export default {
//   props: FiledPropsDefine,
// }

// const props= {
//   value: any
//   onChange: (v: string) => void
//   schema: Schema
// }

const props = defineProps(FiledPropsDefine)

const handleChange = (e: any) => {
  // console.log(e)
  props.onChange(e.target.value)
}
</script>
