package com.cdv.ns3.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdv.ns3.bean.UserInfo;
import com.cdv.ns3.dao.UserInfoRepository;

@Service
public class UserInfoService {
	
	@Autowired
	private UserInfoRepository userInfoRepository;
	
	/**通过username查找用户信息;*/
	public UserInfo findByUsername(String username){
		return userInfoRepository.findByUsername(username);
	};
	
}
