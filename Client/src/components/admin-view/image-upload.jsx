import { useRef, useState, useEffect } from "react";
import { Input } from "../ui/input";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import axios from "axios";

function ProductsImageUpload({
  imageFile,
  setImageFile,
  uploadedImageUrl,
  setUploadedImageUrl,
  setFormData,
}) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [imageLoadingState, setImageLoadingState] = useState(false);

  async function uploadImageToCloudinary(file) {
    try {
      setImageLoadingState(true);
      const data = new FormData();
      data.append("my_file", file);

      const response = await axios.post(
        "http://localhost:5000/api/admin/products/upload-image",
        data
      );

      console.log(response, "response");

      if (response?.data?.result?.url) {
        const imageUrl = response.data.result.url;
        setUploadedImageUrl(imageUrl);
        setFormData((prev) => ({ ...prev, image: imageUrl }));
      }
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setImageLoadingState(false);
    }
  }

  function handleImageFileChange(event) {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setImageFile(selectedFile);
    }
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDrop(event) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) {
      setImageFile(droppedFile);
    }
  }

  function handleRemoveImage() {
    setImageFile(null);
    setUploadedImageUrl("");
    setFormData((prev) => ({ ...prev, image: "" }));
    if (inputRef.current) inputRef.current.value = "";
  }

  useEffect(() => {
    if (imageFile !== null) {
      uploadImageToCloudinary(imageFile);
    }
  }, [imageFile]);

  return (
    <div className="w-full mt-4">
      <Label className="text-sm font-medium text-gray-700">
        Upload Image
      </Label>

      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="border-2 border-dashed rounded-md p-4 mt-2"
      >
        <input
          id="image-upload"
          type="file"
          ref={inputRef}
          className="hidden"
          onChange={handleImageFileChange}
        />

        {!imageFile && !uploading ? (
          <Label
            htmlFor="image-upload"
            className="flex flex-col items-center justify-center p-6 cursor-pointer border border-dashed rounded-md text-sm text-gray-500 hover:bg-gray-50"
          >
            <UploadCloudIcon className="w-10 h-10 text-gray-400 mb-2" />
            <span>Drag & drop or click to upload image</span>
          </Label>
        ) : uploading || imageLoadingState ? (
          <p className="text-sm text-blue-500">Uploading...</p>
        ) : (
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-2">
              <FileIcon className="w-6 h-6 text-blue-600" />
              <p className="text-sm font-medium">{imageFile?.name}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-red-500"
              onClick={handleRemoveImage}
            >
              <XIcon className="w-4 h-4" />
              <span className="sr-only">Remove File</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductsImageUpload;
