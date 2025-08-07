import React, { Fragment, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import CommonForm from "@/components/common/form";
import { addProductFormElements } from "@/config";
import ProductsImageUpload from "@/components/admin-view/image-upload";

function AdminProducts() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "", // Will be updated after upload
  });

  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    // Just for debug
    console.log("Final Product Data:", formData);

    // 👉 Call your Redux action or API to create the product
    // dispatch(createProduct(formData));
    setOpen(false);
  }

  return (
    <Fragment>
      {/* ➕ Button to open Add Product Sheet */}
      <div className="flex justify-end p-4">
        <Button onClick={() => setOpen(true)}>Add New Product</Button>
      </div>

      {/* 🧾 Slide-in Sheet */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>Add New Product</SheetTitle>
          </SheetHeader>

          {/* 🖼️ Image Upload Section */}
          <ProductsImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setFormData={setFormData} // 🔁 Needed to update formData.image
          />

          {/* 📝 Form Inputs */}
          <div className="py-6">
            <CommonForm
              onSubmit={handleSubmit}
              formData={formData}
              setFormData={setFormData}
              buttonText="Add"
              formControls={addProductFormElements}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default AdminProducts;
