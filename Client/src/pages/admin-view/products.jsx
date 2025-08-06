import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Fragment, useState } from "react";
import { addProductFormElements } from "@/config";
import ProductsImageUpload from "@/components/admin-view/image-upload";



const initialFormData = {
    image : null,
    title : '',
    description : '',
    category : '',
    brand : '',
    price : "",
    salePrice : '',
    totalStock : ''
}



function AdminProducts() {

    const [openCreateProductsDialog, setOpenCreateProductsDialog] = useState(false);

    const [formData,setFormData] = useState(initialFormData);
    const [imageFile, setImageFile] = useState(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState('');

    function onSubmit() {


    }

    return (
        <Fragment>
        <div className="mb-3 w-full flex justify-end">
        <Button onClick={()=> setOpenCreateProductsDialog(true)}> Add New Product</Button>

        </div>
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4"></div>
        <Sheet open={openCreateProductsDialog} onOpenChange={setOpenCreateProductsDialog}>
  {/* Optional trigger – or you can just use your custom button */}
  <SheetTrigger asChild>
    
  </SheetTrigger>

  <SheetContent side="right" className="overflow-auto">
    <SheetHeader>
        
      <SheetTitle>Add new Product</SheetTitle>
    </SheetHeader>
    <ProductsImageUpload file={imageFile} setFile={setImageFile} uploadedImageUrl={uploadedImageUrl} setUploadedImageUrl={setUploadedImageUrl}/>
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