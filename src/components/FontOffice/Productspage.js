import {useState} from "react";
import DisplayProducts from "../../blocks/frontOffice/Products/DisplayProducts";
import AddProductsForm from "../../blocks/frontOffice/Products/AddProductsForm";
import '../../blocks/frontOffice/Products/products.css';

const Productspage = () => {
    const [show, setShow] = useState(0)

    return(
        <div>
            <div className="d-flex justify-content-between productNav">
                <div>
                    <span>Manage products</span>
                </div>

                <div>
                    <button className="btn btn-light" onClick={() => setShow(0)}>show list</button>
                    <button className="btn btn-light" onClick={() => setShow(1)}>Add products</button>
                </div>
            </div>


            <div className="productsMainPage">
                {show===0 && <DisplayProducts/>}
                {show===1 && <AddProductsForm/>}
            </div>
        </div>
    )
}
export default Productspage;