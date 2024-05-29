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
        
        <div className="flex p-2 h-32 mt-8 justify-center">
          {props.imgUrl && <img className="mr-2" src={props.imgUrl} alt="Selected" />}
        </div>
        <div className="flex justify-center">
          {props.filename && <p className="text-tertiarydark text-xs flex items-center" >{props.filename}</p>}

        </div>

      </div>
    </div>
  );
}