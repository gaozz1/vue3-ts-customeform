import { PropType, defineComponent, DefineComponent } from 'vue'
import { FormatDefinition, MacroKeywordDefinition } from 'ajv'
import { ErrorSchema } from './validator'

export enum SchemaTypes {
  'NUMBER' = 'number',
  'INTEGER' = 'integer',
  'STRING' = 'string',
  'OBJECT' = 'object',
  'ARRAY' = 'array',
  'BOOLEAN' = 'boolean',
}

type SchemaRef = { $ref: string }

// type Schema = any
export interface Schema {
  type?: SchemaTypes | string
  const?: any
  format?: string

  title?: string
  default?: any

  properties?: {
    // [key: string]: Schema | { $ref: string }
    [key: string]: Schema
  }
  items?: Schema | Schema[] | SchemaRef
  uniqueItems?: any
  dependencies?: {
    [key: string]: string[] | Schema | SchemaRef
  }
  oneOf?: Schema[]
  anyOf?: Schema[]
  allOf?: Schema[]
  // TODO: uiSchema
  // vjsf?: VueJsonSchemaConfig
  required?: string[]
  enum?: any[]
  enumNames?: any[]
  enumKeyValue?: any[]
  additionalProperties?: any
  additionalItems?: Schema

  minLength?: number
  maxLength?: number
  minimun?: number
  maximum?: number
  multipleOf?: number
  exclusiveMaximum?: number
  exclusiveMinimum?: number
}

export const FiledPropsDefine = {
  schema: {
    type: Object as PropType<Schema>,
    required: true,
  },
  value: {
    required: true,
  },
  onChange: {
    type: Function as PropType<(v: any) => void>,
    required: true,
  },
  rootSchema: {
    type: Object as PropType<Schema>,
    required: true,
  },
  errorSchema: {
    type: Object as PropType<ErrorSchema>,
    required: true,
  },
  uiSchema: {
    type: Object as PropType<UISchema>,
    required: true,
  },
} as const

export const TypeHelperComponent = defineComponent({
  props: FiledPropsDefine,
})

// type SchemaItemDefine = DefineComponent<typeof FiledPropsDefine>
export type commonFieldDefine = typeof TypeHelperComponent

export const CommonWidgetPropsDefine = {
  value: {},
  onChange: {
    type: Function as PropType<(v: any) => void>,
    required: true,
  },
  errors: {
    type: Array as PropType<string[]>,
  },
  schema: {
    type: Object as PropType<Schema>,
    required: true,
  },
  options: {
    type: Object as PropType<{ [keys: string]: any }>,
  },
} as const

export const SelectionWidgetPropsDefine = {
  ...CommonWidgetPropsDefine,
  options: {
    type: Array as PropType<
      {
        key: string
        value: any
      }[]
    >,
    required: true,
  },
} as const

export type CommonWidgetDefine = DefineComponent<
  typeof CommonWidgetPropsDefine,
  any,
  any
>

export type SelectionWidgetDefine = DefineComponent<
  typeof SelectionWidgetPropsDefine,
  any,
  any
>

export enum SelectionWidgetNames {
  SelectionWidget = 'SelectionWidget',
}

export enum CommonWidgetNames {
  TextWidget = 'TextWidget',
  NumberWidget = 'NumberWidget',
}

export interface Theme {
  widgets: {
    [SelectionWidgetNames.SelectionWidget]: SelectionWidgetDefine
    [CommonWidgetNames.TextWidget]: CommonWidgetDefine
    [CommonWidgetNames.NumberWidget]: CommonWidgetDefine
  }
}

export type UISchema = {
  widget?: string | CommonWidgetDefine
  properties?: {
    [key: string]: UISchema
  }
  items?: UISchema | UISchema[]
} & {
  [key: string]: any
}

export interface CustomFormat {
  name: string
  deinition: FormatDefinition<string>
  component: CommonWidgetDefine
}
/**
 * ajv
 * v6.12.0 start
 */
