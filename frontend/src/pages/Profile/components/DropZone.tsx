import React, { useCallback } from "react";
import imageCompression from "browser-image-compression";
import { useDropzone } from "react-dropzone";

type DropZoneProps = {
  setPreview: React.Dispatch<React.SetStateAction<null | ArrayBuffer>>;
};

const DropZone = ({ setPreview }: DropZoneProps) => {
  const compressImage = async (file: File) => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 400,
      useWebWorker: true,
    };

    try {
      const compressedFile = await imageCompression(file, options);
      return compressedFile;
    } catch (error) {
      throw error;
    }
  };

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles[0] === undefined) return;

      const file = acceptedFiles[0];

      try {
        const compressedFile = await compressImage(file);

        const reader = new FileReader();
        reader.onload = function () {
          setPreview(reader.result as null | ArrayBuffer);
        };
        reader.readAsDataURL(compressedFile);
      } catch (error) {
        console.error("Error handling dropped image:", error);
      }
    },
    [setPreview]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed border-gray-300 rounded-lg p-4 text-center ${
        isDragActive ? "border-blue-500" : ""
      }`}
    >
      <input {...getInputProps()} />
      <p className="text-gray-600">
        {isDragActive
          ? "Drop the files here ..."
          : "Drag 'n' drop an image here, or click to select an image"}
      </p>
    </div>
  );
};

export default DropZone;
