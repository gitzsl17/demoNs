package com.cdv.ns3.repository;


import com.cdv.ns3.shiro.UserInfo;
import org.springframework.data.repository.CrudRepository;

public interface UserInfoRepository extends CrudRepository {

    //通过username查找用户
    public UserInfo findByUsername(String username);
}
