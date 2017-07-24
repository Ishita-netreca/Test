package com.boas.posone.db.vo;

public class UserInfoEmpListVo {
	private int userNo;
	private String userId;
	private String userName;
	private String email;
	private String phone;
	private int position;
	private String positionName;

	public UserInfoEmpListVo() { }
	public UserInfoEmpListVo(int userNo, String userId, String userName, String email, String phone, int position, String positionName) {
		this.userNo = userNo;
		this.userId = userId;
		this.userName = userName;
		this.email = email;
		this.phone = phone;
		this.position = position;
		this.positionName = positionName;
	}

	public int getUserNo() { return this.userNo; }
	public void setUserNo(int userNo) { this.userNo = userNo; }
	
	public String getUserId() { return this.userId; }
	public void setUserId(String userId) { this.userId = userId; }

	public String getUserName() { return this.userName; }
	public void setUserName(String userName) { this.userName = userName; }

	public String getEmail() { return this.email; }
	public void setEmail(String email) { this.email = email; }

	public String getPhone() { return this.phone; }
	public void setPhone(String phone) { this.phone = phone; }

	public int getPosition() { return this.position; }
	public void setPosition(int position) { this.position = position; }

	public String getPositionName() { return this.positionName; }
	public void setPositionName(String positionName) { this.positionName = positionName; }


	public String toJsonString() {
		StringBuffer sb = new StringBuffer();
		sb.append("{");
		sb.append(String.format("\"userNo\":%d,",this.userNo));
		if (this.userId != null) sb.append(String.format("\"userId\":\"%s\",",this.userId));
		if (this.userName != null) sb.append(String.format("\"userName\":\"%s\",",this.userName));
		if (this.email != null) sb.append(String.format("\"email\":\"%s\",",this.email));
		if (this.phone != null) sb.append(String.format("\"phone\":\"%s\",",this.phone));
		sb.append(String.format("\"position\":%d,",this.position));
		if (this.positionName != null) sb.append(String.format("\"positionName\":\"%s\",",this.positionName));
		if(sb.lastIndexOf(",") == sb.length() -1 ) sb.deleteCharAt(sb.length()-1);
		sb.append("}");
		return sb.toString();
	}
}
