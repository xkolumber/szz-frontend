import {
  BubbleMenu,
  EditorContent,
  FloatingMenu,
  useEditor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";
import { MenuBar } from "./MenuBar";

interface Props {
  content: string;
  onChange: (newContent: string) => void;
}

const Tiptap = ({ content, onChange }: Props) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    return () => editor?.destroy();
  }, [editor]);

  return (
    <>
      <MenuBar editor={editor} />
      <EditorContent
        editor={editor}
        style={{ border: "1px solid #ddd", padding: "10px" }}
      />

      {editor && (
        <FloatingMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <button onClick={() => editor.chain().focus().toggleBold().run()}>
            Bold
          </button>
        </FloatingMenu>
      )}
      {editor && (
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <button onClick={() => editor.chain().focus().toggleItalic().run()}>
            Italic
          </button>
        </BubbleMenu>
      )}
    </>
  );
};

export default Tiptap;
