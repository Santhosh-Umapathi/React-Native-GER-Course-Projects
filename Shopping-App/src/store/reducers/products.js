import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  SET_PRODUCT,
  UPDATE_PRODUCT,
} from "../actions/products";
//Model
import Product from "../../model/product";

const initialState = {
  availableProducts: [],
  userProducts: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DELETE_PRODUCT:
      const productId = action.payload;
      return {
        ...state,
        userProducts: state.userProducts.filter(
          (item) => item.id !== productId
        ),
        availableProducts: state.availableProducts.filter(
          (item) => item.id !== productId
        ),
      };

    case CREATE_PRODUCT:
      const { id, title, description, image, price, ownerId, ownerPushToken } =
        action.payload;

      const createdProduct = new Product(
        id,
        ownerId,
        title,
        image,
        description,
        price,
        ownerPushToken
      );

      return {
        ...state,
        availableProducts: [...state.availableProducts, createdProduct],
        userProducts: [...state.userProducts, createdProduct],
      };

    case UPDATE_PRODUCT:
      const {
        id: uId,
        title: uTitle,
        description: uDescription,
        image: uImage,
        ownerPushToken: uOwnerPushToken,
      } = action.payload;

      const index = state.userProducts.findIndex((item) => item.id === uId);
      const updatedProduct = new Product(
        uId,
        state.userProducts[index].ownerId,
        uTitle,
        uImage,
        uDescription,
        state.userProducts[index].price,
        uOwnerPushToken
      );

      const updatedUserProduct = [...state.userProducts];
      updatedUserProduct[index] = updatedProduct;

      const indexA = state.availableProducts.findIndex(
        (item) => item.id === uId
      );
      const updatedAProduct = new Product(
        uId,
        state.availableProducts[indexA].ownerId,
        uTitle,
        uImage,
        uDescription,
        state.availableProducts[indexA].price,
        uOwnerPushToken
      );

      const updatedvailableProduct = [...state.availableProducts];
      updatedvailableProduct[indexA] = updatedAProduct;

      return {
        ...state,
        availableProducts: updatedvailableProduct,
        userProducts: updatedUserProduct,
      };

    case SET_PRODUCT:
      const { loadedProducts, userProducts } = action.payload;

      return {
        ...state,
        userProducts: userProducts,
        availableProducts: loadedProducts,
      };

    default:
      return state;
  }
};
