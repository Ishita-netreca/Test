package com.boas.posone.db.dto;

public class PromotionInfoDto {
	private int promotionNo;
	private int productItemNumber;
	private String startDate;
	private String endDate;
	private int promotionType;
	private float promotionValue;
	
	public PromotionInfoDto() {
		
	}
	
	public PromotionInfoDto(int promotionNo, int productItemNumber, String startDate, String endDate, int promotionType, float promotionValue) {
		this.promotionNo = promotionNo;
		this.productItemNumber = productItemNumber;
		this.startDate = startDate;
		this.endDate = endDate;
		this.promotionType = promotionType;
		this.promotionValue = promotionValue;
	}
	
	public int getPromotionNo() { return this.promotionNo; }
	public void setPromotionNo(int promotionNo) { this.promotionNo = promotionNo; }
	
	public int getProductItemNumber() { return this.productItemNumber; }
	public void setProductItemNumber(int productItemNumber) { this.productItemNumber = productItemNumber; }
	
	public String getStartDate() { return this.startDate; }
	public void setStartDate(String startDate) { this.startDate = startDate; }
	
	public String getEndDate() { return this.endDate; }
	public void setEndDate(String endDate) { this.endDate = endDate; }
	
	public int getPromotionType() { return this.promotionType; }
	public void setPromotionType(int promotionType) { this.promotionType = promotionType; }
	
	public float getPromotionValue() { return this.promotionValue; }
	public void setPromotionValue(float promotionValue) { this.promotionValue = promotionValue; }
	
	public String toJsonString() {
		StringBuffer sb = new StringBuffer();
		sb.append("{");
		sb.append(String.format("\"promotion_no\":%d,", this.promotionNo));
		sb.append(String.format("\"product_item_number\":%d,", this.productItemNumber));
		if (this.startDate != null) {
			sb.append(String.format("\"start_date\":\"%s\",", this.startDate));
		}
		if (this.endDate != null) {
			sb.append(String.format("\"end_date\":\"%s\",", this.endDate));
		}
		sb.append(String.format("\"promotion_type\":%d,", this.promotionType));
		sb.append(String.format("\"product_value\":%f", this.promotionValue));
		sb.append("}");
		return sb.toString();
	}
}