interface ErrorObjects {
  keyword: string
  dataPath: string
  schemaPath: string
  params: ErrorParameters
  // Added to validation errors of propertyNames keyword schema
  propertyName?: string
  // Excluded if messages set to false.
  message?: string
  // These are added with the `verbose` option.
  schema?: any
  parentSchema?: object
  data?: any
}

type ErrorParameters =
  | RefParams
  | LimitParams
  | AdditionalPropertiesParams
  | DependenciesParams
  | FormatParams
  | ComparisonParams
  | MultipleOfParams
  | PatternParams
  | RequiredParams
  | TypeParams
  | UniqueItemsParams
  | CustomParams
  | PatternRequiredParams
  | PropertyNamesParams
  | IfParams
  | SwitchParams
  | NoParams
  | EnumParams

interface RefParams {
  ref: string
}

interface LimitParams {
  limit: number
}

interface AdditionalPropertiesParams {
  additionalProperty: string
}

interface DependenciesParams {
  property: string
  missingProperty: string
  depsCount: number
  deps: string
}

interface FormatParams {
  format: string
}

interface ComparisonParams {
  comparison: string
  limit: number | string
  exclusive: boolean
}

interface MultipleOfParams {
  multipleOf: number
}

interface PatternParams {
  pattern: string
}

interface RequiredParams {
  missingProperty: string
}

interface TypeParams {
  type: string
}

interface UniqueItemsParams {
  i: number
  j: number
}

interface CustomParams {
  keyword: string
}

interface PatternRequiredParams {
  missingPattern: string
}

interface PropertyNamesParams {
  propertyName: string
}

interface IfParams {
  failingKeyword: string
}

