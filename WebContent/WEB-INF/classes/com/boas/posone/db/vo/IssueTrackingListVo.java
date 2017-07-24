package com.boas.posone.db.vo;

import java.lang.reflect.Field;
import java.lang.reflect.Modifier;

import com.boas.posone.util.UtilMethodClass;

// SELECT `ab`.*, `c`.`ans_count` FROM ( SELECT `a`.*,`b`.`ctgr_name` FROM (SELECT `no`,`user_no`,`store_no`,`status`,`ctgr_no`,`target`,`priority`,DATE_FORMAT(`last_updated_date`,'%Y-%m-%d %H:%i:%s') as `last_updated_date`,`title`,`content` FROM `issue_tracking` WHERE `store_no`='4' LIMIT 0,10) AS `a` LEFT JOIN `issue_tracking_ctgr` as `b` on `a`.`ctgr_no`=`b`.`no`) as `ab` LEFT JOIN (SELECT `issue_no`, COUNT(`issue_no`) AS `ans_count` FROM `issue_tracking_ans` GROUP BY `issue_no`) as `c` on `ab`.`no`=`c`.`issue_no` ORDER BY `last_updated_date` desc
// userName, targetName은 따로 로드해야함
public class IssueTrackingListVo {
	private int no;
	private int userNo;
	private int storeNo;
	private int status;
	private int ctgrNo;
	private int target;
	private int priority;
	private String lastUpdatedDate;
	private String title;
	private String content;
	
	private String ctgrName;
	private int ansCount;
	
	private String userName;
	private String targetName;
	
	public IssueTrackingListVo() {
		
	}
	
	public IssueTrackingListVo(
		int no,
		int userNo,
		int storeNo,
		int status,
		int ctgrNo,
		int target,
		int priority,
		String lastUpdatedDate,
		String title,
		String content,
		String ctgrName,
		int ansCount
	) {
		this.no = no;
		this.userNo = userNo;
		this.storeNo = storeNo;
		this.status = status;
		this.ctgrNo = ctgrNo;
		this.target = target;
		this.priority = priority;
		this.lastUpdatedDate = lastUpdatedDate;
		this.title = title;
		this.content = content;
		this.ctgrName = ctgrName;
		this.ansCount = ansCount;
	}
	
	public int getNo() { return this.no; }
	public void setNo(int no) { this.no = no; }
	
	public int getUserNo() { return this.userNo; }
	public void setUserNo(int userNo) { this.userNo = userNo; }
	
	public int getStoreNo() { return this.storeNo; }
	public void setStoreNo(int storeNo) { this.storeNo = storeNo; }
	
	public int getStatus() { return this.status; }
	public void setStatus(int status) { this.status = status; }
	
	public int getCtgrNo() { return this.ctgrNo; }
	public void setCtgrNo(int ctgrNo) { this.ctgrNo = ctgrNo; }
	
	public int getTarget() { return this.target; }
	public void setTarget(int target) { this.target = target; }
	
	public int getPriority() { return this.priority; }
	public void setPriority(int priority) { this.priority = priority; }
	
	public String getLastUpdatedDate() { return this.lastUpdatedDate; }
	public void setLastUpdatedDate(String lastUpdatedDate) { this.lastUpdatedDate = lastUpdatedDate; }
	
	public String getTitle() { return this.title; }
	public void setTitle(String title) { this.title = title; }
	
	public String getContent() { return this.content; }
	public void setContent(String content) { this.content = content; }
	
	public String getCtgrName() { return this.ctgrName; }
	public void setCtgrName(String ctgrName) { this.ctgrName = ctgrName; }
	
	public int getAnsCount() { return this.ansCount; }
	public void setAnsCount(int ansCount) { this.ansCount = ansCount; }
	
	public String getUserName() { return this.userName; }
	public void setUserName(String userName) { this.userName = userName; }
	
	public String getTargetName() { return this.targetName; }
	public void setTargetName(String targetName) { this.targetName = targetName; }
	
	public String toJsonString() {
		StringBuffer sb = new StringBuffer();
		sb.append("{");		
		sb.append(String.format("\"no\":%d,",this.no));
		sb.append(String.format("\"user_no\":%d,",this.userNo));
		sb.append(String.format("\"store_no\":%d,",this.storeNo));
		sb.append(String.format("\"status\":%d,",this.status));
		sb.append(String.format("\"ctgr_no\":%d,",this.ctgrNo));
		sb.append(String.format("\"target\":%d,",this.target));
		sb.append(String.format("\"priority\":%d,",this.priority));
		if (this.lastUpdatedDate != null) {
			sb.append(String.format("\"last_updated_date\":\"%s\",",this.lastUpdatedDate));			
		}
		if (this.title != null) {
			sb.append(String.format("\"title\":\"%s\",",UtilMethodClass.getSingleton().convertPlainTextToHtmlText(this.title)));			
		}
		if (this.content != null) {
			if (this.content.length() > 30) {
				this.content = this.content.substring(0, 30);
			}
			sb.append(String.format("\"content\":\"%s\",",UtilMethodClass.getSingleton().convertPlainTextToHtmlText(this.content)));			
		}
		if (this.ctgrName != null) {
			sb.append(String.format("\"ctgr_name\":\"%s\",",this.ctgrName));			
		}
		sb.append(String.format("\"ans_count\":%d,",this.ansCount));
		if (this.userName != null) {
			sb.append(String.format("\"user_name\":\"%s\",",this.userName));			
		}
		if (this.targetName != null) {
			sb.append(String.format("\"target_name\":\"%s\",",this.targetName));			
		}
		if (sb.lastIndexOf(",") == sb.length() -1) sb.deleteCharAt(sb.length()-1);
		sb.append("}");
		return sb.toString();
	}
	
}