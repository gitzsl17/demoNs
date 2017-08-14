package com.cdv.ns3.controller;

import org.activiti.engine.ProcessEngine;
import org.activiti.engine.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ActivitiController {
	
	@Autowired
	private TaskService taskService;
	
	@Autowired
	private ProcessEngine processEngine;
	
	@RequestMapping("/task")
	public String task(){
		return taskService.toString();
	}
	
	@RequestMapping("/xxx")
	public String index(){
		return "xxxxx";
	}
}
