package com.boas.posone.db.vo;

import java.text.SimpleDateFormat;
import java.sql.Date;

/**
 * Created by Researcher01 on 2016-09-28.
 */
public class TbItemDictListVo {
    private int sid;
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
    private float itemCost;
    private int itemType;
    private Date updateDate;
    private int updater;

    private String userId;

    private int qty;

    public TbItemDictListVo() { }
    public TbItemDictListVo(int sid, String itemCode, String name, String description, String distributor, int categorySid, int subCategorySid, String manufacturer, String color, String condition, float itemCost, int itemType, Date updateDate, int updater, String userId, int qty) {
        this.sid = sid;
        this.itemCode = itemCode;
        this.name = name;
        this.description = description;
        this.distributor = distributor;
        this.categorySid = categorySid;
        this.subCategorySid = subCategorySid;
        this.manufacturer = manufacturer;
        this.color = color;
        this.condition = condition;
        this.itemCost = itemCost;
        this.itemType = itemType;
        this.updateDate = updateDate;
        this.updater = updater;

        this.userId = userId;

        this.qty = qty;
    }

    public int getSid() { return this.sid; }
    public void setSid(int sid) { this.sid = sid; }

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

    public float getItemCost() { return this.itemCost; }
    public void setItemCost(float itemCost) { this.itemCost = itemCost; }

    public int getItemType() { return this.itemType; }
    public void setItemType(int itemType) { this.itemType = itemType; }

    public Date getUpdateDate() { return this.updateDate; }
    public void setUpdateDate(Date updateDate) { this.updateDate = updateDate; }

    public int getUpdater() { return this.updater; }
    public void setUpdater(int updater) { this.updater = updater; }

    public String getUserId() { return this.userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public int getQty() { return this.qty; }
    public void setQty(int qty) { this.qty = qty; }

    public String toJsonString() {
        SimpleDateFormat sdf = new SimpleDateFormat("MM/dd/yyyy");
        StringBuffer sb = new StringBuffer();
        sb.append("{");
        sb.append(String.format("\"sid\":%d,",this.sid));
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
        sb.append(String.format("\"itemCost\":%f,",this.itemCost));
        sb.append(String.format("\"itemType\":%d,",this.itemType));
        if (this.updateDate != null) sb.append(String.format("\"updateDate\":\"%s\",",sdf.format(this.updateDate)));
        sb.append(String.format("\"updater\":%d,",this.updater));
        if (this.userId != null) sb.append(String.format("\"userId\":\"%s\",",this.userId));
        sb.append(String.format("\"qty\":%d,",this.qty));
        if(sb.lastIndexOf(",") == sb.length() -1 ) sb.deleteCharAt(sb.length()-1);
        sb.append("}");
        return sb.toString();
    }

}