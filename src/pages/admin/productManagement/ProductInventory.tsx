import { useEffect, useState } from "react";
import { useGetAllProductsQuery } from "../../../redux/features/products/productsApi";

const ProductInventory = () => {
    const [query, setQuery] = useState({}); // ['name', 'price'

    const { data } = useGetAllProductsQuery(query);

    useEffect(() => {
        const timer = setTimeout(() => {
            setQuery({ fields: 'name,price', 'price[$gte]': 10000 });
        }, 2000);

        return () => {
            clearTimeout(timer);
        }

    }, []);

    return (
        <div>
            ProductInventory

            <br />

            {data && data?.data?.map((product: any) => (
                <div key={product?._id}>
                    {product.name} - {product.price}
                </div>
            ))}
        </div>
    );
};

export default ProductInventory;