import React, { Fragment, useEffect, useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import CommonForm from "@/components/common/form";
import { addProductFormElements } from "@/config";
import ProductsImageUpload from "@/components/admin-view/image-upload"; // keep only this
import { useDispatch, useSelector } from "react-redux";
import { addNewProduct, editProduct, fetchAllProducts } from "@/store/admin/products-slice";
import { useToast } from "@/components/ui/use-toast";
import AdminProductTile from "@/components/admin-view/product-tile";

const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
  averageReview: 0,
};

function AdminProducts() {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);

  const { productList } = useSelector((state) => state.adminProducts);
  const dispatch = useDispatch();
  const { toast } = useToast();

  // ✅ Submit handler
  function onSubmit(event) {
    event.preventDefault();

    if (imageLoadingState) {
      toast({ title: "Please wait for the image to finish uploading." });
      return;
    }

    if (currentEditedId !== null) {
      // Edit
      dispatch(
        editProduct({
          id: currentEditedId,
          ...formData,
          image: uploadedImageUrl || formData.image,
        })
      ).then((res) => {
        if (res?.payload?.success) {
          dispatch(fetchAllProducts());
          resetForm();
          toast({ title: "Product updated successfully" });
        } else {
          toast({ title: "Failed to update product", variant: "destructive" });
        }
      });
    } else {
      // Add
      dispatch(
        addNewProduct({
          ...formData,
          image: uploadedImageUrl,
        })
      ).then((res) => {
        if (res?.payload?.success) {
          dispatch(fetchAllProducts());
          resetForm();
          toast({ title: "Product added successfully" });
        } else {
          toast({
            title: "Failed to add product",
            description: res?.error?.message || "Please try again.",
            variant: "destructive",
          });
        }
      });
    }
  }

  function resetForm() {
    setImageFile(null);
    setUploadedImageUrl("");
    setFormData(initialFormData);
    setCurrentEditedId(null);
    setOpenCreateProductsDialog(false);
  }

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  console.log(productList, uploadedImageUrl, "productList");

  

  return (
    <Fragment>
      {/* ➕ Button to open Add Product Sheet */}
      <div className="flex justify-end p-4">
        <Button onClick={() => setOpenCreateProductsDialog(true)}>
          Add New Product
          </Button>
      </div>


      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productList && productList.length > 0
          ? productList.map((productItem) => (
              <AdminProductTile
                setFormData={setFormData}
                setOpenCreateProductsDialog={setOpenCreateProductsDialog}
                setCurrentEditedId={setCurrentEditedId}
                product={productItem}
                
              />
            ))
          : null}
      </div>



      {/* 🧾 Slide-in Sheet */}
      <Sheet
  open={openCreateProductsDialog}
  onOpenChange={() => {
    setOpenCreateProductsDialog(false);
    setCurrentEditedId(null);
    setFormData(initialFormData);
  }}
>
  <SheetContent side="right" className="overflow-auto">
  <SheetHeader>
    <SheetTitle>
      {currentEditedId !== null ? 'Edit Product' : 'Add New Product'}
    </SheetTitle>
  </SheetHeader>


          {/* 🖼️ Image Upload Section */}
           <ProductsImageUpload
  imageFile={imageFile}
  setImageFile={setImageFile}
  uploadedImageUrl={uploadedImageUrl}
  setUploadedImageUrl={setUploadedImageUrl}
  setFormData={setFormData}
  setImageLoadingState={setImageLoadingState}
  currentEditedId={currentEditedId}
/>


          {/* 📝 Form Inputs */}
          <div className="py-6">
            <CommonForm
    onSubmit={onSubmit}
    formData={formData}
    setFormData={setFormData}
    buttonText={currentEditedId !== null ? 'Edit' : 'Add'}
    formControls={addProductFormElements}
  />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default AdminProducts;
