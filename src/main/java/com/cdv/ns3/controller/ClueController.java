package com.cdv.ns3.controller;

import com.cdv.ns3.common.Constants.AssetType;
import com.cdv.ns3.model.Clue;
import com.cdv.ns3.model.QueryResult;
import com.cdv.ns3.service.ClueService;
import com.cdv.ns3.utils.UUIDUtils;
import com.cdv.ns3.utils.WordGenerator;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import java.io.FileInputStream;
import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class ClueController {
	
	private static final Logger logger = LoggerFactory.getLogger(ClueController.class);

    @Autowired
    private ClueService clueService;

    /**
     * 查找所有
     * @return List
     */
    @PostMapping("/findAll")
    public List<Clue> queryClue() {
        return clueService.clueList();
    }


    /**
     * 新增
     * @return Clue
     */
    @PostMapping("/add")
    public Clue add(@RequestBody Clue clue, BindingResult bindingResult){
    	if (clue.getId() == null) {
    		UUIDUtils uuidUtils = new UUIDUtils();
    		clue.setId(uuidUtils.creatUUID());
		}else {
			clue.setId(clue.getId());
		}
        clue.setCreatedBy(clue.getCreatedBy());
        clue.setCreatedTime(clue.getCreatedTime());
        clue.setAuthorName(clue.getAuthorName());
        clue.setContent(clue.getContent());
        clue.setClueName(clue.getClueName());
        clue.setEditStatus(clue.getEditStatus());

        return clueService.add(clue);
    }

    //@RequestMapping("/findById")
    @PostMapping("/findById")
    public Clue findById(@RequestParam String id){
        return clueService.findById(id);
    }

    //上传
    @PostMapping("/update")
    public Clue update(@RequestBody Clue clue){
        clue.setId(clue.getId());
        clue.setClueName(clue.getClueName());
        clue.setCreatedTime(clue.getCreatedTime());
        clue.setContent(clue.getContent());
        clue.setCreatedBy(clue.getCreatedBy());
        clue.setEditStatus(clue.getEditStatus());
        clue.setAuthorName(clue.getAuthorName());

        return clueService.update(clue);
    }

    @RequestMapping(value = "/deleteById", method = RequestMethod.GET)
    public Integer deleteById(@RequestParam(value = "moId", required = true) String id){
        return clueService.deleteById(id);
    }
    
    //导出word
    @RequestMapping(value = "/doc", method = RequestMethod.GET)
	public void downloadDoc(HttpServletRequest req, HttpServletResponse resp, @RequestParam("moId") String moId,AssetType assetType) {
		java.io.File file = null;
		InputStream fin = null;
		ServletOutputStream out = null;
		try {
			req.setCharacterEncoding("utf-8");
			Clue clue = clueService.findById(moId);
			Map<String, Object> map = new HashMap<>();
			map.put("clueName", clue.getClueName());
			map.put("content", clue.getContent());
			/*if (clue.getCreatedBy() != "" && clue.getCreatedBy() != null) {
				map.put("createdBy", clue.getCreatedBy());
			}*/
			// 调用工具类WordGenerator的createDoc方法生成Word文档
			file = WordGenerator.createDoc(map,assetType);
			fin = new FileInputStream(file);

			resp.setCharacterEncoding("utf-8");
			resp.setContentType("application/msword");
			// 设置浏览器以下载的方式处理该文件默认名为resume.doc
			String fileName = (StringUtils.hasLength(clue.getClueName()) ? clue.getClueName() : "untitled") + ".doc";
			fileName = new String(fileName.getBytes("UTF-8"), "ISO_8859_1");
			resp.addHeader("Content-Disposition", "attachment;filename=" + fileName);
			out = resp.getOutputStream();
			byte[] buffer = new byte[512]; // 缓冲区
			int bytesToRead = -1;
			// 通过循环将读入的Word文件的内容输出到浏览器中
			while ((bytesToRead = fin.read(buffer)) != -1) {
				out.write(buffer, 0, bytesToRead);
			}
			out.flush();
			fin.close();
		} catch (Throwable t) {
			logger.error("打印资产word文档报错", t);
		} finally {
			try {
				if (fin != null)
					fin.close();
				if (out != null)
					out.close();
				if (file != null)
					file.delete(); // 删除临时文件
			} catch (Exception e) {
				logger.error("打印word文档关闭必要的资源报错!", e);
			}

		}
	}
    
    @RequestMapping(value="/searchAssets", method = RequestMethod.POST)
    public QueryResult<Clue> searchAssets(Integer page,Integer size){
    	List<Clue> clueList = clueService.clueList();
    	Page<Clue> pagenation = clueService.getPagenation(page, size);
    	QueryResult<Clue> queryResult = new QueryResult<>(pagenation.getTotalElements(),clueList);
    	return queryResult;
    }
}







