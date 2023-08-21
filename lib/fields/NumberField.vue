<template>
  <input type="number" :value="value" @input="handleChange" />
</template>

<script lang="ts" setup="props">
import { ref, defineProps } from 'vue'
import { FiledPropsDefine } from '../types'

// export default {
//   props: FilePropsDefine,
// }

// declare const props: {
//   value: any
//   onChange: (v: string) => void
//   schema: Schema
// }

const props = defineProps(FiledPropsDefine)

const handleChange = (e: any) => {
  // console.log(e)
  const value = e.target.value

  const num = Number(value)

  if (Number.isNaN(num)) {
    props.onChange(undefined)
  } else {
    props.onChange(num)
  }
}
</script>
