package com.cdv.ns3.dao;


import com.cdv.ns3.model.Clue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ClueRepository extends JpaRepository<Clue,Integer> {

    //根据id查找线索
    public Clue findClueById(String id);

    @Modifying
    @Query("delete from Clue where id in (:id)")
    public Integer deleteById(@Param("id") String id);
    
}
