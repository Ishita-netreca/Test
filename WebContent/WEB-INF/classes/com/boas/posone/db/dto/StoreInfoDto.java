package com.boas.posone.db.dto;

public class StoreInfoDto {
	private int storeNo;
	private String storeId;
	private String regionCode;
	private String storeCode;
	private String storeName;
	private String address;
	private String phone;
	private String fax;
	private String manager;
	private String managerPhone;
	private String message;
	
	public StoreInfoDto() {
		
	}
	
	public StoreInfoDto(
			int storeNo, String storeId, String regionCode, String storeCode, 
			String storeName, String address, String Phone, String fax,
			String manager, String managerPhone, String message) {
		this.storeNo = storeNo;
		this.storeId = storeId;
		this.regionCode = regionCode;
		this.storeCode = storeCode;
		this.storeName = storeName;
		this.address = address;
		this.phone = phone;
		this.fax = fax;
		this.manager = manager;
		this.managerPhone = managerPhone;
		this.message = message;
	}
	
	public int getStoreNo() { return this.storeNo; }
	public void setStoreNo(int storeNo) { this.storeNo = storeNo; }
	
	public String getStoreId() { return this.storeId; }
	public void setStoreId(String storeId) { this.storeId = storeId; }
	
	public String getRegionCode() { return this.regionCode; }
	public void setRegionCode(String regionCode) { this.regionCode = regionCode; }
	
	public String getStoreCode() { return this.storeCode; }
	public void setStoreCode(String storeCode) { this.storeCode = storeCode; }
	
	public String getStoreName() { return this.storeName; }
	public void setStoreName(String storeName) { this.storeName = storeName; }
	
	public String getAddress() { return this.address; }
	public void setAddress(String address) { this.address = address; }
	
	public String getPhone() { return this.phone; }
	public void setPhone(String phone) { this.phone = phone; }
	
	public String getFax() { return this.fax; }
	public void setFax(String fax) { this.fax = fax; }
	
	public String getManager() { return this.manager; }
	public void setManager(String manager) { this.manager = manager; }
	
	public String getManagerPhone() { return this.managerPhone; }
	public void setManagerPhone(String managerPhone) { this.managerPhone = managerPhone; }
	
	public String getMessage() { return this.message; }
	public void setMessage(String message) { this.message = message; }
	
	public String toJsonString() {
		StringBuffer sb = new StringBuffer();
		sb.append("{");
		sb.append(String.format("\"store_no\":%d,", this.storeNo));
		if (this.storeId != null) {
			sb.append(String.format("\"store_id\":\"%s\",", this.storeId));
		}
		if (this.regionCode != null) {
			sb.append(String.format("\"region_code\":\"%s\",", this.regionCode));
		}
		if (this.storeCode != null) {
			sb.append(String.format("\"store_code\":\"%s\",", this.storeCode));
		}
		if (this.storeName != null) {
			sb.append(String.format("\"store_name\":\"%s\",", this.storeName));
		}
		if (this.address != null) {
			sb.append(String.format("\"address\":\"%s\",", this.address));
		}
		if (this.phone != null) {
			sb.append(String.format("\"phone\":\"%s\",", this.phone));
		}
		if (this.fax != null) {
			sb.append(String.format("\"fax\":\"%s\",", this.fax));
		}
		if (this.manager != null) {
			sb.append(String.format("\"manager\":\"%s\",", this.manager));
		}
		if (this.managerPhone != null) {
			sb.append(String.format("\"manager_phone\":\"%s\",", this.managerPhone));
		}
		if (this.message != null) {
			sb.append(String.format("\"message\":\"%s\",", this.message));
		}
		if (sb.lastIndexOf(",") == sb.length() -1) sb.deleteCharAt(sb.length()-1);
		sb.append("}");
		return sb.toString();
	}
}
