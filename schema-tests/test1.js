const Ajv = require('ajv')
const localize = require('ajv-i18n')

const schema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      // test: false,
      // errorMessage: '这是不对的',
      errorMessage: {
        type: '必须是字符串',
        minLength: '长度不能小于10',
      },
      // format: 'test',
      minLength: 10,
    },
    age: {
      type: 'number',
    },
    pets: {
      type: 'array',
      items: {
        type: 'string',
        maxLength: 2,
      },
    },
    isWorker: {
      type: 'boolean',
    },
  },
  required: ['name', 'age'],
}

const ajv = new Ajv({ allErrors: true })
// use format, must need import
// require('ajv-formats')(ajv)
require('ajv-errors')(ajv)

// 自定义规则
// ajv.addFormat('test', (data) => {
//   console.log(data, '----------')
//   return data === 'haha'
// })

// 自定义关键字keyword
ajv.addKeyword({
  keyword: 'test',
  // 1
  // validate: function fun(schema, data) {
  //   // console.log(schema, data)
  //   // if (schema === true) return true
  //   // else return schema.length === 6

  //   // 自定义报错提示 需要使用匿名函数
  //   fun.errors = [
  //     {
  //       instancePath: '/name',
  //       schemaPath: '#/properties/name/test',
  //       keyword: 'test',
  //       params: {},
  //       message: 'hello error message',
  //     },
  //   ]
  //   return false
  // },
  // 2
  // compile: (sch, parentSchema) => {
  //   console.log(sch, parentSchema)
  //   return () => true
  // },
  // metaSchema: {
  //   type: 'boolean',
  // },
  // 3
  macro: (sch, parentSchema) => {
    return {
      minLength: 10,
    }
  },
})

const validate = ajv.compile(schema)
const valid = validate({
  name: '123',
  age: 12,
  pets: ['mimi', 'mama'],
  isWorker: true,
})
if (!valid) {
  // localize.zh(validate.errors)
  console.log(validate.errors)
}
