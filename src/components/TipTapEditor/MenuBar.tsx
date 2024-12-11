import { Editor } from "@tiptap/react";
import { useCallback } from "react";

interface MenuBarProps {
  editor: Editor | null;
}

export const MenuBar = ({ editor }: MenuBarProps) => {
  if (!editor) {
    return null;
  }

  const addImage = useCallback(() => {
    const url = window.prompt("URL");

    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    if (url === null) {
      return;
    }
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  return (
    <div className="control-group">
      <div className="button-group">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "is-active" : ""}
        >
          Bold
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "is-active" : ""}
        >
          Italic
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? "is-active" : ""}
        >
          Strike
        </button>

        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editor.isActive("paragraph") ? "is-active" : ""}
        >
          p
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor.isActive("heading", { level: 1 }) ? "is-active" : ""
          }
        >
          H1
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive("heading", { level: 2 }) ? "is-active" : ""
          }
        >
          H2
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor.isActive("heading", { level: 3 }) ? "is-active" : ""
          }
        >
          H3
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          className={
            editor.isActive("heading", { level: 4 }) ? "is-active" : ""
          }
        >
          H4
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 5 }).run()
          }
          className={
            editor.isActive("heading", { level: 5 }) ? "is-active" : ""
          }
        >
          H5
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 6 }).run()
          }
          className={
            editor.isActive("heading", { level: 6 }) ? "is-active" : ""
          }
        >
          H6
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "is-active" : ""}
        >
          list
        </button>

        <button onClick={() => editor.chain().focus().setHardBreak().run()}>
          Zalomenie riadku
        </button>

        <button
          onClick={setLink}
          className={editor.isActive("link") ? "is-active" : ""}
        >
          Pridať link
        </button>
        <button
          onClick={() => editor.chain().focus().unsetLink().run()}
          disabled={!editor.isActive("link")}
        >
          Zrušiť link
        </button>
        <button onClick={addImage}>Pridať obrázok</button>
        <input
          type="color"
          onInput={(event) =>
            editor
              .chain()
              .focus()
              .setColor((event.target as HTMLInputElement).value)
              .run()
          }
          value={editor.getAttributes("textStyle").color || "#000000"}
          data-testid="setColor"
        />

        <button
          onClick={() =>
            editor
              .chain()
              .focus()
              .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
              .run()
          }
        >
          Pridať tabuľku
        </button>
        <button onClick={() => editor.chain().focus().addColumnBefore().run()}>
          Pridať stĺpec pred
        </button>
        <button onClick={() => editor.chain().focus().addColumnAfter().run()}>
          Pridať stĺpec za
        </button>
        <button onClick={() => editor.chain().focus().deleteColumn().run()}>
          Odstrániť stĺpec
        </button>
        <button onClick={() => editor.chain().focus().addRowBefore().run()}>
          Pridať riadok pred
        </button>
        <button onClick={() => editor.chain().focus().addRowAfter().run()}>
          Pridať riadok za
        </button>
        <button onClick={() => editor.chain().focus().deleteRow().run()}>
          Odstrániť riadok
        </button>
        <button onClick={() => editor.chain().focus().deleteTable().run()}>
          Odstrániť tabuľku
        </button>
        <button
          onClick={() => editor.chain().focus().setFontFamily("Inter").run()}
          className={
            editor.isActive("textStyle", { fontFamily: "Inter" })
              ? "is-active"
              : ""
          }
          data-test-id="inter"
        >
          Inter
        </button>
        <button
          onClick={() => editor.chain().focus().setFontFamily("Arial").run()}
          className={
            editor.isActive("textStyle", { fontFamily: "Arial" })
              ? "is-active"
              : ""
          }
          data-test-id="arial"
        >
          Arial
        </button>
        <button
          onClick={() => editor.chain().focus().unsetFontFamily().run()}
          data-test-id="unsetFontFamily"
        >
          Zrušiť font
        </button>
      </div>
    </div>
  );
};
