
const initialState={
    createProduct:{},
    updateProduct:{},
    getProductById:{},
    ListProducts:{},
    ListProductsByAdmin:{},
    ListProductsByGroupAdmin:{},
    DeleteProducts:{},
    errors:{},
}

export const CREATE_PRODUCT="CREATEPRODUCT";
export const UPDATE_PRODUCT="UPDATEPRODUCT";
export const GET_PRODUCT="GETPRODUCT";
export const LIST_PRODUCT="LISTPRODUCT";
export const LIST_PRODUCT_BY_GROUP_ADMIN="LISTPRODUCTBYGROUPADMIN";
export const LIST_PRODUCT_BY_ADMIN="LISTPRODUCTBYADMIN";
export const DELETE_PRODUCT="DELETEPRODUCT";
export const ERROR = "ERROR";


export default function (state = initialState,action){
    switch (action.type) {

        case CREATE_PRODUCT:

            return {
                createProduct:"product created"
            }


        case UPDATE_PRODUCT:
            return {
                ...state,
                isEditedSuccess:true,
                updateProduct: action.payload
            }


        case GET_PRODUCT:
            return{
                ...state,
                getProductById:action.payload
            }


        case LIST_PRODUCT:
            return{
                ...state,
                ListProducts:action.payload
            }


        case LIST_PRODUCT_BY_ADMIN:
            return{
                ...state,
                ListProductsByAdmin:action.payload
            }


        case LIST_PRODUCT_BY_GROUP_ADMIN:
            return{
                ...state,
                ListProductsByGroupAdmin:action.payload
            }


        case DELETE_PRODUCT:
            const productId = action.payload
            return{
                ...state,
                ListProductsByGroupAdmin: state.ListProductsByGroupAdmin.filter((Product)=>Product.id!==productId)
            }


        case ERROR:
            return{
                error:action.payload
            }


        default:{
            return state;
        }

    }
}