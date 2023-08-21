import { PropType, defineComponent } from 'vue'
import { createUseStyles } from 'vue-jss'

import { FiledPropsDefine, Schema, SelectionWidgetNames } from '../types'
import { useVJSFContext } from '../context'

// import SelectionWidget from '../widgets/Selection'

// import { options } from 'json-schema-merge-allof'

import { getWidget } from '../theme'

const useStyles = createUseStyles({
  container: {
    border: '1px solid #000',
  },
  actions: {
    background: '#eee',
    padding: 10,
    textAlign: 'right',
  },
  action: {
    '& + &': {
      marginLeft: 10,
    },
  },
  content: {
    padding: 10,
  },
})

const ArrayItemWrapper = defineComponent({
  name: 'ArrayItemWrapper',
  props: {
    onAdd: {
      type: Function as PropType<(index: number) => void>,
      required: true,
    },
    onDelete: {
      type: Function as PropType<(index: number) => void>,
      required: true,
    },
    onMoveUp: {
      type: Function as PropType<(index: number) => void>,
      required: true,
    },
    onMoveDown: {
      type: Function as PropType<(index: number) => void>,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  setup(props, { slots }) {
    const classesRef = useStyles()

    const handleAdd = () => props.onAdd(props.index)
    const handleDelete = () => props.onDelete(props.index)
    const handleMoveUp = () => props.onMoveUp(props.index)
    const handleMoveDown = () => props.onMoveDown(props.index)

    return () => {
      const classes = classesRef.value

      return (
        <div class={classes.container}>
          <div class={classes.actions}>
            <button class={classes.action} onClick={handleAdd}>
              Add
            </button>
            <button class={classes.action} onClick={handleDelete}>
              Delete
            </button>
            <button class={classes.action} onClick={handleMoveUp}>
              Move Up
            </button>
            <button class={classes.action} onClick={handleMoveDown}>
              Move Down
            </button>
          </div>
          <div class={classes.content}>{slots.default && slots.default()}</div>
        </div>
      )
    }
  },
})

/**
 * {
 *  items: {type: string}
 * }
 * {
 *  items: [
 *    {type: string},
 *    {type: number}
 *  ]
 * }
 * {
 *  item: {type: string, enum: ['1', '2']}
 * }
 */

export default defineComponent({
  name: 'arrayField',
  props: FiledPropsDefine,
  setup(props) {
    const context = useVJSFContext()

    const handleArrayItemChange = (v: any, index: number) => {
      const { value } = props
      const arr = Array.isArray(value) ? value : []

      arr[index] = v

      props.onChange(arr)
    }

    const handleAdd = (index: number) => {
      const { value } = props
      const arr = Array.isArray(value) ? value : []

      arr.splice(index + 1, 0, undefined)

      props.onChange(arr)
    }

    const handleDelete = (index: number) => {
      const { value } = props
      const arr = Array.isArray(value) ? value : []

      arr.splice(index, 1)

      props.onChange(arr)
    }

    const handleMoveUp = (index: number) => {
      if (index === 0) return

      const { value } = props
      const arr = Array.isArray(value) ? value : []

      const item = arr.splice(index, 1)
      arr.splice(index - 1, 0, item[0])

      props.onChange(arr)
    }

    const handleMoveDown = (index: number) => {
      const { value } = props
      const arr = Array.isArray(value) ? value : []

      if (index === arr.length - 1) return

      const item = arr.splice(index, 1)
      arr.splice(index + 1, 0, item[0])

      props.onChange(arr)
    }

    const SelectionWidgetRef = getWidget(SelectionWidgetNames.SelectionWidget)

    return () => {
      const { schema, rootSchema, value, errorSchema, uiSchema } = props

      const SchemaItem = context.SchemaItem
      const SelectionWidget = SelectionWidgetRef.value

      const isMultiType = Array.isArray(schema.items)
      const isSelect = schema.items && (schema.items as any).enum

      if (isMultiType) {
        const items: Schema[] = schema.items as any
        const arr = Array.isArray(value) ? value : []
        return items.map((s: Schema, index: number) => {
          const itemsUiSchema = uiSchema.items
          const uis = Array.isArray(itemsUiSchema)
            ? itemsUiSchema[index] || {}
            : itemsUiSchema || {}
          return (
            <SchemaItem
              schema={s}
              key={index}
              rootSchema={rootSchema}
              value={arr[index]}
              uiSchema={uis}
              errorSchema={errorSchema[index] || {}}
              onChange={(v: any) => handleArrayItemChange(v, index)}
            />
          )
        })
      } else if (!isSelect) {
        const arr = Array.isArray(value) ? value : []

        return arr.map((v: any, index: number) => {
          return (
            <ArrayItemWrapper
              index={index}
              onAdd={handleAdd}
              onDelete={handleDelete}
              onMoveUp={handleMoveUp}
              onMoveDown={handleMoveDown}
            >
              <SchemaItem
                schema={schema.items as Schema}
                value={v}
                key={index}
                rootSchema={rootSchema}
                uiSchema={(uiSchema.items as any) || {}}
                errorSchema={errorSchema[index] || {}}
                onChange={(v: any) => handleArrayItemChange(v, index)}
              />
            </ArrayItemWrapper>
          )
        })
      } else {
        const enumOptions = (schema as any).items.enum
        const options = enumOptions.map((e: any) => ({
          key: e,
          value: e,
        }))
        return (
          <SelectionWidget
            onChange={props.onChange}
            value={props.value}
            options={options}
            schema={schema}
            errors={errorSchema.__errors}
          />
        )
      }
    }
  },
})
