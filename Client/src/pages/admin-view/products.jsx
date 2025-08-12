import React, { Fragment, useEffect, useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import CommonForm from "@/components/common/form";
import { addProductFormElements } from "@/config";
import ProductsImageUpload from "@/components/admin-view/image-upload";
import { useDispatch, useSelector } from "react-redux";
import { addNewProduct, deleteProduct, editProduct, fetchAllProducts } from "@/store/admin/products-slice";
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

  const requiredKeys = ["title", "description", "category", "brand", "price", "totalStock", "image"];

  // 🔹 Edit Product
  function handleEditProduct(product) {
    setOpenCreateProductsDialog(true);
    setCurrentEditedId(product?._id);
    setFormData({
      image: product?.image || null,
      title: product?.title || "",
      description: product?.description || "",
      category: product?.category || "",
      brand: product?.brand || "",
      price: product?.price ?? "",
      salePrice: product?.salePrice ?? "",
      totalStock: product?.totalStock ?? "",
      averageReview: product?.averageReview ?? 0,
    });
    setUploadedImageUrl(product?.image || "");
  }

  // 🔹 Add / Edit Submit
  function onSubmit(e) {
    e.preventDefault();

    if (imageLoadingState) {
      toast({ title: "Please wait until the image is uploaded" });
      return;
    }

    if (currentEditedId !== null) {
      dispatch(
        editProduct({
          id: currentEditedId,
          formData: { ...formData, image: uploadedImageUrl || formData.image },
        })
      ).then((res) => {
        if (res?.payload?.success) {
          toast({ title: "Product updated successfully" }); // ✅ Like video
          dispatch(fetchAllProducts());
          resetForm();
        } else {
          toast({
            title: "Failed to update product",
            variant: "destructive",
          });
        }
      });
      return;
    }

    dispatch(addNewProduct({ ...formData, image: uploadedImageUrl })).then((res) => {
      if (res?.payload?.success) {
        toast({ title: "Product added successfully" }); // ✅ Like video
        dispatch(fetchAllProducts());
        resetForm();
      } else {
        toast({
          title: "Failed to add product",
          variant: "destructive",
        });
      }
    });
  }

  // 🔹 Delete Product
  function handleDelete(id) {
    dispatch(deleteProduct(id)).then((res) => {
      if (res?.payload?.success) {
        toast({ title: "Product deleted successfully" }); // ✅ Like video
        dispatch(fetchAllProducts());
      } else {
        toast({
          title: "Failed to delete product",
          variant: "destructive",
        });
      }
    });
  }

  function isFormValid() {
    return Object.keys(formData).map((key) => formData[key] !== "").every((item) => item);
  }

  function resetForm() {
    setOpenCreateProductsDialog(false);
    setCurrentEditedId(null);
    setFormData(initialFormData);
    setUploadedImageUrl("");
    setImageFile(null);
  }

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <Fragment>
      {/* ➕ Button to open Add Product Sheet */}
      <div className="flex justify-end p-4">
        <Button onClick={() => setOpenCreateProductsDialog(true)}>
          Add New Product
          </Button>
      </div>

 
<div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
  {productList?.length
    ? productList.map((productItem) => (
        <AdminProductTile
          key={productItem._id}                 // ✅ add key
          product={productItem}
          handleEdit={handleEditProduct}        // ✅ pass the edit handler
          handleDelete={handleDelete}           // ✅ already correct
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
  isEditMode={currentEditedId !== null}
/>


          {/* 📝 Form Inputs */}
          <div className="py-6">
            <CommonForm
  onSubmit={onSubmit}
  formData={formData}
  setFormData={setFormData}
  buttonText={currentEditedId !== null ? "Edit" : "Add"}
  formControls={addProductFormElements}
  isBtnDisabled={!isFormValid() || imageLoadingState}   // ✅ pass it here
/>
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default AdminProducts;
