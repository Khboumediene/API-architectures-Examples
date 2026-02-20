package com.example.service;

import com.example.model.Product;
import com.example.repository.ProductRepository;

import javax.jws.WebService;
import java.util.List;

@WebService(endpointInterface = "com.example.service.ProductService")
public class ProductServiceImpl implements ProductService {

    private ProductRepository repo = new ProductRepository();

    @Override
    public List<Product> getAllProducts() {
        return repo.getAll();
    }

    @Override
    public Product getProductById(int id) {
        return repo.findById(id);
    }

    @Override
    public String addProduct(Product product) {
        repo.save(product);
        return "Product added successfully";
    }

    @Override
    public String updateProduct(Product product) {
        repo.update(product);
        return "Product updated successfully";
    }

    @Override
    public String deleteProduct(int id) {
        repo.delete(id);
        return "Product deleted successfully";
    }
}