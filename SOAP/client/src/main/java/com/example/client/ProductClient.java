package com.example.client;

import com.example.client.Product;
import com.example.client.ProductService;
import com.example.client.ProductServiceImplService;

import java.util.List;

public class ProductClient {

    public static void main(String[] args) {

        // Créer le service SOAP à partir du WSDL
        ProductServiceImplService service = new ProductServiceImplService();
        ProductService port = service.getProductServiceImplPort();

        // Lister tous les produits
        List<Product> products = port.getAllProducts();
        System.out.println("=== Tous les produits ===");
        for (Product p : products) {
            System.out.println(p.getId() + " | " + p.getName() + " | " + p.getPrice());
        }

        // Ajouter un produit
        Product newProduct = new Product();
        newProduct.setId(3);
        newProduct.setName("Tablet");
        newProduct.setPrice(500.0);

        String addResponse = port.addProduct(newProduct);
        System.out.println("Add response: " + addResponse);

        // Mettre à jour un produit
        newProduct.setPrice(450.0);
        String updateResponse = port.updateProduct(newProduct);
        System.out.println("Update response: " + updateResponse);

        // Obtenir un produit par ID
        Product p = port.getProductById(3);
        System.out.println("Product ID 3: " + p.getName() + " | " + p.getPrice());

        // Supprimer un produit
        String deleteResponse = port.deleteProduct(3);
        System.out.println("Delete response: " + deleteResponse);
    }
}