package com.cdv.ns3.controller;

import com.cdv.ns3.model.Clue;
import com.cdv.ns3.service.ClueService;
import com.cdv.ns3.utils.UUIDUtils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

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

    @RequestMapping(value = "/deleteById", method = RequestMethod.DELETE)
    public Integer deleteById(@RequestParam(value = "moId", required = true) String id){
        return clueService.deleteById(id);
    }
    
    //导出word
    @RequestMapping(value = "/doc", method = RequestMethod.GET)
	public void downloadDoc(HttpServletRequest req, HttpServletResponse resp, @RequestParam("moId") String moId,
			@RequestParam("assetType") AssetType assetType) {
		String userId = SecurityHelper.getCurrentUserId();
		// 提示：在调用工具类生成Word文档之前应当检查所有字段是否完整
		// 否则Freemarker的模板引擎在处理时可能会因为找不到值而报错 这里暂时忽略这个步骤了
		String stationId = SecurityHelper.getCurrentStationId();
		java.io.File file = null;
		InputStream fin = null;
		ServletOutputStream out = null;
		StringBuffer authorStr = new StringBuffer();
		StringBuffer correspondentStr = new StringBuffer();
		List<User> listUsers = _nsUserApi.findAllUsers(stationId);
		try {
			req.setCharacterEncoding("utf-8");
			MObject mo = _moApi.get(userId, moId, false, null);
			Map<String, Object> map = mo.getExtraData();
			map.put("assetName", mo.getName());
			String createdBy = mo.getCreatedBy();
			if (createdBy != null && createdBy.length() > 0) {
				for (User user : listUsers) {
					if (createdBy.equals(user.getId())) {
						map.put("createdBy", user.getName());
					}
				}
			} else {
				map.put("createdBy", createdBy);
			}
			String author = map.get("author") == null ? "" : map.get("author").toString();
			if (author != null && author.length() > 2) {
				author = author.substring(1, author.length() - 1);
				String[] authorArr = author.split(",");
				for (int i = 0; i < authorArr.length; i++) {
					for (User user : listUsers) {
						if (authorArr[i].trim().equals(user.getId())) {
							authorStr.append(user.getName() + ",");
						}
					}
				}
				map.put("author", authorStr.toString().substring(0, authorStr.toString().lastIndexOf(",")));
			} else {
				map.put("author", "");
			}
			if (map.get("createdTo") == null) {
				map.put("createdTo", "");
			}
			String correspondent = map.get("correspondent") == null ? "" : map.get("correspondent").toString();
			if (correspondent != null && correspondent.length() > 2) {
				correspondent = correspondent.substring(1, correspondent.length() - 1);
				String[] correspondentArr = correspondent.split(",");
				for (int i = 0; i < correspondentArr.length; i++) {
					for (User user : listUsers) {
						if (correspondentArr[i].trim().equals(user.getId())) {
							correspondentStr.append(user.getName() + ",");
						}
					}
				}
				map.put("correspondent",
						correspondentStr.toString().substring(0, correspondentStr.toString().lastIndexOf(",")));
			} else {
				map.put("correspondent", "");
			}
			String assetname = mo.getName();
			// 调用工具类WordGenerator的createDoc方法生成Word文档
			file = WordGenerator.createDoc(map, assetType);
			fin = new FileInputStream(file);

			resp.setCharacterEncoding("utf-8");
			resp.setContentType("application/msword");
			// 设置浏览器以下载的方式处理该文件默认名为resume.doc
			String fileName = (StringUtils.hasLength(assetname) ? assetname : "untitled") + ".doc";
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
}
