import { configureStore, createSlice } from "@reduxjs/toolkit";

// ✅ Products Slice
const productsSlice = createSlice({
  name: "products",
  initialState: {
    Veg: [
      { id: 101, name: 'Broccoli', price: 50, imageurl: '/image/broccoli.jpg' },
      { id: 102, name: 'Potato', price: 25, imageurl: '/image/potato.jpg' },
      { id: 103, name: 'Brinjal', price: 30, imageurl: '/image/bringal.jpg' },
      { id: 104, name: 'LadyFinger', price: 47, imageurl: '/image/cucumber.jpeg' },
      { id: 105, name: 'Radish', price: 30, imageurl: '/image/raddish.webp' },
      { id: 106, name: 'Avocado', price: 60, imageurl: '/image/avacado.jpg' },
      { id: 107, name: 'Cabbage', price: 40, imageurl: '/image/cabbage.jpg' },
      { id: 108, name: 'Carrot', price: 33, imageurl: '/image/carrot.jpeg' },
      { id: 109, name: 'Bitter Gourd', price: 43, imageurl: '/image/bittergourd.jpg' },
      { id: 110, name: 'Spinach', price: 10, imageurl: '/image/spinach.jpg' },
      { id: 111, name: 'Tomato', price: 30, imageurl: '/image/tomato.webp' },
      { id: 112, name: 'Cucumber', price: 40, imageurl: '/image/cucu.webp' },
      { id: 113, name: 'Califlower', price: 50, imageurl: '/image/califlower.webp' },
      { id: 114, name: 'Beans', price: 60, imageurl: '/image/beans.webp' },
      { id: 115, name: 'Capicicum', price: 50, imageurl: '/image/capci.jpg' }
    ],
    NonVeg: [
      { id: 201, name: 'Fish', price: 50, imageurl: '/image/fish.jpeg' },
      { id: 202, name: 'Prawns', price: 25, imageurl: '/image/prawns.jpeg' },
      { id: 203, name: 'Mutton', price: 30, imageurl: '/image/mutton.jpeg' },
      { id: 204, name: 'Chicken', price: 47, imageurl: '/image/chicken.jpeg' },
      { id: 205, name: 'Crab', price: 30, imageurl: '/image/crab.jpg' },
      { id: 206, name: 'Chicken Tikka', price: 60, imageurl: '/image/tikka.webp' },
      { id: 207, name: 'Apollo Fish', price: 40, imageurl: '/image/apollofish.jpg' },
      { id: 208, name: 'Egg', price: 33, imageurl: '/image/egg.webp' },
      { id: 209, name: 'Chicken Bhutuwa', price: 260, imageurl: '/image/chickenbhutuwa.jpg' },
      { id: 210, name: 'Bon Appite Chicken', price: 240, imageurl: '/image/bon appite.jpg' },
      { id: 211, name: 'Fish Curry', price: 200, imageurl: '/image/fish.jpg' },
      { id: 212, name: 'Hyderabad Biryani', price: 300, imageurl: '/image/hyderabadbiriyani.webp' },
      { id: 213, name: 'Methi Wala Chicken', price: 360, imageurl: '/image/methi wala chicken.jpg' },
      { id: 214, name: 'Talli Murgi', price: 60, imageurl: '/image/talli murgi.webp' },
      { id: 215, name: 'Prawn Chukka', price: 420, imageurl: '/image/prawn chukka.JPG' }
    ],
    Milk: [
      { id: 301, name: 'BiscoffShake', price: 150, imageurl: '/image/biscoffshake.jpg' },
      { id: 302, name: 'CaramelShake', price: 125, imageurl: '/image/caramelshake.webp' },
      { id: 303, name: 'KitKatShake', price: 130, imageurl: '/image/kitkatshake.webp' },
      { id: 304, name: 'ForkShake', price: 147, imageurl: '/image/forkshake.webp' },
      { id: 305, name: 'ChocolateShake', price: 130, imageurl: '/image/chocolateshake.webp' },
      { id: 306, name: 'OreoShake', price: 160, imageurl: '/image/oreoshake.webp' },
      { id: 307, name: 'StrawberryShake', price: 140, imageurl: '/image/strawbeeryshake.webp' },
      { id: 308, name: 'VanillaShake', price: 133, imageurl: '/image/vinallashake.webp' },
      { id: 309, name: 'Alcoholic Shake', price: 183, imageurl: '/image/alcoholicM.webp' },
      { id: 310, name: 'Caramel Shake', price: 233, imageurl: '/image/caramelshake.webp' },
      { id: 311, name: 'ChocoShake', price: 250, imageurl: '/image/chocoM.webp' },
      { id: 312, name: 'Decadent Shake', price: 285, imageurl: '/image/decadent.webp' },
      { id: 313, name: 'Luscious Shake', price: 180, imageurl: '/image/lusciousM.jpg' },
      { id: 314, name: 'Mint Brownie Shake', price: 210, imageurl: '/image/mintbrownie.jpg' },
      { id: 315, name: 'MintChipShake', price: 243, imageurl: '/image/mintchip.webp' },
      { id: 316, name: 'NinjaShake', price: 430, imageurl: '/image/ninjaM.jpg' },
      { id: 317, name: 'PeanutButter Shake', price: 198, imageurl: '/image/peanutbutterM.webp' }
    ],
    Chocolate: [
      { id: 401, name: 'Nut', price: 50, imageurl: '/image/nut.jpg' },
      { id: 402, name: 'Kunafa', price: 225, imageurl: '/image/kunafa.jpg' },
      { id: 403, name: 'KitKat', price: 50, imageurl: '/image/kitkat.jpg' },
      { id: 404, name: 'Classic', price: 100, imageurl: '/image/classic.jpg' },
      { id: 405, name: 'M&Ms', price: 30, imageurl: '/image/chocolate1.jpg' },
      { id: 406, name: 'DairyMilk', price: 90, imageurl: '/image/download.jpg' },
      { id: 407, name: 'Govida', price: 140, imageurl: '/image/govida.jpg' },
      { id: 408, name: 'Ferro', price: 530, imageurl: '/image/download (2).jpg' },
      { id: 409, name: 'Excelcium Tradition', price: 800, imageurl: '/image/excelciumtradition.jpg' },
      { id: 410, name: 'Fudge', price: 200, imageurl: '/image/fudge.jpg' },
      { id: 411, name: 'Hershey,s', price: 450, imageurl: '/image/hersheys.webp' },
      { id: 412, name: 'Lindor', price: 530, imageurl: '/image/lindorC.jpg' },
      { id: 413, name: 'Milka', price: 260, imageurl: '/image/milkaC.jpg' },
      { id: 414, name: ' MrBeast', price: 206, imageurl: '/image/mrbeast.webp' },
      { id: 415, name: 'seahorse', price: 502, imageurl: '/image/seahorse.webp' },
      { id: 416, name: 'Orea', price: 260, imageurl: '/image/orea.webp' },
      { id: 417, name: 'Truffle', price: 100, imageurl: '/image/truffle.webp' },
      { id: 418, name: 'Toblerone', price: 80, imageurl: '/image/toblerone.webp' }
    ]
  },
  reducers: {}
});

