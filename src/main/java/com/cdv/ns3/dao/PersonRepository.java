package com.cdv.ns3.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cdv.ns3.model.Person;

public interface PersonRepository extends JpaRepository<Person, Long> {

	public Person findByPersonName(String personName);
}
