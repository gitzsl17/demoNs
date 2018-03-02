package com.cdv.ns3.dao;

import org.springframework.data.repository.CrudRepository;

import com.cdv.ns3.bean.UserInfo;

/**
 * UserInfo持久化类;
 */
public interface UserInfoRepository extends CrudRepository<UserInfo,Long>{
	
	/**通过username查找用户信息;*/
	public UserInfo findByUsername(String username);
	
}
