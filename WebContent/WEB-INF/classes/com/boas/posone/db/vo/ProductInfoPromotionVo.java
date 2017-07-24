package com.boas.posone.db.vo;

import java.text.DecimalFormat;

public class ProductInfoPromotionVo {
	private int itemNumber;
	private String description;
	private String serialNumber;
	private float srp;
		
	private int promotionNo;
	private String startDate;
	private String endDate;
	private int promotionType;
	private float promotionValue;
	private int qty;
	
	public ProductInfoPromotionVo() {
		
	}
	
	public ProductInfoPromotionVo(int itemNumber, String description, String serialNumber, float srp, int promotionNo, String startDate, String endDate, int promotionType, float promotionValue, int qty) {
		this.itemNumber = itemNumber;
		this.description = description;
		this.serialNumber = serialNumber;
		this.srp = srp;
		this.promotionNo = promotionNo;
		this.startDate = startDate;
		this.endDate = endDate;
		this.promotionType = promotionType;
		this.promotionValue = promotionValue;
		this.qty = qty;
	}
	
	public int getItemNumber() { return this.itemNumber; }
	public void setItemNumber(int itemNumber) { this.itemNumber = itemNumber; }
	
	public String getDescription() { return this.description; }
	public void setDescription(String description) { this.description = description; }
	
	public String getSerialNumber() { return this.serialNumber; }
	public void setSerialNumber(String serialNumber) { this.serialNumber = serialNumber; }
	
	public float getSrp() { return this.srp; }
	public void setSrp(float srp) { this.srp = srp; }
	
	public int getPromotionNo() { return this.promotionNo; }
	public void setPromotionNo(int promotionNo) { this.promotionNo = promotionNo; }
	
	public String getStartDate() { return this.startDate; }
	public void setStartDate(String startDate) { this.startDate = startDate; }
	
	public String getEndDate() { return this.endDate; }
	public void setEndDate(String endDate) { this.endDate = endDate; }
	
	public int getPromotionType() { return this.promotionType; }
	public void setPromotionType(int promotionType) { this.promotionType = promotionType; }

	public float getPromotionValue() { return this.promotionValue; }
	public void setPromotionValue(float promotionValue) { this.promotionValue = promotionValue; }
	
	public int getQty() { return this.qty; }
	public void setQty(int qty) { this.qty = qty; }
	
	public String toJsonString() {
		StringBuffer sb = new StringBuffer();		
		DecimalFormat df = new DecimalFormat("0.00");
		sb.append("{");
		sb.append(String.format("\"item_number\":%d,", this.itemNumber));
		if (this.description != null) {
			sb.append(String.format("\"description\":\"%s\",", this.description));
		}
		if (this.serialNumber != null) {
			sb.append(String.format("\"serial_number\":\"%s\",", this.serialNumber));
		}
		sb.append(String.format("\"srp\":%s,", df.format(this.srp)));	
		sb.append(String.format("\"promotion_no\":%d,", this.promotionNo));	
		if (this.startDate != null) {
			sb.append(String.format("\"start_date\":\"%s\",", this.startDate));
		}
		if (this.endDate != null) {
			sb.append(String.format("\"end_date\":\"%s\",", this.endDate));
		}
		sb.append(String.format("\"promotion_type\":%d,", this.promotionType));	
		sb.append(String.format("\"promotion_value\":%s,", df.format(this.promotionValue)));	
		sb.append(String.format("\"qty\":%d,", this.qty));	
		
		if (sb.lastIndexOf(",") == sb.length() -1) sb.deleteCharAt(sb.length()-1);
		sb.append("}");
		
		return sb.toString();
	}
}
