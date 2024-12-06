import React, { useState } from 'react';

const ProductSelect = ({ productOptions, selectedProduct, setSelectedProduct }) => {

  const handleChange = (event) => {
    const product = productOptions.find(p => p.product_name === event.target.value);
    setSelectedProduct(product);
  };

  return (
      <select value={selectedProduct?.product_name || ''} onChange={handleChange} className="border border-gray-300 rounded-lg p-[11px] w-full">
        <option value="" disabled>Выберите продукт</option>
        {productOptions.map(product => (
          <option key={product.id_product} value={product.product_name}>
            {product.product_name}
          </option>
        ))}
      </select>
  );
};

export default ProductSelect;