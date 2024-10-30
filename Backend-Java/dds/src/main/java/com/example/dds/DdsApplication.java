package com.example.dds;


import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DdsApplication {

	public static void main(String[] args) throws IOException {
		
		
		
	     SpringApplication.run(DdsApplication.class, args);
	     openHomePage();
	     
	}
	private static void openHomePage() throws IOException {
	       Runtime rt = Runtime.getRuntime();
	       rt.exec("rundll32 url.dll,FileProtocolHandler " + "http://localhost:8080/swagger-ui/index.html");
	}
}
