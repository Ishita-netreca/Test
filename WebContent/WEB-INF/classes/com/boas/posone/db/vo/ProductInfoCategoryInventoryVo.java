package com.boas.posone.db.vo;

import java.text.DecimalFormat;

/*
 * query 
 * SELECT * FROM `product_info`
 * SELECT * FROM `product_category_info`
 * SELECT * FROM `product_sub_category_info`
 * SELECT * FROM `store_inventory_info` WHERE `store_no` & [`item_number` list]	
 */
public class ProductInfoCategoryInventoryVo {
	private int itemNumber;
	private int categoryNo;
	private int subCategoryNo;
	private String description;
	private String serialNumber;
	private float srp;
	
	private String categoryName;
	private String subCategoryName;
	private int qty;
	
	public ProductInfoCategoryInventoryVo() {
		
	}
	
	public ProductInfoCategoryInventoryVo(int itemNumber, int categoryNo, int subCategoryNo, String description, String serialNumber, float srp, String categoryName, String subCategoryName, int qty) {
		this.itemNumber = itemNumber;
		this.categoryNo = categoryNo;
		this.subCategoryNo = subCategoryNo;
		this.description = description;
		this.serialNumber = serialNumber;
		this.srp = srp;
		this.categoryName = categoryName;
		this.subCategoryName = subCategoryName;
		this.qty = qty;
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
	
	public String getCategoryName() { return this.categoryName; }
	public void setCategoryName(String categoryName) { this.categoryName = categoryName; }
	
	public String getSubCategoryName() { return this.subCategoryName; }
	public void setSubCategoryName(String subCategoryName) { this.subCategoryName = subCategoryName; }
	
	public int getQty() { return this.qty; }
	public void setQty(int qty) { this.qty = qty; }
	
	public String toJsonString() {
		StringBuffer sb = new StringBuffer();
		DecimalFormat df = new DecimalFormat("0.00");
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
		sb.append(String.format("\"srp\":%s,", df.format(this.srp)));
		if (this.categoryName != null) {
			sb.append(String.format("\"category_name\":\"%s\",", this.categoryName));
		}
		if (this.subCategoryName != null) {
			sb.append(String.format("\"sub_category_name\":\"%s\",", this.subCategoryName));
		}
		sb.append(String.format("\"qty\":%d", this.qty));
		sb.append("}");
		return sb.toString();
	}
}
