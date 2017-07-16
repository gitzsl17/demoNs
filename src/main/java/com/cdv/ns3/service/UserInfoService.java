package com.cdv.ns3.service;


import com.cdv.ns3.shiro.UserInfo;

public interface UserInfoService {
    public UserInfo findByUsername(String username);
}
