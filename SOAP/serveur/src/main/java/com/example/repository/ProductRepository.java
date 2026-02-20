package com.example.repository;

import com.example.model.Product;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.File;
import java.util.*;

public class ProductRepository {

    private static final String FILE_PATH = "src/main/resources/products.json";
    private ObjectMapper mapper = new ObjectMapper();

    public List<Product> getAll() {
        try {
            File file = new File(FILE_PATH);
            if (!file.exists()) return new ArrayList<>();

            return Arrays.asList(mapper.readValue(file, Product[].class));
        } catch (Exception e) {
            e.printStackTrace();
            return new ArrayList<>();
        }
    }

    public void saveAll(List<Product> products) {
        try {
            mapper.writeValue(new File(FILE_PATH), products);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public Product findById(int id) {
        return getAll().stream()
                .filter(p -> p.getId() == id)
                .findFirst()
                .orElse(null);
    }

    public void save(Product product) {
        List<Product> products = new ArrayList<>(getAll());
        products.add(product);
        saveAll(products);
    }

    public void update(Product updated) {
        List<Product> products = new ArrayList<>(getAll());

        for (Product p : products) {
            if (p.getId() == updated.getId()) {
                p.setName(updated.getName());
                p.setPrice(updated.getPrice());
            }
        }

        saveAll(products);
    }

    public void delete(int id) {
        List<Product> products = new ArrayList<>(getAll());
        products.removeIf(p -> p.getId() == id);
        saveAll(products);
    }
}