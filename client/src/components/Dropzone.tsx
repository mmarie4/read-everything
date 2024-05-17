import { FC } from "react";
import { useDropzone } from "react-dropzone";
import t from "../translations/i18n";

export interface DropzoneProps {
    onDrop: (acceptedFiles: File[]) => void;
}

export const Dropzone: FC<DropzoneProps> = (props: DropzoneProps) => {
  const { getRootProps, getInputProps } = useDropzone({onDrop: props.onDrop});
  return (
    <div {...getRootProps({ className: "border border-dashed bg-white text-tertiary p-12" })}>
      <input className="input-zone" {...getInputProps()} />
      <div className="text-center">
        <p className="dropzone-content">
          {t("dragndrop")}
        </p>
      </div>
    </div>
  );
}