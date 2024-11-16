import { useNavigate } from "react-router-dom";
import { useProductStore } from "../stores/useProductStore";
import { useEffect } from "react";

function ProductsList() {
  const {
    products,
    fetchAllProducts,
    loading,
    toggleFeaturedProduct,
    deleteProduct,
  } = useProductStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);
  const handleEditClick = (id) => {
    navigate(`/dashboard/edit/${id}`);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-700">
        <thead>
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
            >
              Category
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
            >
              In Stock
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
            >
              Featured
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-800 divide-y divide-gray-700">
          {products.map((product) => (
            <tr key={product.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300">
                {product.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                {product.category}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                {product.quantity}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                {product.featured ? "Yes" : "No"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                <button
                  onClick={() => handleEditClick(product._id)}
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  Edit
                </button>
                <button
                  onClick={() => toggleFeaturedProduct(product._id)}
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  Featured
                </button>
                <button
                  onClick={() => deleteProduct(product._id)}
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductsList;
