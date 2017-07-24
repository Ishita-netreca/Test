package com.boas.posone.db.dto;

public class PositionInfoDto{
	private int positionNo;
	private String positionName;

	public PositionInfoDto() { }
	public PositionInfoDto(int positionNo, String positionName) {
		this.positionNo = positionNo;
		this.positionName = positionName;
	}

	public int getPositionNo() { return this.positionNo; }
	public void setPositionNo(int positionNo) { this.positionNo = positionNo; }

	public String getPositionName() { return this.positionName; }
	public void setPositionName(String positionName) { this.positionName = positionName; }


	public String toJsonString() {
		StringBuffer sb = new StringBuffer();
		sb.append("{");
		sb.append(String.format("\"positionNo\":%d,",this.positionNo));
		if (this.positionName != null) sb.append(String.format("\"positionName\":\"%s\",",this.positionName));
		if(sb.lastIndexOf(",") == sb.length() -1 ) sb.deleteCharAt(sb.length()-1);
		sb.append("}");
		return sb.toString();
	}

}