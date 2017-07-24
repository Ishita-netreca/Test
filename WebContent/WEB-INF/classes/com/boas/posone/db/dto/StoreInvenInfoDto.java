package com.boas.posone.db.dto;

public class StoreInvenInfoDto {
	private int invenNo;
	private int storeNo;
	private String itemNo;
	private String desc;
	private String serialNo;
	private String company;
	private int ctgr;
	private int subCtgr;
	private String manufacturer;
	private String color;
	private float srp;
	private int qty;
	private int disable;

	public StoreInvenInfoDto() { }
	public StoreInvenInfoDto(int invenNo, int storeNo, String itemNo, String desc, String serialNo, String company, int ctgr, int subCtgr, String manufacturer, String color, float srp, int qty, int disable) {
		this.invenNo = invenNo;
		this.storeNo = storeNo;
		this.itemNo = itemNo;
		this.desc = desc;
		this.serialNo = serialNo;
		this.company = company;
		this.ctgr = ctgr;
		this.subCtgr = subCtgr;
		this.manufacturer = manufacturer;
		this.color = color;
		this.srp = srp;
		this.qty = qty;
		this.disable = disable;
	}

	public int getInvenNo() { return this.invenNo; }
	public void setInvenNo(int invenNo) { this.invenNo = invenNo; }

	public int getStoreNo() { return this.storeNo; }
	public void setStoreNo(int storeNo) { this.storeNo = storeNo; }

	public String getItemNo() { return this.itemNo; }
	public void setItemNo(String itemNo) { this.itemNo = itemNo; }

	public String getDesc() { return this.desc; }
	public void setDesc(String desc) { this.desc = desc; }

	public String getSerialNo() { return this.serialNo; }
	public void setSerialNo(String serialNo) { this.serialNo = serialNo; }

	public String getCompany() { return this.company; }
	public void setCompany(String company) { this.company = company; }

	public int getCtgr() { return this.ctgr; }
	public void setCtgr(int ctgr) { this.ctgr = ctgr; }

	public int getSubCtgr() { return this.subCtgr; }
	public void setSubCtgr(int subCtgr) { this.subCtgr = subCtgr; }

	public String getManufacturer() { return this.manufacturer; }
	public void setManufacturer(String manufacturer) { this.manufacturer = manufacturer; }

	public String getColor() { return this.color; }
	public void setColor(String color) { this.color = color; }

	public float getSrp() { return this.srp; }
	public void setSrp(float srp) { this.srp = srp; }

	public int getQty() { return this.qty; }
	public void setQty(int qty) { this.qty = qty; }

	public int getDisable() { return this.disable; }
	public void setDisable(int disable) { this.disable = disable; }


	public String toJsonString() {
		StringBuffer sb = new StringBuffer();
		sb.append("{");
		sb.append(String.format("\"invenNo\":%d,",this.invenNo));
		sb.append(String.format("\"storeNo\":%d,",this.storeNo));
		if (this.itemNo != null) sb.append(String.format("\"itemNo\":\"%s\",",this.itemNo));
		if (this.desc != null) sb.append(String.format("\"desc\":\"%s\",",this.desc));
		if (this.serialNo != null) sb.append(String.format("\"serialNo\":\"%s\",",this.serialNo));
		if (this.company != null) sb.append(String.format("\"company\":\"%s\",",this.company));
		sb.append(String.format("\"ctgr\":%d,",this.ctgr));
		sb.append(String.format("\"subCtgr\":%d,",this.subCtgr));
		if (this.manufacturer != null) sb.append(String.format("\"manufacturer\":\"%s\",",this.manufacturer));
		if (this.color != null) sb.append(String.format("\"color\":\"%s\",",this.color));
		sb.append(String.format("\"srp\":%f,",this.srp));
		sb.append(String.format("\"qty\":%d,",this.qty));
		sb.append(String.format("\"disable\":%d,",this.disable));
		if(sb.lastIndexOf(",") == sb.length() -1 ) sb.deleteCharAt(sb.length()-1);
		sb.append("}");
		return sb.toString();
	}

}