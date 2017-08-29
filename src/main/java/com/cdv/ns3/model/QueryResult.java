package com.cdv.ns3.model;

import java.util.ArrayList;
import java.util.List;

/**
 * 通用翻页查询结果
 * 
 * @param <T>
 *            检索结果的具体对象类型
 */
public class QueryResult<T> {
	/** 结果集总条数 */
	private long totalCount;

	/** 当前页的内容 */
	private final List<T> items = new ArrayList<T>();

	public long getTotalCount() {
		return totalCount;
	}

	public void setTotalCount(long totalCount) {
		this.totalCount = totalCount;
	}

	public List<T> getItems() {
		return items;
	}

	public QueryResult(long totalCount, List<T> items) {
		this.totalCount = totalCount;
		this.items.addAll(items);
	}

	public QueryResult() {
	}
}
