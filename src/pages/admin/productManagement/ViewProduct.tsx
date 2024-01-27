import { useParams } from "react-router-dom";

const ViewProduct = () => {

    // query from router
    const { slug } = useParams();
    console.log(slug);
    
    return (
        <div>
            ViewProduct            
        </div>
    );
};

export default ViewProduct;