# vue3-json-schema-form

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Run your unit tests

```
yarn test:unit
```

### Lints and fixes files

```
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### 组件库开发模块

1. Props 接口
   schema
   value
   locale
   onChange
   uiSchema
   。。。

### API 设计
![Coverage](https://img.shields.io/codecov/Jokcy/vjsf-imooc/branch/11-4)

`jsx
<JsonSchemaForm
    schema={schema}
    value={value}
    onChange={onChange}
    locale={locale}
    contextRef={someRef}
    uiSchema={uiSchema}
/>

### schema

json schema 对象，用来定义数据，同时也是我们定义表单的依据

### value

表单的数据结果，你可以从外部改变这个 value，在表单被编辑的时候，会通过`onChange`透出 value

需要注意的是，因为 vue 使用的是可变数据，如果每次数据改变我们都去改变`value`的对象地址。那么会导致整个表单都需要重新渲染，这回导致性能降低。
从实践来看，我们传入的对象，在内部修改其 filed 的值基本不睡有什么副作用，所以我们会使用这种方式来进行实现。也就是说，如果`value`是一个对象
那么从`JsonSchemaForm`内部修改的值，并不会改变`value`对象本身。我们仍然会触发`onChange`，因为可能在表单变化之后，使用者需要进行一些操作。

### onChange

在表单值有任何变化的时候都会触发该回调方法，并把新的值进行返回

### locale

语言，使用`ajv-i18n`指定错误信息使用的语言

### contextRef

你需要传入一个 vue3 的 `Ref`对象，我们会在这个对象上挂载`doValidate`方法，你可以通过

```ts
const yourRef = ref({})

onMounted(() => {
  yourRef.value.doValidate()
})
;<JsonSchemaForm contextRef={yourRef} />
```

这样来主动让表单进行校验。

### uiSchema

对表单的展现进行一些定制，其类型如下：

```ts
export interface VueJsonSchemaConfig {
   title?: string,
   description?: string,
   component?: default,
   additionProps?: {
      [key: string]: any
   },
   withFormItem?: boolean,
   widget?: 'checkbox' | 'textarea' | 'select' | 'radio' | string,
   items：UISchema | UISchema[]
}
export interface UISchema extends VueJsonSchemaConfig {
   properties?: {
      [property: string]: UISchema
   }
}
```
