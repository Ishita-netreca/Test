package com.boas.posone.db.dto;

public class IssueTbDto {
	private int no;
	private int userNo;
	private int storeNo;
	private int status;
	private int categoryNo;
	private int target;
	private int priority;
	private String createdDate;
	private String lastUpdatedDate;
	private String title;
	private String content;
	
	private String userName;
	private String targetUserName;
	private String categoryName;
	
	public IssueTbDto(int no, int userNo, int storeNo, int status, int categoryNo, int target, int priority, String createdDate, String lastUpdatedDate, String title, String content) {
		this.no = no;
		this.userNo = userNo;
		this.storeNo = storeNo;
		this.status = status;
		this.categoryNo = categoryNo;
		this.target = target;
		this.priority = priority;
		this.createdDate = createdDate;
		this.lastUpdatedDate = lastUpdatedDate;
		this.title = title;
		this.content = content;
	}
	
	public int getNo() { return this.no; }
	public void setNo(int no) { this.no = no; }
	
	public int getUserNo() { return this.userNo; }
	public void setUserNo(int userNo) { this.userNo = userNo; }
	
	public int getStoreNo() { return this.storeNo; }
	public void setStoreNo(int storeNo) { this.storeNo = storeNo; }
	
	public int getStatus() { return this.status; }
	public void setStatus(int status) { this.status = status; }
	
	public int getCategoryNo() { return this.categoryNo; }
	public void setCategoryNo(int categoryNo) { this.categoryNo = categoryNo; }
	
	public int getTarget() { return this.target; }
	public void setTarget(int target) { this.target = target; }
	
	public int getPriority() { return this.priority; }
	public void setPriority(int priority) { this.priority = priority; }
	
	public String getCreatedDate() { return this.createdDate; }
	public void setCreatedDate(String createdDate) { this.createdDate = createdDate; }
	
	public String getLastUpdatedDate() { return this.lastUpdatedDate; }
	public void setLastUpdatedDate(String lastUpdatedDate) { this.lastUpdatedDate = lastUpdatedDate; }
	
	public String getTitle() { return this.title; }
	public void setTitle(String title) { this.title = title; }
	
	public String getContent() { return this.content; }
	public void setContent(String content) { this.content = content; }
	
	public String getUserName() { return this.userName; }
	public void setUserName(String userName) { this.userName = userName; }
	
	public String getTargetUserName() { return this.targetUserName; }
	public void setTargetUserName(String targetUserName) { this.targetUserName = targetUserName; }
	
	public String getCategoryName() { return this.categoryName; }
	public void setCategoryName(String categoryName) { this.categoryName = categoryName; }
}
