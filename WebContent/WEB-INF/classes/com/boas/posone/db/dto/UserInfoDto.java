package com.boas.posone.db.dto;

public class UserInfoDto {
	private int userNo;
	private String userName;
	private int storeNo;
	private String userId;
	private String password;
	private String phone;
	private String email;
	private int position;
	private int disable;

	public UserInfoDto() { }
	public UserInfoDto(int userNo, String userName, int storeNo, String userId, String phone, String email, int position, int disable) {
		this.userNo = userNo;
		this.userName = userName;
		this.storeNo = storeNo;
		this.userId = userId;
		this.phone = phone;
		this.email = email;
		this.position = position;
		this.disable = disable;
	}

	public int getUserNo() { return this.userNo; }
	public void setUserNo(int userNo) { this.userNo = userNo; }

	public String getUserName() { return this.userName; }
	public void setUserName(String userName) { this.userName = userName; }

	public int getStoreNo() { return this.storeNo; }
	public void setStoreNo(int storeNo) { this.storeNo = storeNo; }

	public String getUserId() { return this.userId; }
	public void setUserId(String userId) { this.userId = userId; }
	
	public String getPassword() { return this.password; }
	public void setPassword(String password) { this.password = password; }

	public String getPhone() { return this.phone; }
	public void setPhone(String phone) { this.phone = phone; }

	public String getEmail() { return this.email; }
	public void setEmail(String email) { this.email = email; }

	public int getPosition() { return this.position; }
	public void setPosition(int position) { this.position = position; }

	public int getDisable() { return this.disable; }
	public void setDisable(int disable) { this.disable = disable; }

	public String toJsonString() {
		StringBuffer sb = new StringBuffer();
		sb.append("{");
		sb.append(String.format("\"userNo\":%d,",this.userNo));
		if (this.userName != null) sb.append(String.format("\"userName\":\"%s\",",this.userName));
		sb.append(String.format("\"storeNo\":%d,",this.storeNo));
		if (this.userId != null) sb.append(String.format("\"userId\":\"%s\",",this.userId));
		if (this.phone != null) sb.append(String.format("\"phone\":\"%s\",",this.phone));
		if (this.email != null) sb.append(String.format("\"email\":\"%s\",",this.email));
		sb.append(String.format("\"position\":%d,",this.position));
		sb.append(String.format("\"disable\":%d,",this.disable));
		if(sb.lastIndexOf(",") == sb.length() -1 ) sb.deleteCharAt(sb.length()-1);
		sb.append("}");
		return sb.toString();
	}
}