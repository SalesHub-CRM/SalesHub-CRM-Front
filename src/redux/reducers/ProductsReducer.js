
const initialState={
    createProduct:{},
    getProductById:{},
    ListProducts:{},
    DeleteProducts:{},
    errors:{},
}

export const CREATE_PRODUCT="CREATEPRODUCT";
export const GET_PRODUCT="GETPRODUCT";
export const LIST_PRODUCT="LISTPRODUCT";
export const DELETE_PRODUCT="DELETEPRODUCT";
export const ERROR = "ERROR";


export default function (state = initialState,action){
    switch (action.type) {

        case CREATE_PRODUCT:

            return {
                createProduct:"product created"
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


        case DELETE_PRODUCT:
            return{
                DeleteProducts:"product deleted"
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