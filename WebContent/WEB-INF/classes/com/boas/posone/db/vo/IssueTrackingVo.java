package com.boas.posone.db.vo;

public class IssueTrackingVo {
	public int no;
	public int status;
	public int categoryNo;
	public String category;
	public int targetNo;
	public String target;
	public int priority;
	public String lastUpdatedDate;
	public String title;
	public String content;
	public int ansCount;
	public int userNo;
	public String userName;
	
	public IssueTrackingVo(int no, int status, int categoryNo, int targetNo, int priority, String lastUpdatedDate, String title, String content, int ansCount, int userNo, String userName) {
		this.no = no;
		this.status = status;
		this.categoryNo = categoryNo;
		this.targetNo = targetNo;
		this.priority = priority;
		this.lastUpdatedDate = lastUpdatedDate;
		this.title = title;
		this.content = content;
		this.ansCount = ansCount;
		this.userNo = userNo;
		this.userName = userName;
	}

	public void removeAllMember() {
		this.no = 0;
		this.status = 0;
		this.categoryNo = 0;
		this.category = null;
		this.targetNo = 0;
		this.target = null;
		this.priority = 0;
		this.lastUpdatedDate = null;
		this.title = null;
		this.content = null;
		this.ansCount = 0;
		this.userNo = 0;
		this.userName = null;
	}
}
