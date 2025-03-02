package com.dooleyslab.Playground.repository;

import java.util.Set;
import java.util.TreeSet;

import org.springframework.stereotype.Component;

import com.dooleyslab.Playground.dto.User;

@Component
public class UserRepository {

	private Set<User> users = new TreeSet<>();
	
	public User save (User user) {
		if (users.size() == 0) {
			user.setId(1L);
		} else {
			User lastUser = ((TreeSet<User>)users).last();
			user.setId(lastUser.getId() + 1L);
		}
		users.add(user);
		return user;
	}
}
