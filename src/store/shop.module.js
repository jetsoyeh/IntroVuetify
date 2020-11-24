import productGet from '../service/production.service'


const types = {
    ADD_CART: 'store/ADD_CART',
    CANCEL_CART: 'store/CANCEL_CART',
    REDUCE_ONE: 'store/REDUCE_ONE',
    SET_PRODUCTS: "store/SET_PRODUCTS"
}
let cart = JSON.parse(sessionStorage.getItem('cart'));

const state = {
    products: [],
    shoppingCart: cart ? cart : [],
}

const getters = {
    //取得點餐列表
    getProducts: state => state.products,
    //取得購物車總數量
    getShoppingCartTotal: state => state.shoppingCart.length,
    //取得購物車清單
    getCartList: state => state.shoppingCart,
    //推薦餐點
    getpopularProducts: state => {
        const inventoryList = state.products.filter(p => p.inventory > 0);
        const random = Math.round(Math.random() * (inventoryList.length - 1));
        //回傳隨機的餐點
        return inventoryList[random];
    },
    // 取得購物車餐點總價錢
    getCartPriceTotal: state => state.shoppingCart.reduce((a, b) => a + b.Price, 0),
}

const actions = {
    addCart({ commit }, id) {
        commit(types.ADD_CART, id)
    },
    cancelCart({ commit }, title) {
        commit(types.CANCEL_CART, title)
    },
    //減少1個
    reduceOne({ commit }, id) {
        commit(types.REDUCE_ONE, id)
    },

    async setProduct({ commit }) {
        const response = await productGet.getAllProduct();
        commit(types.SET_PRODUCTS, response.data);
    }
}

const mutations = {
    [types.SET_PRODUCTS]: (state, products) => state.products = products,
    [types.ADD_CART](state, id) {
        const product = state.products.find(item => item.Id === id);
        //餐點庫存減1
        if (product.inventory == 0) {
            return;
        }
        else {
            product.inventory = product.inventory - 1;
            //判斷是否已經有此物品
            const foodProduct = state.shoppingCart.find(item => item.Id === id);
            if (foodProduct) {
                foodProduct.qty++;
                foodProduct.Price = product.Price * foodProduct.qty;
            }
            else {
                //餐點加入購物車
                state.shoppingCart.push({
                    Id: product.Id,
                    Title: product.Title,
                    Price: product.Price,
                    qty: 1
                });
            }

            sessionStorage.setItem('cart', JSON.stringify(state.shoppingCart));
        }

    },
    [types.CANCEL_CART](state, title) {
        //從購物車移除
        const cartIndex = state.shoppingCart.findIndex(item => item.Title === title);

        const cartnumber = state.shoppingCart.find(item => item.Title === title);

        state.shoppingCart.splice(cartIndex, 1);

        //餐點加回1
        const product = state.products.find(item => item.Title === title);
        product.inventory += cartnumber.qty;
        //購物車清單回存 localstorage 
        sessionStorage.setItem('cart', JSON.stringify(state.shoppingCart));
    },

    [types.REDUCE_ONE](state, id) {
        const cartIndex = state.shoppingCart.findIndex(item => item.Id === id);

        const product = state.products.find(item => item.Id === id);
        product.inventory += 1;

        const foodProduct = state.shoppingCart.find(item => item.Id === id);
        foodProduct.qty--;
        foodProduct.Price = product.Price * foodProduct.qty;

        if (foodProduct.qty == 0) {
            state.shoppingCart.splice(cartIndex, 1);
        }

        sessionStorage.setItem('cart', JSON.stringify(state.shoppingCart));
    }

}





export const shop = {
    namespace: true,
    state,
    getters,
    actions,
    mutations
}