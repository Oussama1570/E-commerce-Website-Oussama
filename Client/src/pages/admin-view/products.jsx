import { Button } from "@/components/ui/button";
import { Fragment } from "react";


function AdminProducts() {
    return (
        <Fragment>
        <div className="mb-3 w-full flex justify-end">admin products
        <button> Add New Product</button>

        </div>
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4"></div>
        </Fragment>
    );
}

export default AdminProducts;