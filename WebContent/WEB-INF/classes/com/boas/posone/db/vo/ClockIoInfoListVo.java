package com.boas.posone.db.vo;

public class ClockIoInfoListVo {
	private int clockIoNo;
	private int userNo;
	private String clockIoDate;
	private String clockInTime;
	private String clockOutTime;
	private String clockInMemo;
	private String userId;
	private String userName;

	public ClockIoInfoListVo() { }
	public ClockIoInfoListVo(int clockIoNo, int userNo, String clockIoDate, String clockInTime, String clockOutTime, String clockInMemo, String userId, String userName) {
		this.clockIoNo = clockIoNo;
		this.userNo = userNo;
		this.clockIoDate = clockIoDate;
		this.clockInTime = clockInTime;
		this.clockOutTime = clockOutTime;
		this.clockInMemo = clockInMemo;
		this.userId = userId;
		this.userName = userName;
	}

	public int getClockIoNo() { return this.clockIoNo; }
	public void setClockIoNo(int clockIoNo) { this.clockIoNo = clockIoNo; }

	public int getUserNo() { return this.userNo; }
	public void setUserNo(int userNo) { this.userNo = userNo; }

	public String getClockIoDate() { return this.clockIoDate; }
	public void setClockIoDate(String clockIoDate) { this.clockIoDate = clockIoDate; }

	public String getClockInTime() { return this.clockInTime; }
	public void setClockInTime(String clockInTime) { this.clockInTime = clockInTime; }

	public String getClockOutTime() { return this.clockOutTime; }
	public void setClockOutTime(String clockOutTime) { this.clockOutTime = clockOutTime; }

	public String getClockInMemo() { return this.clockInMemo; }
	public void setClockInMemo(String clockInMemo) { this.clockInMemo = clockInMemo; }

	public String getUserId() { return this.userId; }
	public void setUserId(String userId) { this.userId = userId; }

	public String getUserName() { return this.userName; }
	public void setUserName(String userName) { this.userName = userName; }


	public String toJsonString() {
		StringBuffer sb = new StringBuffer();
		sb.append("{");
		sb.append(String.format("\"clockIoNo\":%d,",this.clockIoNo));
		sb.append(String.format("\"userNo\":%d,",this.userNo));
		if (this.clockIoDate != null) sb.append(String.format("\"clockIoDate\":\"%s\",",this.clockIoDate));
		if (this.clockInTime != null) sb.append(String.format("\"clockInTime\":\"%s\",",this.clockInTime));
		if (this.clockOutTime != null) sb.append(String.format("\"clockOutTime\":\"%s\",",this.clockOutTime));
		if (this.clockInMemo != null) sb.append(String.format("\"clockInMemo\":\"%s\",",this.clockInMemo));
		if (this.userId != null) sb.append(String.format("\"userId\":\"%s\",",this.userId));
		if (this.userName != null) sb.append(String.format("\"userName\":\"%s\",",this.userName));
		if(sb.lastIndexOf(",") == sb.length() -1 ) sb.deleteCharAt(sb.length()-1);
		sb.append("}");
		return sb.toString();
	}

}