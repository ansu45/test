import { Products } from './products';
export interface ProductLevel {
    ModelID: number;
    ModelName: string;
    RmodelId: string;
    products: Products[];
}
