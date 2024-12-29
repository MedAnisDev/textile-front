
export const BaseUrl = "http://localhost:8080/api/v1";


export const APIS ={
    AUTH: {
        login: '/auth/login',
        register: '/auth/register',
        logout: '/auth/logout',
    },
    PRODUCT: {
        createProduct : `/products`,
        updateProduct :(id) => `/products/${id}`,
        fetchAllProducts:(pageNumber) => `/products?pageNumber=${pageNumber}`,
        fetchAllProductsByCategory:(pageNumber ,category) => `/products?pageNumber=${pageNumber}&category=${category}`,
        deleteProduct:(id) => `/products/${id}`
    },
    FILE: {
        downloadFile: (fileName) => `/files/download?fileName=${fileName}`
    }
}