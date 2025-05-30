import { useEffect, useState } from "react";
import { useProductQuery } from "./useQueries";
import { Product } from "@prisma/client";
import { useProductMutation } from "./useMutation";

const useProduct = (id?: number) => {
  const { data: product, isPending } = useProductQuery(id);
  const { mutate: saveProduct, isPending: savingProduct } =
    useProductMutation();
  const [productFormData, setProductFormData] = useState<{
    name: string;
    description: string | null;
    image: string | null;
    price: number;
    stock: number;
    isActive: boolean;
  }>({
    name: "",
    description: null,
    image: "",
    price: 0,
    stock: 1,
    isActive: true,
  });

  useEffect(() => {
    if (product && product.data) {
      setProductFormData({
        name: (product?.data as Product)?.name,
        description: (product?.data as Product)?.description,
        image: (product?.data as Product)?.image,
        price: Number((product?.data as Product)?.price.toFixed(2)),
        stock: (product?.data as Product)?.stock,
        isActive: (product?.data as Product)?.isActive,
      });
    }
  }, [product]);

  const handleChangeShipment = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeActiveProduct = () => {
    setProductFormData((prev) => ({
      ...prev,
      isActive: !productFormData.isActive,
    }));
  };

  const handleSaveProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      ...productFormData,
      description:
        !productFormData.description ||
        productFormData.description.trim() === ""
          ? null
          : productFormData.description,
      image:
        !productFormData.image || productFormData.image.trim() === ""
          ? null
          : productFormData.image,
      price: Number(productFormData.price.toFixed(2)),
      stock: Number(productFormData.stock),
      id,
    };

    saveProduct(payload as Product);
  };

  return {
    productFormData,
    handleChangeShipment,
    handleSaveProduct,
    isPending,
    handleChangeActiveProduct,
    savingProduct,
  };
};

export default useProduct;
