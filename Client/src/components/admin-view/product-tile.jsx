import { Button } from "@/components/ui/button";

function AdminProductTile({ product }) {
  return (
    <div className="border rounded-lg shadow-sm overflow-hidden">
      {/* Product Image */}
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-48 object-cover"
      />

      {/* Product Details */}
      <div className="p-4">
        <h3 className="text-lg font-medium">{product.title}</h3>

        {/* Price */}
        <div className="mt-2 text-sm font-semibold">
          {product.salePrice ? (
            <>
              <span className="line-through mr-2">${product.price}</span>
              <span>${product.salePrice}</span>
            </>
          ) : (
            <span>${product.price}</span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-4">
          <Button variant="outline" size="sm">
            Edit
          </Button>
          <Button variant="destructive" size="sm">
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AdminProductTile;
