package com.cdv.ns3.service;

import com.cdv.ns3.repository.UserInfoRepository;
import com.cdv.ns3.shiro.UserInfo;

import javax.annotation.Resource;




public class UserInfoServiceImpl implements UserInfoService {

    @Resource
    private UserInfoRepository userInfoRepository;

    @Override
    public UserInfo findByUsername(String username){
        return userInfoRepository.findByUsername(username);
    }
}
