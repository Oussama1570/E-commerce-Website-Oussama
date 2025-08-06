import { Label } from "@radix-ui/react-dropdown-menu";

import { useRef } from 'react';
import { Input } from "../ui/input";
import { FileIcon, UploadCloudIcon } from "lucide-react";


function ProductsImageUpload({imageFile, setImageFile, uploadedImageUrl, setUploadedImageUrl}) {

const inputRef = useRef(null);

function handleImageFileChange(event){
    console.log(event.target.files);
    const selectedFile = event.target.files?.[0]
    if(selectedFile) setImageFile(selectedFile)

}

function handleDragOver(event){
      event.preventDefault()
}

function handleDrop(event){
     event.preventDefault()
     const droppedFile = event.dataTransfer.files?.[0];
     if(droppedFile) setImageFile(droppedFile)

}


    return (
        <div className="w-full max-w-md mx-auto mt-4">
      <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
          <div onDragOver={handleDragOver} onDrop={handleDrop} className="border-2 border-dashed rounded-lg p-4">
            <Input id="image-upload" 
            type="file" 
           // className="hidden" 
            ref={inputRef} 
            onChange={handleImageFileChange}
            />

           {!imageFile ? (
  <Label htmlFor="image-upload" className="flex flex-col items-center justify-center border border-dashed border-gray-300 rounded-md p-6 cursor-pointer">
    <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
    <span>Drag & drop or click to upload image</span>
  </Label>
) : (
  <div className="flex items-center justify-between">
    <div className="flex items-center">
      <FileIcon className="w-8 text-primary mr-2 h-8" />
      <span className="text-sm">{imageFile.name}</span>
    </div>
    <button
      onClick={() => setImageFile(null)}
      className="text-red-500 text-sm hover:underline"
    >
      Remove
    </button>
  </div>
)}


         </div>
        </div>
    );

}
export default ProductsImageUpload;