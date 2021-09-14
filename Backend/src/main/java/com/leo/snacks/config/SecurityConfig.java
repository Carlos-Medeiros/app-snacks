package com.leo.snacks.config;

import java.util.Arrays;

import com.leo.snacks.services.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.OncePerRequestFilter;

@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
	private AccountService accountService;

	@Autowired
	private JwtService jwtService;

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public OncePerRequestFilter jwtFilter() {
		return new JwtAuthFilter(jwtService, accountService);
	}

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth
				.userDetailsService(accountService)
				.passwordEncoder(passwordEncoder());
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
				.csrf().disable()
				.authorizeRequests()
					.antMatchers(HttpMethod.GET,"/categorys",
							"/categorys/{id}", "/deliveryTax/{id}", "/products/{id}",
							"/workingDay", "/workingDay/{id}")
						.permitAll()
					.antMatchers(HttpMethod.POST, "/user/register",
							"/user/login", "/keyValidation", "/emailValidator",
							"/emailExisting", "/orders")
						.permitAll()
					.antMatchers(HttpMethod.PUT, "/emailValidator/{email}/{numberKey}")
						.permitAll()
					.antMatchers(HttpMethod.PATCH, "/user/{email}", "/workingDay")
						.permitAll()
					.antMatchers("/user/details", "/user/name/{email}", "/user/phone/{email}",
							"/user/password/{email}", "/user/delete/{email}", "/orders/readyForDelivery",
                            "/orders/{id}/delivered", "/orders/{code}")
                        .hasAnyRole("DELIVERYMAN", "ADMIN")
                    .anyRequest()
                        .hasRole("ADMIN")
				.and()
				    .sessionManagement()
				    .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
				.and()
				    .addFilterBefore(jwtFilter(), UsernamePasswordAuthenticationFilter.class);
	}

	@Bean
	CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration().applyPermitDefaultValues();
		configuration.setAllowedMethods(Arrays.asList("POST", "GET", "PUT", "DELETE", "PATCH", "OPTIONS"));
		final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
		return source;
	}

}