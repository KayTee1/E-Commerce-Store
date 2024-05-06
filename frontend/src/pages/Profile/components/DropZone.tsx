import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

type DropZoneProps = {
  setPreview: React.Dispatch<React.SetStateAction<null | ArrayBuffer >>;
};

const DropZone = ({ setPreview }: DropZoneProps) => {
const onDrop = useCallback((acceptedFiles: File[]) => {
    if(acceptedFiles[0] === undefined) return;

    const file = new FileReader();

    if(!file) return
    file.onload = function () {
        setPreview(file.result as null | ArrayBuffer);
    };

    file.readAsDataURL(acceptedFiles[0]);
}, []);

const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  );
};

export default DropZone;
