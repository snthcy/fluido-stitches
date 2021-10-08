import {
  EditorContent,
  Mark,
  mergeAttributes,
  Node,
  useEditor,
} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React from 'react'
import {
  MdFormatBold,
  MdFormatClear,
  MdFormatItalic,
  MdFormatListBulleted,
  MdFormatListNumbered,
  MdFormatStrikethrough,
  MdFormatQuote,
  MdCode,
  MdTitle,
} from 'react-icons/md'
import { FieldDescription, FieldLabel, Form } from 'tinacms'
import { Button, ButtonsGroup, Input } from './styled'

interface RichTextProps {
  field: RichTextField
  input: any
  form: any
  meta: any
  tinaForm: Form<any, RichTextField>
}

const createCustomMark = (
  name: string,
  tag: string | Node,
  attrs: TypedMap<string>,
) =>
  Mark.create({
    name,
    defaultOptions: {
      HTMLAttributes: attrs,
    },
    renderHTML({ HTMLAttributes }) {
      return [
        tag as any,
        mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
        0,
      ]
    },
  })

const createCustomNode = (
  name: string,
  tag: string | Node,
  attrs: TypedMap<string>,
) =>
  Node.create({
    name,
    defaultOptions: {
      HTMLAttributes: attrs,
    },
    renderHTML({ HTMLAttributes }) {
      return [
        tag as any,
        mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
        0,
      ]
    },
  })

export const RichTextComponent: React.FC<RichTextProps> = ({
  field,
  input,
}) => {
  const editor = useEditor({
    extensions: [StarterKit],
    editable: true,
    content: input.value,
    onUpdate({ editor }) {
      const content = editor.getHTML()
      input.onChange(content)
    },
    onFocus({ event }) {
      input.onFocus(event)
    },
    onBlur({ event }) {
      input.onBlur(event)
    },
  })

  const handleToggleTitle = () => {
    editor.chain().focus().toggleHeading({ level: 2 }).run()
  }
  const handleToggleBold = () => {
    editor.chain().focus().toggleBold().run()
  }
  const handleToggleItalic = () => {
    editor.chain().focus().toggleItalic().run()
  }
  const handleToggleStrike = () => {
    editor.chain().focus().toggleStrike().run()
  }
  const handleToggleUL = () => {
    editor.chain().focus().toggleBulletList().run()
  }
  const handleToggleOL = () => {
    editor.chain().focus().toggleOrderedList().run()
  }
  const handleToggleQuote = () => {
    editor.chain().focus().toggleBlockquote().run()
  }
  const handleToggleCode = () => {
    editor.chain().focus().toggleCodeBlock().run()
  }
  const handleToggleClear = () => {
    editor.chain().focus().clearNodes().unsetAllMarks().run()
  }

  return (
    <div>
      <FieldLabel>{field.label || field.name}</FieldLabel>
      {field.description && (
        <FieldDescription>{field.description}</FieldDescription>
      )}
      <ButtonsGroup>
        <Button
          onClick={handleToggleTitle}
          active={editor?.isActive('heading', { level: 2 })}>
          <MdTitle />
        </Button>
        <Button onClick={handleToggleBold} active={editor?.isActive('bold')}>
          <MdFormatBold />
        </Button>
        <Button
          onClick={handleToggleItalic}
          active={editor?.isActive('italic')}>
          <MdFormatItalic />
        </Button>
        <Button
          onClick={handleToggleStrike}
          active={editor?.isActive('strike')}>
          <MdFormatStrikethrough />
        </Button>
        <Button
          onClick={handleToggleUL}
          active={editor?.isActive('bulletList')}>
          <MdFormatListBulleted />
        </Button>
        <Button
          onClick={handleToggleOL}
          active={editor?.isActive('orderedList')}>
          <MdFormatListNumbered />
        </Button>
        <Button onClick={handleToggleQuote} active={editor?.isActive('quote')}>
          <MdFormatQuote />
        </Button>
        <Button onClick={handleToggleCode} active={editor?.isActive('code')}>
          <MdCode />
        </Button>
        <Button onClick={handleToggleClear}>
          <MdFormatClear />
        </Button>
      </ButtonsGroup>
      <Input as={EditorContent} editor={editor} />
    </div>
  )
}
