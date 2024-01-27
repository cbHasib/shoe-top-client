export interface TProductQuery {
    searchTerm?: string;
    fields?: string[];
    price: {
      $gte?: number;
      $lte?: number;
    };
    releaseDate?: {
      $gte?: string;
      $lte?: string;
    };
    brand?: string;
    model?: string;
    style?: string;
    color?: string;
    size?: string;
    weight?: {
      $gte?: number;
      $lte?: number;
    };
    material?: string;
    sort?: string;
  }
  