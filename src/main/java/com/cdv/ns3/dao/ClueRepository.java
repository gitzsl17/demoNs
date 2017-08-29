package com.cdv.ns3.dao;


import com.cdv.ns3.model.Clue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ClueRepository extends JpaRepository<Clue,Integer>,JpaSpecificationExecutor<Clue> {

    //根据id查找线索
    public Clue findClueById(String id);

    @Modifying
    @Query("select clueName from Clue where id in (:id)")
    public Integer findById(@Param("id") String id);
    
    @Query("select clueName from Clue where id = ?1 and clueName = ?2")
    public Clue getParam(String id,String name);
    
    //原生态查询	nativeQuery:表示是否打开原生态的查询
    @Query(nativeQuery=true,value="select count(id) from Clue")
    public Clue getCount();

    @Modifying
    @Query("delete from Clue where id = ?1")
	public Integer deleteById(String id);
    
}
