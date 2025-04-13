// import { UploadDropzone } from "@/lib/uploadthing";
import { UploadDropzone } from "@/utils/uploadthing";
import { Pencil } from "lucide-react";
import Image from "next/image";
import React from "react";
import toast from "react-hot-toast";

export default function ImageInput({
  label,
  imageUrl = "",
  setImageUrl,
  className = "col-span-full",
  endpoint = "",
}: {
  label: string;
  imageUrl: string;
  setImageUrl: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  className?: string;
  endpoint: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}) {
  return (
    <div className={className}>
      <div className="flex justify-between items-center mb-4">
        <label
          htmlFor="course-image"
          className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-50 mb-2"
        >
          {label}
        </label>
        {imageUrl && (
          <button
            onClick={() => setImageUrl("")}
            type="button"
            className="flex space-x-2  bg-slate-900 rounded-md shadow text-slate-50  py-2 px-4"
          >
            <Pencil className="w-5 h-5" />
            <span>Change Image</span>
          </button>
        )}
      </div>
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt="Item image"
          width={1000}
          height={667}
          className="w-full h-64 object-contain"
        />
      ) : (
        <UploadDropzone
          endpoint={`${endpoint}` as any} // eslint-disable-line @typescript-eslint/no-explicit-any
          onClientUploadComplete={(res: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
            setImageUrl(res[0].url);
            // Do something with the response
            toast.success("Image Upload complete");
            console.log("Files: ", res);
            console.log("Upload Completed");
          }}
          onUploadError={(error: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
            toast.error("Image Upload Failed, Try Again");
            // Do something with the error.
            console.log(`ERROR! ${error.message}`, error);
          }}
        />
      )}
    </div>
  );
}
