package com.boas.posone.db.dto;

public class ClockIoInfoDto {
	private int clockIoNo;
	private int userNo;
	private int storeNo;
	private String clockInIp;
	private String clockInDate;
	private String clockInMemo;
	private String clockOutIp;
	private String clockOutDate;
	private String clockOutMemo;
	
	public ClockIoInfoDto() {
		
	}
	
	public ClockIoInfoDto(int clockIoNo, int userNo, int storeNo, String clockInIp, String clockInDate, String clockInMemo, String clockOutIp, String clockOutDate, String clockOutMemo) {
		this.clockIoNo = clockIoNo;
		this.userNo = userNo;
		this.storeNo = storeNo;
		this.clockInIp = clockInIp;
		this.clockInDate = clockInDate;
		this.clockInMemo = clockInMemo;
		this.clockOutIp = clockOutIp;
		this.clockOutDate = clockOutDate;
		this.clockOutMemo = clockOutMemo;
	}
	
	public int getClockIoNo() { return this.clockIoNo; }
	public void setClockIoNo(int clockIoNo) { this.clockIoNo = clockIoNo; }
	
	public int getUserNo() { return this.userNo; }
	public void setUserNo(int userNo) { this.userNo = userNo; }
	
	public int getStoreNo() { return this.storeNo; }
	public void setStoreNo(int storeNo) { this.storeNo = storeNo; }
	
	public String getClockInIp() { return this.clockInIp; }
	public void setClockInIp(String clockInIp) { this.clockInIp = clockInIp; }
	
	public String getClockInDate() { return this.clockInDate; }
	public void setClockInDate(String clockInDate) { this.clockInDate = clockInDate; }
	
	public String getClockInMemo() { return this.clockInMemo; }
	public void setClockInMemo(String clockInMemo) { this.clockInMemo = clockInMemo; }
	
	public String getClockOutIp() { return this.clockOutIp; }
	public void setClockOutIp(String clockOutIp) { this.clockOutIp = clockOutIp; }
	
	public String getClockOutDate() { return this.clockOutDate; }
	public void setClockOutDate(String clockOutDate) { this.clockOutDate = clockOutDate; }
	
	public String getClockOutMemo() { return this.clockOutMemo; }
	public void setClockOutMemo(String clockOutMemo) { this.clockOutMemo = clockOutMemo; }
	
	public String toJsonString() {
		StringBuffer sb = new StringBuffer();
		sb.append("{");
		sb.append(String.format("\"clockIoNo\":%d,",this.clockIoNo));
		sb.append(String.format("\"userNo\":%d,",this.userNo));
		sb.append(String.format("\"storeNo\":%d,",this.storeNo));
		if (this.clockInIp != null) {
			sb.append(String.format("\"clockInIp\":\"%s\",", this.clockInIp));
		}
		if (this.clockInDate != null) {
			sb.append(String.format("\"clockInDate\":\"%s\",", this.clockInDate));
		}
		if (this.clockInMemo != null) {
			sb.append(String.format("\"clockInMemo\":\"%s\",", this.clockInMemo));
		}
		if (this.clockOutIp != null) {
			sb.append(String.format("\"clockOutIp\":\"%s\",", this.clockOutIp));
		}
		if (this.clockOutDate != null) {
			sb.append(String.format("\"clockOutDate\":\"%s\",", this.clockOutDate));
		}
		if (this.clockOutMemo != null) {
			sb.append(String.format("\"clockOutMemo\":\"%s\",", this.clockOutMemo));
		}
		if (sb.lastIndexOf(",") == sb.length()-1) sb.deleteCharAt(sb.length()-1);
		sb.append("}");
		return sb.toString();
	}
}