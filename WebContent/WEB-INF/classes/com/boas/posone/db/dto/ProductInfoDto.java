package com.boas.posone.db.dto;

import com.boas.posone.util.UtilMethodClass;

public class ProductInfoDto {
	private int itemNumber;
	private int categoryNo;
	private int subCategoryNo;
	private String description;
	private String serialNumber;
	private float srp;
	private String manufacturer;
	private String spec;
	private String imgPath;
	
	public ProductInfoDto() {
		
	}
	
	public ProductInfoDto(int itemNumber, int categoryNo, int subCategoryNo, String description, String serialNumber, float srp, String manufacturer, String spec, String imgPath) {
		this.itemNumber = itemNumber;
		this.categoryNo = categoryNo;
		this.subCategoryNo = subCategoryNo;
		this.description = description;
		this.serialNumber = serialNumber;
		this.srp = srp;
		this.manufacturer = manufacturer;
		this.spec = spec;
		this.imgPath = imgPath;
	}
	
	public int getItemNumber() { return this.itemNumber; }
	public void setItemNumber(int itemNumber) { this.itemNumber = itemNumber; }
	
	public int getCategoryNo() { return this.categoryNo; }
	public void setCategoryNo(int categoryNo) { this.categoryNo = categoryNo; }
	
	public int getSubCategoryNo() { return this.subCategoryNo; }
	public void setSubCategoryNo(int subCategoryNo) { this.subCategoryNo = subCategoryNo; }
	
	public String getDescription() { return this.description; }
	public void setDescription(String description) { this.description = description; }
	
	public String getSerialNumber() { return this.serialNumber; }
	public void setSerialNumber(String serialNumber) { this.serialNumber = serialNumber; }
	
	public float getSrp() { return this.srp; }
	public void setSrp(float srp) { this.srp = srp; }
	
	public String getManufacturer() { return this.manufacturer; }
	public void setManufacturer(String manufacturer) { this.manufacturer = manufacturer; }
	
	public String getSpec() { return this.spec; }
	public void setSpec(String spec) { this.spec = spec; }
	
	public String getImgPath() { return this.imgPath; }
	public void setImgPath(String imgPath) { this.imgPath = imgPath; }
	
	public String toJsonString() {
		StringBuffer sb = new StringBuffer();
		sb.append("{");
		sb.append(String.format("\"item_number\":%d,", this.itemNumber));		
		sb.append(String.format("\"category_no\":%d,", this.categoryNo));
		sb.append(String.format("\"sub_category_no\":%d,", this.subCategoryNo));
		if (this.description != null) {
			sb.append(String.format("\"description\":\"%s\",", this.description));
		}
		if (this.serialNumber != null) {
			sb.append(String.format("\"serial_number\":\"%s\",", this.serialNumber));
		}
		sb.append(String.format("\"srp\":%f,", this.srp));
		if (this.manufacturer != null) {
			sb.append(String.format("\"manufacturer\":\"%s\",", this.manufacturer));
		}
		if (this.spec != null) {
			sb.append(String.format("\"spec\":\"%s\",", UtilMethodClass.getSingleton().convertPlainTextToHtmlText(this.spec)));
		}
		if (this.imgPath != null) {
			sb.append(String.format("\"img_path\":\"%s\",", this.imgPath));
		}
		if (sb.lastIndexOf(",") == sb.length()-1) sb.deleteCharAt(sb.length()-1);
		sb.append("}");
		return sb.toString();
	}
}
