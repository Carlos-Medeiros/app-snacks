package com.leo.snacks.config;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.leo.snacks.dto.CredentialsDTO;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Service
public class JwtService {

    @Value("${security.jwt.expiration}")
    private String expiration;

    @Value("${security.jwt.key-signature}")
    private String keySignature;

    public String generateToken(CredentialsDTO dto) {
        long expString = Long.valueOf(expiration);
        LocalDateTime expirationTime = LocalDateTime.now().plusMinutes(expString);
        Instant instant = expirationTime.atZone(ZoneId.systemDefault()).toInstant();
        Date date = Date.from(instant);

        return Jwts
                .builder()
                .setSubject(dto.getEmail())
                .setExpiration(date)
                .signWith(SignatureAlgorithm.HS512, keySignature)
                .compact();
    }

    private Claims getClaims(String token) throws ExpiredJwtException {
        return Jwts
                .parser()
                .setSigningKey(keySignature)
                .parseClaimsJws(token)
                .getBody();
    }

    public boolean validToken(String token) {
        try{
            Claims claims = getClaims(token);
            Date dateExpiration = claims.getExpiration();
            LocalDateTime date =
                    dateExpiration.toInstant()
                            .atZone(ZoneId.systemDefault()).toLocalDateTime();
            return !LocalDateTime.now().isAfter(date);
        } catch (Exception e) {
            return false;
        }
    }

    public String getLoginUser(String token) throws ExpiredJwtException {
        return (String) getClaims(token).getSubject();
    }
}
