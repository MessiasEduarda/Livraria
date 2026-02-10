package com.entrecapitulos.gestaolivraria.controller;

import com.entrecapitulos.gestaolivraria.dto.LoginRequest;
import com.entrecapitulos.gestaolivraria.dto.LoginResponse;
import com.entrecapitulos.gestaolivraria.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }
}
