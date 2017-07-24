package com.boas.posone.db.vo;

/**
 * Created by Researcher01 on 2016-09-26.
 */
public class StoreInvenInfoListVo {
    private int invenNo;
    private int storeNo;
    private String itemNo;
    private String desc;
    private String company;
    private int ctgrNo;
    private int subCtgrNo;
    private String manufacturer;
    private String color;
    private float srp;
    private int qty;
    private int disable;
    private String ctgrName;
    private String subCtgrName;

    public StoreInvenInfoListVo() { }
    public StoreInvenInfoListVo(int invenNo, int storeNo, String itemNo, String desc, String company, int ctgrNo, int subCtgrNo, String manufacturer, String color, float srp, int qty, int disable, String ctgrName, String subCtgrName) {
        this.invenNo = invenNo;
        this.storeNo = storeNo;
        this.itemNo = itemNo;
        this.desc = desc;
        this.company = company;
        this.ctgrNo = ctgrNo;
        this.subCtgrNo = subCtgrNo;
        this.manufacturer = manufacturer;
        this.color = color;
        this.srp = srp;
        this.qty = qty;
        this.disable = disable;
        this.ctgrName = ctgrName;
        this.subCtgrName = subCtgrName;
    }

    public int getInvenNo() { return this.invenNo; }
    public void setInvenNo(int invenNo) { this.invenNo = invenNo; }

    public int getStoreNo() { return this.storeNo; }
    public void setStoreNo(int storeNo) { this.storeNo = storeNo; }

    public String getItemNo() { return this.itemNo; }
    public void setItemNo(String itemNo) { this.itemNo = itemNo; }

    public String getDesc() { return this.desc; }
    public void setDesc(String desc) { this.desc = desc; }

    public String getCompany() { return this.company; }
    public void setCompany(String company) { this.company = company; }

    public int getCtgrNo() { return this.ctgrNo; }
    public void setCtgrNo(int ctgrNo) { this.ctgrNo = ctgrNo; }

    public int getSubCtgrNo() { return this.subCtgrNo; }
    public void setSubCtgrNo(int subCtgrNo) { this.subCtgrNo = subCtgrNo; }

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

    public String getCtgrName() { return this.ctgrName; }
    public void setCtgrName(String ctgrName) { this.ctgrName = ctgrName; }

    public String getSubCtgrName() { return this.subCtgrName; }
    public void setSubCtgrName(String subCtgrName) { this.subCtgrName = subCtgrName; }


    public String toJsonString() {
        StringBuffer sb = new StringBuffer();
        sb.append("{");
        sb.append(String.format("\"invenNo\":%d,",this.invenNo));
        sb.append(String.format("\"storeNo\":%d,",this.storeNo));
        if (this.itemNo != null) sb.append(String.format("\"itemNo\":\"%s\",",this.itemNo));
        if (this.desc != null) sb.append(String.format("\"desc\":\"%s\",",this.desc));
        if (this.company != null) sb.append(String.format("\"company\":\"%s\",",this.company));
        sb.append(String.format("\"ctgrNo\":%d,",this.ctgrNo));
        sb.append(String.format("\"subCtgrNo\":%d,",this.subCtgrNo));
        if (this.manufacturer != null) sb.append(String.format("\"manufacturer\":\"%s\",",this.manufacturer));
        if (this.color != null) sb.append(String.format("\"color\":\"%s\",",this.color));
        sb.append(String.format("\"srp\":%f,",this.srp));
        sb.append(String.format("\"qty\":%d,",this.qty));
        sb.append(String.format("\"disable\":%d,",this.disable));
        if (this.ctgrName != null) sb.append(String.format("\"ctgrName\":\"%s\",",this.ctgrName));
        if (this.subCtgrName != null) sb.append(String.format("\"subCtgrName\":\"%s\",",this.subCtgrName));
        if(sb.lastIndexOf(",") == sb.length() -1 ) sb.deleteCharAt(sb.length()-1);
        sb.append("}");
        return sb.toString();
    }
}
