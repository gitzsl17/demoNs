package com.cdv.ns3.service;

import org.springframework.beans.factory.annotation.Autowired;

import com.cdv.ns3.dao.ElasticSearchRepository;
import com.cdv.ns3.model.Clue;

public class ElasticSearchService {
	
	@Autowired
	private ElasticSearchRepository elasticSearchRepository;
	
	public void add (Clue clue){
		elasticSearchRepository.save(clue);
	}

}
