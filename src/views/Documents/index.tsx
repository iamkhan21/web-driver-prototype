import React, { ChangeEvent, useRef, useState } from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

const Documents = () => {
  const fileInput = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);

  function openFileSelector() {
    fileInput.current?.click();
  }

  function onFileSelect(e: ChangeEvent<HTMLInputElement>) {
    const file = (e.currentTarget?.files || [])[0];

    if (file) {
      setFile(file);
    } else {
      setFile(null);
    }
  }

  return (
    <article className="content">
      <h3>Documents Uploader</h3>

      {file && (
        <section>
          <p>{file?.name}</p>
        </section>
      )}
      <section className="mt-auto sticky bottom-5 flex justify-end">
        <Fab
          color="primary"
          aria-label="Select document"
          onClick={openFileSelector}
          title="Select document"
        >
          <AddIcon />
        </Fab>
      </section>

      <section className="hidden">
        <input
          ref={fileInput}
          onChange={onFileSelect}
          type="file"
          accept="application/pdf,application/vnd.ms-excel"
        />
      </section>
    </article>
  );
};

export default Documents;
