import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { File as FileIcon, UploadCloud as UploadCloudIcon, X as XIcon } from "lucide-react";

function ProductsImageUpload({
  imageFile,
  setImageFile,
  uploadedImageUrl,
  setUploadedImageUrl,
  setFormData,
  setImageLoadingState,   // from parent
  imageLoadingState = false, // from parent
  currentEditedId,        // from parent
}) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const isEditMode = Boolean(currentEditedId);

  async function uploadImageToCloudinary(file) {
    try {
      setUploading(true);
      if (setImageLoadingState) setImageLoadingState(true);

      const data = new FormData();
      data.append("my_file", file);

      const response = await axios.post(
        "http://localhost:5000/api/admin/products/upload-image",
        data
      );

      const url = response?.data?.result?.url;
      if (url) {
        setUploadedImageUrl(url);
        setFormData((prev) => ({ ...prev, image: url }));
      }
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setUploading(false);
      if (setImageLoadingState) setImageLoadingState(false);
    }
  }

  function handleImageFileChange(event) {
    const file = event.target.files?.[0];
    if (file) setImageFile(file);
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDrop(event) {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) setImageFile(file);
  }

  function handleRemoveImage() {
    setImageFile(null);
    setUploadedImageUrl("");
    setFormData((prev) => ({ ...prev, image: "" }));
    if (inputRef.current) inputRef.current.value = "";
  }

  useEffect(() => {
    if (imageFile) uploadImageToCloudinary(imageFile);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageFile]);

  return (
    <div className="w-full mt-4">
      <Label className="text-sm font-medium text-gray-700">Upload Image</Label>

      <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className={`${
        isEditMode ? "opacity-60 cursor-not-allowed" : ""
      } border-2 border-dashed rounded-lg p-4`}
    >
        <input
          id="image-upload"
          className="hidden"
          type="file"
          ref={inputRef}
          onChange={handleImageFileChange}
          disabled={isEditMode}
        />

        {/* Branch 1: No file yet */}
        {!imageFile ? (
          <Label
    htmlFor="image-upload"
    className={`${
      isEditMode ? "cursor-not-allowed opacity-60" : ""
    } flex flex-col items-center justify-center h-32 cursor-pointer border border-dashed rounded-md gap-2`}
  >
            <UploadCloudIcon className="w-10 h-10 text-gray-400 mb-2" />
            <span>Drag & drop or click to upload image</span>
          </Label>
        ) : /* Branch 2: uploading or loading */ uploading || imageLoadingState ? (
          <div className="space-y-2">
            <Skeleton className="h-10 w-full bg-gray-100" />
            <p className="text-sm text-blue-500">Uploading...</p>
          </div>
        ) : (
          /* Branch 3: file chosen and not uploading */
          <div className="flex items-center justify-between">
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

