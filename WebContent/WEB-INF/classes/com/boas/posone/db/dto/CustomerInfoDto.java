package com.boas.posone.db.dto;

public class CustomerInfoDto{
	private int accountNo;
	private int storeNo;
	private String customerName;
	private String address;
	private String phone;
	private String company;

	public CustomerInfoDto() { }
	public CustomerInfoDto(int accountNo, int storeNo, String customerName, String address, String phone, String company) {
		this.accountNo = accountNo;
		this.storeNo = storeNo;
		this.customerName = customerName;
		this.address = address;
		this.phone = phone;
		this.company = company;
	}

	public int getAccountNo() { return this.accountNo; }
	public void setAccountNo(int accountNo) { this.accountNo = accountNo; }
	
	public int getStoreNo() { return this.storeNo; }
	public void setStoreNo(int storeNo) { this.storeNo = storeNo; }

	public String getCustomerName() { return this.customerName; }
	public void setCustomerName(String customerName) { this.customerName = customerName; }

	public String getAddress() { return this.address; }
	public void setAddress(String address) { this.address = address; }

	public String getPhone() { return this.phone; }
	public void setPhone(String phone) { this.phone = phone; }

	public String getCompany() { return this.company; }
	public void setCompany(String company) { this.company = company; }


	public String toJsonString() {
		StringBuffer sb = new StringBuffer();
		sb.append("{");
		sb.append(String.format("\"accountNo\":%d,",this.accountNo));
		sb.append(String.format("\"storeNo\":%d,",this.storeNo));
		if (this.customerName != null) sb.append(String.format("\"customerName\":\"%s\",",this.customerName));
		if (this.address != null) sb.append(String.format("\"address\":\"%s\",",this.address));
		if (this.phone != null) sb.append(String.format("\"phone\":\"%s\",",this.phone));
		if (this.company != null) sb.append(String.format("\"company\":\"%s\",",this.company));
		if(sb.lastIndexOf(",") == sb.length() -1 ) sb.deleteCharAt(sb.length()-1);
		sb.append("}");
		return sb.toString();
	}

}
