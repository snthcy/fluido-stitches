import { RichTextComponent } from './rich-text'

interface RichTextFieldPlugin extends CustomField {}

export const RichTextPlugin: RichTextFieldPlugin = {
  __type: 'field',
  Component: RichTextComponent,
  name: 'richtext',
  type: 'object',
}