interface SwitchParams {
  caseIndex: number
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface NoParams {}

interface EnumParams {
  allowedValues: Array<any>
}

interface ValidateFunctions {
  (
    data: any,
    dataPath?: string,
    parentData?: object | Array<any>,
    parentDataProperty?: string | number,
    rootData?: object | Array<any>,
  ): boolean | PromiseLike<any>
  schema?: object | boolean
  errors?: null | Array<ErrorObjects>
  refs?: object
  refVal?: Array<any>
  root?: ValidateFunctions | object
  $async?: true
  source?: object
}

interface Ajvs {
  /**
   * Validate data using schema
   * Schema will be compiled and cached (using serialized JSON as key, [fast-json-stable-stringify](https://github.com/epoberezkin/fast-json-stable-stringify) is used to serialize by default).
   * @param  {string|object|Boolean} schemaKeyRef key, ref or schema object
   * @param  {Any} data to be validated
   * @return {Boolean} validation result. Errors from the last validation will be available in `ajv.errors` (and also in compiled schema: `schema.errors`).
   */
  validate(
    schemaKeyRef: object | string | boolean,
    data: any,
  ): boolean | PromiseLike<any>
  /**
   * Create validating function for passed schema.
   * @param  {object|Boolean} schema schema object
   * @return {Function} validating function
   */
  compile(schema: object | boolean): ValidateFunctions
  /**
   * Creates validating function for passed schema with asynchronous loading of missing schemas.
   * `loadSchema` option should be a function that accepts schema uri and node-style callback.
   * @this  Ajvs
   * @param {object|Boolean} schema schema object
   * @param {Boolean} meta optional true to compile meta-schema; this parameter can be skipped
   * @param {Function} callback optional node-style callback, it is always called with 2 parameters: error (or null) and validating function.
   * @return {PromiseLike<ValidateFunctions>} validating function
   */
  compileAsync(
    schema: object | boolean,
    meta?: boolean,
    callback?: (err: Error, validate: ValidateFunctions) => any,
  ): PromiseLike<ValidateFunctions>
  /**
   * Adds schema to the instance.
   * @param {object|Array} schema schema or array of schemas. If array is passed, `key` and other parameters will be ignored.
   * @param {string} key Optional schema key. Can be passed to `validate` method instead of schema object or id/ref. One schema per instance can have empty `id` and `key`.
   * @return {Ajvs} this for method chaining
   */
  addSchema(schema: Array<object> | object, key?: string): Ajvs
  /**
   * Add schema that will be used to validate other schemas
   * options in META_IGNORE_OPTIONS are alway set to false
   * @param {object} schema schema object
   * @param {string} key optional schema key
   * @return {Ajvs} this for method chaining
   */
  addMetaSchema(schema: object, key?: string): Ajvs
  /**
   * Validate schema
   * @param {object|Boolean} schema schema to validate
   * @return {Boolean} true if schema is valid
   */
  validateSchema(schema: object | boolean): boolean
  /**
   * Get compiled schema from the instance by `key` or `ref`.
   * @param  {string} keyRef `key` that was passed to `addSchema` or full schema reference (`schema.id` or resolved id).
   * @return {Function} schema validating function (with property `schema`). Returns undefined if keyRef can't be resolved to an existing schema.
   */
  getSchema(keyRef: string): ValidateFunctions | undefined
  /**
   * Remove cached schema(s).
   * If no parameter is passed all schemas but meta-schemas are removed.
   * If RegExp is passed all schemas with key/id matching pattern but meta-schemas are removed.
   * Even if schema is referenced by other schemas it still can be removed as other schemas have local references.
   * @param  {string|object|RegExp|Boolean} schemaKeyRef key, ref, pattern to match key/ref or schema object
   * @return {Ajvs} this for method chaining
   */
  removeSchema(schemaKeyRef?: object | string | RegExp | boolean): Ajvs
  /**
   * Add custom format
   * @param {string} name format name
   * @param {string|RegExp|Function} format string is converted to RegExp; function should return boolean (true when valid)
   * @return {Ajvs} this for method chaining
   */
  addFormat(name: string, format: FormatValidators | FormatDefinitions): Ajvs
  /**
   * Define custom keyword
   * @this  Ajvs
   * @param {string} keyword custom keyword, should be a valid identifier, should be different from all standard, custom and macro keywords.
   * @param {object} definition keyword definition object with properties `type` (type(s) which the keyword applies to), `validate` or `compile`.
   * @return {Ajvs} this for method chaining
   */
  addKeyword(keyword: string, definition: KeywordDefinitions): Ajvs
  /**
   * Get keyword definition
   * @this  Ajvs
   * @param {string} keyword pre-defined or custom keyword.
   * @return {object|Boolean} custom keyword definition, `true` if it is a predefined keyword, `false` otherwise.
   */
  getKeyword(keyword: string): object | boolean
  /**
   * Remove keyword
   * @this  Ajvs
   * @param {string} keyword pre-defined or custom keyword.
   * @return {Ajvs} this for method chaining
   */
  removeKeyword(keyword: string): Ajvs
  /**
   * Validate keyword
   * @this  Ajvs
   * @param {object} definition keyword definition object
   * @param {boolean} throwError true to throw exception if definition is invalid
   * @return {boolean} validation result
   */
  validateKeyword(definition: KeywordDefinitions, throwError: boolean): boolean
  /**
   * Convert array of error message objects to string
   * @param  {Array<object>} errors optional array of validation errors, if not passed errors from the instance are used.
   * @param  {object} options optional options with properties `separator` and `dataVar`.
   * @return {string} human readable string with all errors descriptions
   */
  errorsText(
    errors?: Array<ErrorObjects> | null,
    options?: ErrorsTextOptions,
  ): string
  errors?: Array<ErrorObjects> | null
}

interface ErrorsTextOptions {
  separator?: string
  dataVar?: string
}

type FormatValidators =
  | string
  | RegExp
  | ((data: string) => boolean | PromiseLike<any>)
type NumberFormatValidator = (data: number) => boolean | PromiseLike<any>

interface NumberFormatDefinitions {
  type: 'number'
  validate: NumberFormatValidator
  compare?: (data1: number, data2: number) => number
  async?: boolean
}

interface StringFormatDefinitions {
  type?: 'string'
  validate: FormatValidators
  compare?: (data1: string, data2: string) => number
  async?: boolean
}

type FormatDefinitions = NumberFormatDefinitions | StringFormatDefinitions

interface Option {
  $data?: boolean
  allErrors?: boolean
  verbose?: boolean
  jsonPointers?: boolean
  uniqueItems?: boolean
  unicode?: boolean
  format?: false | string
  formats?: object
  keywords?: object
  unknownFormats?: true | string[] | 'ignore'
  schemas?: Array<object> | object
  schemaId?: '$id' | 'id' | 'auto'
  missingRefs?: true | 'ignore' | 'fail'
  extendRefs?: true | 'ignore' | 'fail'
  loadSchema?: (
    uri: string,
    cb?: (err: Error, schema: object) => void,
  ) => PromiseLike<object | boolean>
  removeAdditional?: boolean | 'all' | 'failing'
  useDefaults?: boolean | 'empty' | 'shared'
  coerceTypes?: boolean | 'array'
  strictDefaults?: boolean | 'log'
  strictKeywords?: boolean | 'log'
  async?: boolean | string
  transpile?: string | ((code: string) => string)
  meta?: boolean | object
  validateSchema?: boolean | 'log'
  addUsedSchema?: boolean
  inlineRefs?: boolean | number
  passContext?: boolean
  loopRequired?: number
  ownProperties?: boolean
  multipleOfPrecision?: boolean | number
  errorDataPath?: string
  messages?: boolean
  sourceCode?: boolean
  processCode?: (code: string) => string
  cache?: object
  logger?: CustomLoggers | false
  nullable?: boolean
  serialize?: ((schema: object | boolean) => any) | false
}

interface CustomLoggers {
  log(...args: any[]): any
  warn(...args: any[]): any
  error(...args: any[]): any
}

interface SchemaValidateFunctions {
  (
    schema: any,
    data: any,
    parentSchema?: object,
    dataPath?: string,
    parentData?: object | Array<any>,
    parentDataProperty?: string | number,
    rootData?: object | Array<any>,
  ): boolean | PromiseLike<any>
  errors?: Array<ErrorObjects>
}

interface KeywordDefinitions {
  type?: string | Array<string>
  async?: boolean
  $data?: boolean
  errors?: boolean | string
  metaSchema?: object
  // schema: false makes validate not to expect schema (ValidateFunctions)
  schema?: boolean
  statements?: boolean
  dependencies?: Array<string>
  modifying?: boolean
  valid?: boolean
  // one and only one of the following properties should be present
  validate?: SchemaValidateFunctions | ValidateFunctions
  compile?: (
    schema: any,
    parentSchema: object,
    it: CompilationContexts,
  ) => ValidateFunctions
  macro?: (
    schema: any,
    parentSchema: object,
    it: CompilationContexts,
  ) => object | boolean
  inline?: (
    it: CompilationContexts,
    keyword: string,
    schema: any,
    parentSchema: object,
  ) => string
}

interface CompilationContexts {
  level: number
  dataLevel: number
  dataPathArr: string[]
  schema: any
  schemaPath: string
  baseId: string
  async: boolean
  opts: Option
  formats: {
    [index: string]: FormatDefinitions | undefined
  }
  keywords: {
    [index: string]: KeywordDefinitions | undefined
  }
  compositeRule: boolean
  validate: (schema: object) => boolean
  util: {
    copy(obj: any, target?: any): any
    toHash(source: string[]): { [index: string]: true | undefined }
    equal(obj: any, target: any): boolean
    getProperty(str: string): string
    schemaHasRules(schema: object, rules: any): string
    escapeQuotes(str: string): string
    toQuotedString(str: string): string
    getData(jsonPointer: string, dataLevel: number, paths: string[]): string
    escapeJsonPointer(str: string): string
    unescapeJsonPointer(str: string): string
    escapeFragment(str: string): string
    unescapeFragment(str: string): string
  }
  self: Ajvs
}
/**
 * v6.12.0 end
 */

interface VjsfKeywordDefinition {
  type?: string | Array<string>
  async?: boolean
  $data?: boolean
  errors?: boolean | string
  metaSchema?: object
  schema?: boolean
  statement?: boolean
  dependencies?: Array<string>
  modifying?: boolean
  valid?: boolean
  macros?: (
    schema: any,
    parentSchema: object,
    it: CompilationContexts,
  ) => object
}

export interface CustomKeyword {
  name: string
  deinition: VjsfKeywordDefinition
  transformSchema: (originSchema: Schema) => Schema
}
