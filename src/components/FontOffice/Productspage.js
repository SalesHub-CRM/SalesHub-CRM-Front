import DisplayProducts from "../../blocks/frontOffice/Products/DisplayProducts";
import '../../blocks/frontOffice/Products/products.css';
import {Route, Routes} from "react-router-dom";
import ProductDetails from "../../blocks/frontOffice/Products/ProductDetails";

const Productspage = () => {


    return(
        <div>

            <div className="productsMainPage">
                <Routes>
                    <Route path="/" element={<DisplayProducts/>}/>
                    <Route path="/productDetails/:productId" element={<ProductDetails/>}/>
                </Routes>
            </div>
        </div>
    )
}
export default Productspage;