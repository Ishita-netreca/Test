package com.boas.posone.db.vo;

public class SalesTbStaffActRankVo {
	public int userNo;
	public int activationCount;
	public String userName;
	public String userId;
	public int accCount;
	public int paymentCount;
	public SalesTbStaffActRankVo(int userNo, int activationCount, String userName, String userId) {
		this.userNo = userNo;
		this.activationCount = activationCount;
		this.userName = userName;
		this.userId = userId;
	}

	public void removeAllMember() {
		this.userName = null;
		this.userId = null;
		this.userNo = 0;
		this.activationCount = 0;
		this.accCount = 0;
		this.paymentCount = 0;
	}
}
