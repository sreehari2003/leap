// package com.todo.task;

// import java.util.List;

// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.web.cors.CorsConfiguration;
// import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
// import org.springframework.web.filter.CorsFilter;

// @Configuration
// public class CorsConfig {

// @Bean
// public CorsFilter corsFilter() {
// UrlBasedCorsConfigurationSource source = new
// UrlBasedCorsConfigurationSource();
// CorsConfiguration config = new CorsConfiguration();
// // Use allowedOriginPatterns instead of addAllowedOrigin("*")
// config.addAllowedOrigin("http://localhost:5173/");

// // Allow all methods (GET, POST, PUT, DELETE, etc.)
// config.addAllowedMethod("*");

// // Allow all headers
// config.addAllowedHeader("*");

// // Allow credentials (e.g., cookies)
// config.setAllowCredentials(true);
// return new CorsFilter(source);
// }
// }
