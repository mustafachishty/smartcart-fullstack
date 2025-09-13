import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Plus } from 'lucide-react';
import { Product } from '../../types';
import { useProducts } from '../../contexts/ProductContext';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Modal } from '../ui/Modal';
import { CATEGORIES } from '../../utils/constants';

interface ProductFormProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product;
}

export const ProductForm: React.FC<ProductFormProps> = ({ isOpen, onClose, product }) => {
  const { addProduct, updateProduct } = useProducts();
  const [formData, setFormData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price || 0,
    originalPrice: product?.originalPrice || 0,
    category: product?.category || 'Electronics',
    image: product?.image || '',
    images: product?.images || [''],
    inStock: product?.inStock ?? true,
    rating: product?.rating || 4.5,
    reviews: product?.reviews || 0,
    specifications: product?.specifications || {},
    tags: product?.tags || [],
  });
  const [newTag, setNewTag] = useState('');
  const [newSpecKey, setNewSpecKey] = useState('');
  const [newSpecValue, setNewSpecValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const productData = {
      ...formData,
      images: formData.images.filter(img => img.trim() !== ''),
      tags: formData.tags.filter(tag => tag.trim() !== ''),
    };

    if (product) {
      updateProduct(product.id, productData);
    } else {
      addProduct(productData);
    }
    
    onClose();
  };

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData({ ...formData, images: newImages });
  };

  const addImage = () => {
    setFormData({ ...formData, images: [...formData.images, ''] });
  };

  const removeImage = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData({ ...formData, tags: [...formData.tags, newTag.trim()] });
      setNewTag('');
    }
  };

  const removeTag = (index: number) => {
    const newTags = formData.tags.filter((_, i) => i !== index);
    setFormData({ ...formData, tags: newTags });
  };

  const addSpecification = () => {
    if (newSpecKey.trim() && newSpecValue.trim()) {
      setFormData({
        ...formData,
        specifications: {
          ...formData.specifications,
          [newSpecKey.trim()]: newSpecValue.trim(),
        },
      });
      setNewSpecKey('');
      setNewSpecValue('');
    }
  };

  const removeSpecification = (key: string) => {
    const newSpecs = { ...formData.specifications };
    delete newSpecs[key];
    setFormData({ ...formData, specifications: newSpecs });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={product ? 'Edit Product' : 'Add New Product'}
      size="xl"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Product Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              {CATEGORIES.filter(cat => cat !== 'All').map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Input
            label="Price ($)"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
            required
          />
          
          <Input
            label="Original Price ($)"
            type="number"
            step="0.01"
            value={formData.originalPrice}
            onChange={(e) => setFormData({ ...formData, originalPrice: parseFloat(e.target.value) || 0 })}
          />

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="inStock"
              checked={formData.inStock}
              onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded"
            />
            <label htmlFor="inStock" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              In Stock
            </label>
          </div>
        </div>

        {/* Images */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Product Images
          </label>
          <div className="space-y-2">
            {formData.images.map((image, index) => (
              <div key={index} className="flex space-x-2">
                <Input
                  placeholder="Image URL"
                  value={image}
                  onChange={(e) => handleImageChange(index, e.target.value)}
                  className="flex-1"
                />
                {formData.images.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeImage(index)}
                  >
                    <X size={16} />
                  </Button>
                )}
              </div>
            ))}
            <Button type="button" variant="outline" size="sm" onClick={addImage}>
              <Plus size={16} className="mr-1" />
              Add Image
            </Button>
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Tags
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {formData.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(index)}
                  className="ml-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
                >
                  <X size={12} />
                </button>
              </span>
            ))}
          </div>
          <div className="flex space-x-2">
            <Input
              placeholder="Add tag"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              className="flex-1"
            />
            <Button type="button" variant="outline" size="sm" onClick={addTag}>
              Add
            </Button>
          </div>
        </div>

        {/* Specifications */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Specifications
          </label>
          <div className="space-y-2 mb-2">
            {Object.entries(formData.specifications).map(([key, value]) => (
              <div key={key} className="flex items-center space-x-2 p-2 bg-gray-50 dark:bg-gray-700 rounded">
                <span className="font-medium text-gray-900 dark:text-white">{key}:</span>
                <span className="text-gray-700 dark:text-gray-300">{value}</span>
                <button
                  type="button"
                  onClick={() => removeSpecification(key)}
                  className="ml-auto text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Input
              placeholder="Specification name"
              value={newSpecKey}
              onChange={(e) => setNewSpecKey(e.target.value)}
            />
            <Input
              placeholder="Specification value"
              value={newSpecValue}
              onChange={(e) => setNewSpecValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSpecification())}
            />
          </div>
          <Button type="button" variant="outline" size="sm" onClick={addSpecification} className="mt-2">
            Add Specification
          </Button>
        </div>

        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">
            {product ? 'Update Product' : 'Add Product'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};