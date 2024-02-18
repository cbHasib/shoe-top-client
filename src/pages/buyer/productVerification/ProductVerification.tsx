import { Button, Divider, Input, Spin } from 'antd';
import { useState } from 'react';
import { toast } from 'sonner';
import { useGetProductByCodeQuery } from '../../../redux/features/products/productsApi';
import { PiCheckCircleBold, PiXCircleBold } from 'react-icons/pi';

const ProductVerification = () => {
    const [productCode, setProductCode] = useState("");
    const [typeProductCode, setTypeProductCode] = useState("");

    const { data, isLoading, isFetching, isError, isSuccess } = useGetProductByCodeQuery(productCode, {
        skip: !productCode || productCode.length < 6 || !productCode?.startsWith("P-"),
        refetchOnMountOrArgChange: true,
    });

    const verifyProduct = async () => {
        if (!typeProductCode) return;
        if (typeProductCode.length < 6 || !typeProductCode?.startsWith("P-")) {
            toast.error("Invalid product code");
            return
        }

        setProductCode(typeProductCode);        
    }

    console.log(isError);

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "column", maxWidth: "500px", margin: "auto", gap: "20px", padding: "20px", border: "1px solid #f0f0f0", borderRadius: "5px" }}>
                <h1>Product Verification</h1>
                <Input placeholder="Enter product code" value={typeProductCode} onChange={(e) => setTypeProductCode(e.target.value)} />
                <Button type="primary" disabled={!typeProductCode || typeProductCode?.length < 6} onClick={verifyProduct}>Verify</Button>
            </div>

            <Divider />

            {
                isFetching || isLoading ?

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "column", maxWidth: "500px", margin: "auto", gap: "20px", padding: "20px", border: "1px solid #f0f0f0", borderRadius: "5px" }}>
                        <Spin />
                        <h3>Verifying product...</h3>
                    </div>
                    : null
            }


            {
                (isError && !isFetching && !isLoading) ?
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "column", maxWidth: "500px", margin: "auto", gap: "20px", padding: "20px", border: "1px solid #f0f0f0", borderRadius: "5px" }}>
                        <PiXCircleBold style={{ fontSize: "50px", color: "red" }} />
                        <h3>This product is not authentic</h3>
                    </div>
                    : null
            }

            {
                (isSuccess && data && !isFetching && !isLoading && !isError) ?
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "column", maxWidth: "800px", margin: "auto", gap: "20px", padding: "20px", border: "1px solid #f0f0f0", borderRadius: "5px" }}>
                        <PiCheckCircleBold style={{ fontSize: "50px", color: "green" }} />
                        <h3>This product is authentic</h3>

                        <Divider />

                        <h2 style={{borderBottom: '1px solid #E8E8E8'}}>Product Details</h2>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", width: '100%', margin: '0 auto' }}>
                            <p><b>Name: </b>{data?.data?.name || ''}</p>
                            <p><b>Code: </b>{data?.data?.productCode  || ''}</p>
                            <p><b>Price: </b>{data?.data?.price  || ''}</p>
                            <p><b>Category: </b>{data?.data?.category  || ''}</p>
                            <p><b>Brand: </b>{data?.data?.brand  || ''}</p>
                            <p><b>Color: </b>{data?.data?.color  || ''}</p>
                            <p><b>Material: </b>{data?.data?.material  || ''}</p>
                            <p><b>Size: </b>{data?.data?.size  || ''}</p>
                            <p><b>Weight: </b>{data?.data?.weight  || ''}</p>
                            <p><b>Quantity: </b>{data?.data?.quantity  || ''}</p>
                            <p><b>Release Date: </b>{data?.data?.releaseDate  || ''}</p>
                            <p><b>Model: </b>{data?.data?.model  || ''}</p>
                            <p><b>Style: </b>{data?.data?.style  || ''}</p>
                            <p style={{overflow: 'hidden', lineClamp: 1, textOverflow: 'ellipsis'
                            }}><b>Description: </b>{data?.data?.description  || ''}</p>

                        </div>

                    </div>
                    : null
            }

        </div>
    )
}



export default ProductVerification;