package com.cdv.ns3.controller;

import org.activiti.engine.ProcessEngineConfiguration;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ActivitiController {
	
	@PostMapping("/createTables")
	public void createTables(){
		ProcessEngineConfiguration conf = ProcessEngineConfiguration.createStandaloneInMemProcessEngineConfiguration();
		conf.buildProcessEngine();
	}
}
