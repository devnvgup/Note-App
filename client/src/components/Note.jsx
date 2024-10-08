import React, { useEffect, useMemo, useState } from "react";
import { ContentState, convertFromHTML, EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import { debounce } from "@mui/material";
import { useSubmit, useLocation, useLoaderData } from "react-router-dom";

function Note() {
  const submit = useSubmit();
  const location = useLocation();

  const note = useLoaderData() || {};



  const [editorState, setEditorState] = useState(() => {
    return EditorState.createEmpty();
  });
  const [rawHTML, setRawHTML] = useState(note.content);

  useEffect(() => {
    if (note?.content) {
      const blockFromHTML = convertFromHTML(note.content);
      const state = ContentState.createFromBlockArray(
        blockFromHTML.contentBlocks,
        blockFromHTML.entityMap
      );
      setEditorState(EditorState.createWithContent(state));
    }
  }, [note.id]);

  useEffect(() => {
    debouncedMemorized(rawHTML, note, location.pathname);
  }, [rawHTML, location.pathname]);

  const debouncedMemorized = useMemo(() => {
    return debounce((rawHTML, note, pathName) => {
      if (rawHTML === note.content) return;
      submit(
        { ...note, content: rawHTML },
        {
          method: "post",
          action: pathName,
        }
      );
    }, 1000);
  }, []);

  useEffect(() => {
    setRawHTML(note.content);
  }, [note.content]);

  const handleOnChange = (e) => {
    setEditorState(e);
    setRawHTML(draftToHtml(convertToRaw(e.getCurrentContent())));
  };

  return (
    <Editor
      editorState={editorState}
      onEditorStateChange={handleOnChange}
      placeholder="Write something"
    />
  );
}

export default Note;
