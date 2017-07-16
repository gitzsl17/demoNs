package com.cdv.ns3.rs;

import com.cdv.ns3.model.Clue;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;


public interface ClueRS {

    @RequestMapping(value = "/query")
    @ResponseBody
    public Clue queryClue(@RequestParam(value = "id", required = true) String id);

    @RequestMapping(value = "/delete",method = RequestMethod.POST)
    @ResponseBody
    public void deleteClue(@RequestParam(value = "id", required = true) String id);

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    @ResponseBody
    public Clue addClue(@RequestParam(value = "id", required = true) String id);

}
