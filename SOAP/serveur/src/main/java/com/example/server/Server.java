package com.example.server;

import com.example.service.ProductServiceImpl;

import javax.xml.ws.Endpoint;

public class Server {

    public static void main(String[] args) {
        String url = "http://localhost:8080/ws/products";

        Endpoint.publish(url, new ProductServiceImpl());

        System.out.println("SOAP service running at: " + url + "?wsdl");
    }
}