package com.dooleyslab.Playground.repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.stereotype.Component;

import com.dooleyslab.Playground.dto.Message;

@Component
public class MessageRepository {
	private Map<Long, List<Message>> messages = new HashMap<>();
	
	public Optional<List<Message>> findMessagesByChannel (Long channelId) {
		List<Message> messagesByChannel = messages.get(channelId);
		return Optional.ofNullable(messagesByChannel);
	}
	
	public void saveMessagesByChannel(Long channelId, List<Message> messagesByChannel) {
		messages.put(channelId, messagesByChannel);
	}
}
