import { CustomKeyword } from '../../lib/types'

const keyword: CustomKeyword = {
  name: 'test',
  deinition: {
    macros: () => {
      return {
        minLength: 10,
      }
    },
  },
  transformSchema(schema) {
    return {
      ...schema,
      minLength: 10,
    }
  },
}

export default keyword
