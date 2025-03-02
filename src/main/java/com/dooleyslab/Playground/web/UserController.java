package com.dooleyslab.Playground.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.dooleyslab.Playground.dto.User;
import com.dooleyslab.Playground.service.UserService;

@RestController
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@PostMapping("/users")
	public User createUser (@RequestBody String name) {
		return userService.createUser(name);
	}
}
