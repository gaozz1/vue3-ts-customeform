import { inject } from 'vue'
import { commonFieldDefine, Theme } from './types'

export const SchemaFormContextKey = Symbol()

export function useVJSFContext() {
  const context: { SchemaItem: commonFieldDefine } | undefined =
    inject(SchemaFormContextKey)

  if (!context) {
    throw Error('SchemaForm needed')
  }

  return context
}
