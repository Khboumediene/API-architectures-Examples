package com.example.service;

import com.example.model.Product;

import javax.jws.WebMethod;
import javax.jws.WebService;
import java.util.List;

@WebService
public interface ProductService {

    @WebMethod
    List<Product> getAllProducts();

    @WebMethod
    Product getProductById(int id);

    @WebMethod
    String addProduct(Product product);

    @WebMethod
    String updateProduct(Product product);

    @WebMethod
    String deleteProduct(int id);
}