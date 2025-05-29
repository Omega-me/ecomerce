import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useProduct from '@/hooks/use-product';
import React from 'react';
import Loader from '../../loader';
import { Save } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

interface Props {
  id?: number;
}

const ProductInfo = (props: Props) => {
  const { productFormData, handleChangeShipment, handleSaveProduct, handleChangeActiveProduct, savingProduct } = useProduct(props.id);
  return (
    <form onSubmit={handleSaveProduct}>
      <div className="flex flex-col gap-y-5 mb-8">
        <div>
          <Label className="mb-3" htmlFor="name">
            Title
          </Label>
          <Input value={productFormData.name} type="text" id="name" name="name" required onChange={handleChangeShipment} />
        </div>
        <div>
          <Label className="mb-3" htmlFor="description">
            Description
          </Label>
          <Input value={productFormData.description ?? ''} type="text" id="description" name="description" onChange={handleChangeShipment} />
        </div>
        <div>
          <Label className="mb-3" htmlFor="image">
            Image
          </Label>
          <Input value={productFormData.image ?? ''} type="text" id="image" name="image" onChange={handleChangeShipment} />
        </div>
        <div>
          <Label className="mb-3" htmlFor="price">
            Price
          </Label>
          <Input value={productFormData.price} type="number" id="price" name="price" required onChange={handleChangeShipment} />
        </div>
        <div>
          <Label className="mb-3" htmlFor="stock">
            Stock
          </Label>
          <Input value={productFormData.stock} type="number" id="stock" name="stock" required onChange={handleChangeShipment} />
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <Switch checked={productFormData.isActive} id="isActive" name="isActive" onCheckedChange={handleChangeActiveProduct} />
            <Label htmlFor="isActive">Is Active</Label>
          </div>
        </div>
        <Button className="w-full cursor-pointer" type="submit">
          <Loader state={savingProduct}>
            <Save />
          </Loader>
          Save Product
        </Button>
      </div>
    </form>
  );
};

export default ProductInfo;
