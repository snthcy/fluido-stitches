declare interface NextStaticResult<
  K extends string | symbol = 'prop',
  T = any,
> {
  //@ts-ignore
  [key: K]: T
}

declare interface CollectionConfig {
  name: string
  label?: string
  fields: CollectionField[]
}

declare interface GenCollectionType<T extends CollectionField[]> {
  id: string
  slug: string
}

// ! Fields

interface GenericField {
  name: string
  label?: string
  description?: string
}

interface TextField extends GenericField {
  component: 'text'
  placeholder?: string
}

interface TextAreaField extends GenericField {
  component: 'textarea'
}

interface NumberField extends GenericField {
  component: 'number'
  step?: string | number
}

interface ImageField extends GenericField {
  component: 'image'
  clearable?: boolean
  parse?: (media: any) => string
  previewSrc?: (formValues: any) => string
  uploadDir?: (formValues: any) => string
}

interface ColorField extends GenericField {
  component: 'color'
  colorFormat?: 'hex' | 'rgb'
  colors?: string[]
  widget?: 'sketch' | 'block'
}

interface ToggleField extends GenericField {
  component: 'toggle'
  toggleLabels?: boolean | { true: string; false: string }
}

interface RadioGroupField extends GenericField {
  component: 'radio-group'
  options: (
    | {
        value: string
        label: string
      }
    | string
  )[]
  direction?: 'horizontal' | 'vertical'
  variant?: 'radio' | 'button'
}

interface SelectField extends GenericField {
  component: 'select'
  options: (
    | {
        value: string
        label: string
      }
    | string
  )[]
}

interface TagsField extends GenericField {
  component: 'tags'
}

interface ListField extends GenericField {
  component: 'list'
  field: TextField | TextAreaField | NumberField | SelectField
  defaultItem?: string | number | (() => string | number)
  itemProps?: (item: object) => {
    key?: string
  }
}

interface GroupField extends GenericField {
  component: 'group'
  fields?: CollectionField[]
}

interface GroupListField extends GenericField {
  component: 'group-list'
  fields?: CollectionField[]
  defaultItem?: object | (() => object)
  itemProps?(item: object): {
    key?: string
    label?: string
  }
}

interface BlocksField extends GenericField {
  component: 'blocks'
  templates: {
    [key: string]: CollectionField
  }
}

interface DateField extends GenericField {
  component: 'date'
  dateFormat?: boolean | string
  timeFormat?: boolean | string
}
interface MarkdownField extends GenericField {
  component: 'markdown'
}
interface HTMLField extends GenericField {
  component: 'html'
}

declare type CollectionField =
  | TextField
  | TextAreaField
  | NumberField
  | ImageField
  | ColorField
  | ToggleField
  | RadioGroupField
  | SelectField
  | TagsField
  | ListField
  | GroupField
  | GroupListField
  | BlocksField
  | DateField
  | MarkdownField
  | HTMLField

declare interface CustomField extends GenericField {
  __type: 'field'
  Component: React.FC<any>
  type?: string
  validate?(
    value: any,
    allValues: any,
    meta: any,
    field: CollectionField,
  ): string | object | undefined
  parse?: (value: any, name: string, field: CollectionField) => any
  format?: (value: any, name: string, field: CollectionField) => any
  defaultValue?: any
}
