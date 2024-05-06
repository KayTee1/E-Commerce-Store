import DropZone from "./DropZone";

type ImageSelectorProps = {
  previousData?: {
    image: string;
  };
  preview: null | ArrayBuffer;
  setPreview: React.Dispatch<React.SetStateAction<null | ArrayBuffer>>;
};

const ImageSelector = ({
  previousData,
  preview,
  setPreview,
}: ImageSelectorProps) => {
  return (
    <div>
      <div className="flex flex-col items-center">
        {previousData && !preview && (
          <img
            className="ml-3 w-64 h-auto rounded-lg "
            src={String(previousData.image)}
          />
        )}
        {preview && (
          <img
            className="ml-3 w-64 h-auto rounded-lg "
            src={String(preview)}
          />
        )}
      </div>
      <DropZone setPreview={setPreview} />
    </div>
  );
};

export default ImageSelector;
