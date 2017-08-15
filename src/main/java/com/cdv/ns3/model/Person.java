package com.cdv.ns3.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class Person {

	@Id
	@GeneratedValue
	private Long personId;
	
	private String personeName;
	
	@ManyToOne(targetEntity = Comp.class)
	private Comp comp;
	
	public Person(){
		
	};
	
	public Person(String personName){
		super();
		this.personeName = personName;
	}

	//get,set
	public Long getPersonId() {
		return personId;
	}

	public void setPersonId(Long personId) {
		this.personId = personId;
	}

	public String getPersoneName() {
		return personeName;
	}

	public void setPersoneName(String personeName) {
		this.personeName = personeName;
	}
	public Comp getComp() {
		return comp;
	}

	public void setComp(Comp comp) {
		this.comp = comp;
	};
}
