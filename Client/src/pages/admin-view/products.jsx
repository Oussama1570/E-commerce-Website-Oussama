import React, { Fragment, useEffect, useState } from "react";
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
import { useDispatch, useSelector } from 'react-redux';
import { addNewProduct, fetchAllProducts } from "@/store/admin/products-slice";
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
  const [openCreateProductsDialog, setOpenCreateProductsDialog] =
    useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const {productList} = useSelector(state=>state.adminProducts)
  const dispatch = useDispatch();
  const {toast} = useToast()

  function onSubmit(e) {
  e.preventDefault();

  if (imageLoadingState) {
    toast({ title: "Please wait for the image to finish uploading." });
    return;
  }

  dispatch(addNewProduct({ ...formData, image: uploadedImageUrl }))
    .then((res) => {
      if (res?.payload?.success) {
        dispatch(fetchAllProducts());
        setImageFile(null);
        setUploadedImageUrl("");
        setFormData(initialFormData);
        setOpenCreateProductsDialog(false);
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
  {productList && productList.length > 0 ? (
    productList.map((p) => <AdminProductTile key={p._id} product={p} />)
  ) : (
    <p className="col-span-full text-sm text-muted-foreground">No products found.</p>
  )}
</div>


      {/* 🧾 Slide-in Sheet */}
      <Sheet open={openCreateProductsDialog} onOpenChange={setOpenCreateProductsDialog}>
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
            setFormData={setFormData}
            setImageLoadingState={setImageLoadingState}
          />

          {/* 📝 Form Inputs */}
          <div className="py-6">
            <CommonForm
              onSubmit={onSubmit}
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
