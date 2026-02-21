package com.example.service;

import com.example.model.Product;

import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.jws.WebService;
import java.util.List;

@WebService
public interface ProductService {

    @WebMethod
    List<Product> getAllProducts();

    @WebMethod
    Product getProductById(@WebParam(name = "id") int id);

    @WebMethod
    String addProduct(@WebParam(name = "product") Product product);

    @WebMethod
    String updateProduct(@WebParam(name = "product") Product product);

    @WebMethod
    String deleteProduct(@WebParam(name = "id") int id);
}