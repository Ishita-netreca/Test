package com.boas.posone.db.dto;

public class IssueTrackingDto {
	private int no;
	private int userNo;
	private int storeNo;
	private int status;
	private int ctgrNo;
	private int target;
	private int priority;
	private String createdDate;
	private String lastUpdatedDate;
	private String title;
	private String content;
	
	public IssueTrackingDto() {
		
	}
	
	public IssueTrackingDto(
		int no,
		int userNo,
		int storeNo,
		int status,
		int ctgrNo,
		int target,
		int priority,
		String createdDate,
		String lastUpdatedDate,
		String title,
		String content
	){
		this.no = no;
		this.userNo = userNo;
		this.storeNo = storeNo;
		this.status = status;
		this.ctgrNo = ctgrNo;
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
	
}
