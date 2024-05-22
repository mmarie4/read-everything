import { FC } from "react";
import { useDropzone } from "react-dropzone";
import t from "../translations/i18n";

export interface DropzoneProps {
    onDrop: (acceptedFiles: File[]) => void;
    imgUrl?: string;
    filename?: string;
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
        
        <div className="flex p-2 h-12 mt-4">
          {props.imgUrl && <img className="mr-2" src={props.imgUrl} alt="Selected" />}
          {props.filename && <p className="text-tertiarydark" >{props.filename}</p>}
        </div>

      </div>
    </div>
  );
}