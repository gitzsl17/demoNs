package com.cdv.ns3.service;

import com.cdv.ns3.dao.ClueRepository;
import com.cdv.ns3.model.Clue;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Order;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.util.List;


@Service
public class ClueService {
	
	private final Logger logger = LoggerFactory.getLogger(getClass());

    @Autowired
    private ClueRepository clueRepository;

    public List<Clue> clueList(){
        return clueRepository.findAll();
    }

    @Transactional
    public Clue add(Clue clue){
        return clueRepository.save(clue);
    }

    public Clue findById(String id){
        return clueRepository.findClueById(id);
    }

    public Clue update(Clue clue){
        return clueRepository.saveAndFlush(clue);
    }

    @Transactional
    public Integer deleteById(String id){
        return clueRepository.deleteById(id);
    }
    
    public Long getCount(){
    	return clueRepository.count();
    }

    //分页查询,JpaRepository继承了PagingAndSortingRepository
    public Page<Clue> getPagenation(Integer page,Integer size){
    	
    	//page:表示第几页(从0开始);	size:每页显示条数
    	Pageable pageable = new PageRequest(page, size);
    	Page<Clue> pages = clueRepository.findAll(pageable);
    	logger.info("查询总页数:{}",pages.getTotalPages());
    	logger.info("查询总记录数:{}", pages.getTotalElements());
    	logger.info("查询当前第几页:{}",pages.getNumber());
    	logger.info("查询当前页面的集合:",pages.getContent());
    	logger.info("查询当前页面的记录数:",pages.getNumberOfElements());
    	return pages;
    };
    
    //排序
    public void getSortAndPage(Integer page,Integer size){
    	Order orders = new Order(Sort.Direction.DESC, "id");		//根据某个字段(id)升序或者降序
    	Sort sort = new Sort(orders);
    	Pageable pageable = new PageRequest(page, size, sort);
    }
    
    //分页排序 + 过滤条件
    public void getFilter(Integer page,Integer size){
    	
    	Order orders = new Order(Sort.Direction.DESC, "id");		//根据某个字段(id)升序或者降序
    	Sort sort = new Sort(orders);
    	Pageable pageable = new PageRequest(page, size, sort);
    }
    
    public static void main(String[] args){
    	System.out.println(File.separator);	// 使用于各种系统下的层及目录分割符("/","\")
    }
    
}
