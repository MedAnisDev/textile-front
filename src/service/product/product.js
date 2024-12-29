import fetch from "../../config/interceptor/interceptor.js";
import { BaseUrl, APIS } from "../../config/constants/URLS.js";

export const createProduct = (data) => {
    return fetch({
      method: "post",
      url: BaseUrl + APIS.PRODUCT.createProduct(),
      data,
      headers: { "Content-Type": "application/json" },
    });
  };

  export const fetchAllProducts = (pageNumber) => {
    return fetch({
      method: "get",
      url:
        BaseUrl +
        APIS.PRODUCT.fetchAllProducts(pageNumber),
    });
  };


  export const fetchAllProductsByCategory = (pageNumber , category) => {
    return fetch({
      method: "get",
      url:
        BaseUrl +
        APIS.PRODUCT.fetchAllProductsByCategory(pageNumber , category),
    });
  };

  export const updateProduct = (id, data) => {
    return fetch({
      method: "put",
      url: BaseUrl + APIS.PRODUCT.updateProduct(id),
      data,
    });
  };

  export const deleteProductById = (id) => {
    return fetch({
      method: "delete",
      url: BaseUrl + APIS.PRODUCT.deleteProduct(id),
    });
  };