// ✅ Cart Slice with localStorage initialization
const cartSlice = createSlice({
  name: "cart",
  initialState: JSON.parse(localStorage.getItem("cart")) || [],
  reducers: {
    addToCart: (state, action) => {
      const item = state.find(i => i.name === action.payload.name);
      if (item) {
        item.Quantity += 1;
      } else {
        state.push({ ...action.payload, Quantity: 1 });
      }
    },
    incrementQuantity: (state, action) => {
      const item = state.find(i => i.id === action.payload);
      if (item) item.Quantity += 1;
    },
    decrementQuantity: (state, action) => {
      const item = state.find(i => i.id === action.payload);
      if (item && item.Quantity > 1) {
        item.Quantity -= 1;
      } else {
        return state.filter(i => i.id !== action.payload);
      }
    },
    removeFromCart: (state, action) => {
      return state.filter(i => i.id !== action.payload);
    },
    clearCart: () => [] // ✅ Added for purchase completion
  }
});

// ✅ Orders Slice
const ordersSlice = createSlice({
  name: "orders",
  initialState: [],
  reducers: {
    addOrder: (state, action) => {
      state.push(action.payload);
    }
  }
});

// ✅ Store Configuration
const store = configureStore({
  reducer: {
    products: productsSlice.reducer,
    cart: cartSlice.reducer,
    orders: ordersSlice.reducer
  }
});

// ✅ Export Actions
export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  clearCart
} = cartSlice.actions;

export const { addOrder } = ordersSlice.actions;

// ✅ Subscribe to store updates and save to localStorage
store.subscribe(() => {
  localStorage.setItem("cart", JSON.stringify(store.getState().cart));
});

export default store;