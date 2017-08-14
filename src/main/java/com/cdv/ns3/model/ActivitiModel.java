package com.cdv.ns3.model;

public class ActivitiModel {
	/**
	 * 流程定义id
	 */
	private String proDefId;
	/**
	 * 流程定义的key
	 */
	private String key;
	/**
	 * 申请人
	 */
	private String name;
	/**
	 * 原因
	 */
	private String appPerson;
	/**
	 * 内容
	 */
	private String cause;
	/**
	 * 处理人，即下一个任务节点的受理人
	 */
	private String content;
	private String proPerson;
	
	public String getProDefId() {
		return proDefId;
	}
	public void setProDefId(String proDefId) {
		this.proDefId = proDefId;
	}
	public String getKey() {
		return key;
	}
	public void setKey(String key) {
		this.key = key;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getAppPerson() {
		return appPerson;
	}
	public void setAppPerson(String appPerson) {
		this.appPerson = appPerson;
	}
	public String getCause() {
		return cause;
	}
	public void setCause(String cause) {
		this.cause = cause;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String getProPerson() {
		return proPerson;
	}
	public void setProPerson(String proPerson) {
		this.proPerson = proPerson;
	}
	@Override
	public String toString() {
		return "ActivitiModel [proDefId=" + proDefId + ", key=" + key + ", name=" + name + ", appPerson=" + appPerson
				+ ", cause=" + cause + ", content=" + content + ", proPerson=" + proPerson + "]";
	}
	
}
