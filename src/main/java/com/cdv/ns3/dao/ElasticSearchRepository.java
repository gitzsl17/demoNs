package com.cdv.ns3.dao;


import com.cdv.ns3.model.Clue;

import org.springframework.data.elasticsearch.repository.ElasticsearchCrudRepository;

public interface ElasticSearchRepository extends ElasticsearchCrudRepository<Clue, Integer> {

    
}
