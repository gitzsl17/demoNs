package com.cdv.ns3.utils;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.util.HashMap;
import java.util.Map;


public class WordGenerator {
	private static Configuration configuration = null;
	private static Map<String, Template> allTemplates = null;

	static {
		configuration = new Configuration(Configuration.VERSION_2_3_23);
		configuration.setDefaultEncoding("utf-8");
		configuration.setClassForTemplateLoading(WordGenerator.class, "template");
		allTemplates = new HashMap<>(); // Java 7 钻石语法
		try {
			allTemplates.put(AssetType.CLUE.toString(), configuration.getTemplate("clue.ftl"));
			allTemplates.put(AssetType.TITLE.toString(), configuration.getTemplate("title.ftl"));
			allTemplates.put(AssetType.TOPIC.toString(), configuration.getTemplate("topic.ftl"));
		} catch (IOException e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		}
	}

	public static File createDoc(Map<?, ?> dataMap, AssetType assetType) throws TemplateException, IOException {
		String name = assetType.toString() + (int) (Math.random() * 100000) + ".doc";
		File f = new File(name);
		Template t = allTemplates.get(assetType.toString());

		// 这个地方不能使用FileWriter因为需要指定编码类型否则生成的Word文档会因为有无法识别的编码而无法打开
		Writer w = new OutputStreamWriter(new FileOutputStream(f), "utf-8");
		t.process(dataMap, w);
		w.close();

		return f;
	}
}
