import { FC } from "react";
import { useDropzone } from "react-dropzone";
import t from "../translations/i18n";

export interface DropzoneProps {
    onDrop: (acceptedFiles: File[]) => void;
}

export const Dropzone: FC<DropzoneProps> = (props: DropzoneProps) => {
  const { getRootProps, getInputProps } = useDropzone({onDrop: props.onDrop});
  return (
    <div {...getRootProps({ className: "border border-2 rounded border-dashed border-tertiarydark text-tertiarydark bg-tertiary p-12" })}>
      <input className="" {...getInputProps()} />
      <div className="text-center">
        <p className="font-normal text-xs">
          {t("dragndrop")}
        </p>
      </div>
    </div>
  );
}