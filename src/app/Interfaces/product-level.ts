import { Products } from './products';
export interface ProductLevel {
    modelID: number;
    modelName: string;
    rmodelId: string;
    products: Products[];
}
