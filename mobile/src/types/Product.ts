export interface Product {
    _id: string;
    name: string;
    description: string;
    imagePath: string;
    price: number;
    ingredients: {
        name: string;
        icon: string;
        _id: string;
    }[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Category {
  _id: string;
  name: string;
  icon: string;
}
