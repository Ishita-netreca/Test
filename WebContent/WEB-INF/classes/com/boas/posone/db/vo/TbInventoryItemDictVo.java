package com.boas.posone.db.vo;

/**
 * Created by Researcher01 on 2016-09-29.
 */
public class TbInventoryItemDictVo {
    private int sid;
    private int poId;
    private int itemSid;
    private String serialNo;
    private int qty;
    private String itemCode;
    private String name;
    private String description;
    private String distributor;
    private int categorySid;
    private int subCategorySid;
    private String category;
    private String subCategory;
    private String manufacturer;
    private String color;
    private String condition;
    private String sku;
    private float itemCost;
    private float newPrice;
    private float upgradePrice;
    private float sorPrice;
    private float retailPrice;
    private float wholesalePrice;
    private String image;

    public TbInventoryItemDictVo() { }
    public TbInventoryItemDictVo(int sid, int itemSid, String serialNo, int qty, String itemCode, String name, String description, String distributor, int categorySid, int subCategorySid, String manufacturer, String color, String condition, String sku, float itemCost, float newPrice, float upgradePrice, float sorPrice, float retailPrice, float wholesalePrice, String image) {
        this.sid = sid;
        this.itemSid = itemSid;
        this.serialNo = serialNo;
        this.qty = qty;
        this.itemCode = itemCode;
        this.name = name;
        this.description = description;
        this.distributor = distributor;
        this.categorySid = categorySid;
        this.subCategorySid = subCategorySid;
        this.manufacturer = manufacturer;
        this.color = color;
        this.condition = condition;
        this.sku = sku;
        this.itemCost = itemCost;
        this.newPrice = newPrice;
        this.upgradePrice = upgradePrice;
        this.sorPrice = sorPrice;
        this.retailPrice = retailPrice;
        this.wholesalePrice = wholesalePrice;
        this.image = image;
    }

    public int getSid() { return this.sid; }
    public void setSid(int sid) { this.sid = sid; }

    public int getPoId() { return this.poId; }
    public void setPoId(int poId) { this.poId = poId; }

    public int getItemSid() { return this.itemSid; }
    public void setItemSid(int itemSid) { this.itemSid = itemSid; }

    public String getSerialNo() { return this.serialNo; }
    public void setSerialNo(String serialNo) { this.serialNo = serialNo; }

    public int getQty() { return this.qty; }
    public void setQty(int qty) { this.qty = qty; }

    public String getItemCode() { return this.itemCode; }
    public void setItemCode(String itemCode) { this.itemCode = itemCode; }

    public String getName() { return this.name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return this.description; }
    public void setDescription(String description) { this.description = description; }

    public String getDistributor() { return this.distributor; }
    public void setDistributor(String distributor) { this.distributor = distributor; }

    public int getCategorySid() { return this.categorySid; }
    public void setCategorySid(int categorySid) { this.categorySid = categorySid; }

    public int getSubCategorySid() { return this.subCategorySid; }
    public void setSubCategorySid(int subCategorySid) { this.subCategorySid = subCategorySid; }

    public String getCategory() { return this.category; }
    public void setCategory(String category) { this.category = category; }

    public String getSubCategory() { return this.subCategory; }
    public void setSubCategory(String subCategory) { this.subCategory = subCategory; }

    public String getManufacturer() { return this.manufacturer; }
    public void setManufacturer(String manufacturer) { this.manufacturer = manufacturer; }

    public String getColor() { return this.color; }
    public void setColor(String color) { this.color = color; }

    public String getCondition() { return this.condition; }
    public void setCondition(String condition) { this.condition = condition; }

    public String getSku() { return this.sku; }
    public void setSku(String sku) { this.sku = sku; }

    public float getItemCost() { return this.itemCost; }
    public void setItemCost(float itemCost) { this.itemCost = itemCost; }

    public float getNewPrice() { return this.newPrice; }
    public void setNewPrice(float newPrice) { this.newPrice = newPrice; }

    public float getUpgradePrice() { return this.upgradePrice; }
    public void setUpgradePrice(float upgradePrice) { this.upgradePrice = upgradePrice; }

    public float getSorPrice() { return this.sorPrice; }
    public void setSorPrice(float sorPrice) { this.sorPrice = sorPrice; }

    public float getRetailPrice() { return this.retailPrice; }
    public void setRetailPrice(float retailPrice) { this.retailPrice = retailPrice; }

    public float getWholesalePrice() { return this.wholesalePrice; }
    public void setWholesalePrice(float wholesalePrice) { this.wholesalePrice = wholesalePrice; }

    public String getImage() { return this.image; }
    public void setImage(String image) { this.image = image; }


    public String toJsonString() {
        StringBuffer sb = new StringBuffer();
        sb.append("{");
        sb.append(String.format("\"sid\":%d,",this.sid));
        sb.append(String.format("\"poId\":%d,",this.poId));
        sb.append(String.format("\"itemSid\":%d,",this.itemSid));
        if (this.serialNo != null) sb.append(String.format("\"serialNo\":\"%s\",",this.serialNo));
        sb.append(String.format("\"qty\":%d,",this.qty));
        if (this.itemCode != null) sb.append(String.format("\"itemCode\":\"%s\",",this.itemCode));
        if (this.name != null) sb.append(String.format("\"name\":\"%s\",",this.name));
        if (this.description != null) sb.append(String.format("\"description\":\"%s\",",this.description));
        if (this.distributor != null) sb.append(String.format("\"distributor\":\"%s\",",this.distributor));
        sb.append(String.format("\"categorySid\":%d,",this.categorySid));
        sb.append(String.format("\"subCategorySid\":%d,",this.subCategorySid));
        if (this.category != null) sb.append(String.format("\"category\":\"%s\",",this.category));
        if (this.subCategory != null) sb.append(String.format("\"subCategory\":\"%s\",",this.subCategory));
        if (this.manufacturer != null) sb.append(String.format("\"manufacturer\":\"%s\",",this.manufacturer));
        if (this.color != null) sb.append(String.format("\"color\":\"%s\",",this.color));
        if (this.condition != null) sb.append(String.format("\"condition\":\"%s\",",this.condition));
        if (this.sku != null) sb.append(String.format("\"sku\":\"%s\",",this.sku));
        sb.append(String.format("\"itemCost\":%f,",this.itemCost));
        sb.append(String.format("\"newPrice\":%f,",this.newPrice));
        sb.append(String.format("\"upgradePrice\":%f,",this.upgradePrice));
        sb.append(String.format("\"sorPrice\":%f,",this.sorPrice));
        sb.append(String.format("\"retailPrice\":%f,",this.retailPrice));
        sb.append(String.format("\"wholesalePrice\":%f,",this.wholesalePrice));
        if (this.image != null) sb.append(String.format("\"image\":\"%s\",",this.image));
        if(sb.lastIndexOf(",") == sb.length() -1 ) sb.deleteCharAt(sb.length()-1);
        sb.append("}");
        return sb.toString();
    }
}