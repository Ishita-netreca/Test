package com.boas.posone.db.vo;

import java.text.DecimalFormat;

import com.boas.posone.util.UtilMethodClass;

public class PromotionInfoListVo {
	private int promotionNo;
	private String startDate;
	private String endDate;
	private int promotionType;
	private float promotionValue;
	private int itemNumber;
	private String description;
	private float srp;
	private String spec;
	private String imgPath;
	
	public PromotionInfoListVo() {
		
	}
	
	public PromotionInfoListVo(int promotionNo, String startDate, String endDate, int promotionType, float promotionValue, int itemNumber, String description, float srp, String spec, String imgPath) {
		this.promotionNo = promotionNo;
		this.startDate = startDate;
		this.endDate = endDate;
		this.promotionType = promotionType;
		this.promotionValue = promotionValue;
		this.itemNumber = itemNumber;
		this.description = description;
		this.srp = srp;
		this.spec = spec;
		this.imgPath = imgPath;
	}
	
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
	
	public int getItemNumber() { return this.itemNumber; }
	public void setItemNumber(int itemNumber) { this.itemNumber = itemNumber; }
	
	public String getDescription() { return this.description; }
	public void setDescription(String description) { this.description = description; }
	
	public float getSrp() { return this.srp; }
	public void setSrp(float srp) { this.srp = srp; }
	
	public String getSpec() { return this.spec; }
	public void setSpec(String spec) { this.spec = spec; }
	
	public String getImgPath() { return this.imgPath; }
	public void setImgPath(String imgPath) { this.imgPath = imgPath; }
	
	public String toJsonString() {
		StringBuffer sb = new StringBuffer();
		DecimalFormat df = new DecimalFormat("0.00");
		sb.append("{");
		sb.append(String.format("\"promotion_no\":%d,", this.promotionNo));
		if (this.startDate != null) {
			sb.append(String.format("\"start_date\":\"%s\",", this.startDate));
		}
		if (this.endDate != null) {
			sb.append(String.format("\"end_date\":\"%s\",", this.endDate));
		}
		sb.append(String.format("\"promotion_type\":%d,", this.promotionType));
		sb.append(String.format("\"promotion_value\":%s,", df.format(this.promotionValue)));
		sb.append(String.format("\"item_number\":%d,", this.itemNumber));
		if (this.description != null) {
			sb.append(String.format("\"description\":\"%s\",", this.description));
		}
		sb.append(String.format("\"srp\":%s,", df.format(this.srp)));
		if (this.spec != null) {
			sb.append(String.format("\"spec\":\"%s\",", UtilMethodClass.getSingleton().convertPlainTextToHtmlText(this.spec)));
		}
		if (this.imgPath != null) {
			sb.append(String.format("\"img_path\":\"%s\",", this.imgPath));
		}
		if (sb.lastIndexOf(",") == sb.length() -1) sb.deleteCharAt(sb.length()-1);
		sb.append("}");
		return sb.toString();
	}
}
