package com.boas.posone.db.dto;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by Researcher01 on 2016-09-28.
 */
public class TbFeeDictDto {
    private int sid;
    private int feeType;
    private String name;
    private String description;
    private float amount;
    private Date updateDate;
    private int updater;
    private int disable;

    public TbFeeDictDto() { }
    public TbFeeDictDto(int sid, int feeType, String name, String description, float amount, Date updateDate, int updater, int disable) {
        this.sid = sid;
        this.feeType = feeType;
        this.name = name;
        this.description = description;
        this.amount = amount;
        this.updateDate = updateDate;
        this.updater = updater;
        this.disable = disable;
    }

    public int getSid() { return this.sid; }
    public void setSid(int sid) { this.sid = sid; }

    public int getFeeType() { return this.feeType; }
    public void setFeeType(int feeType) { this.feeType = feeType; }

    public String getName() { return this.name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return this.description; }
    public void setDescription(String description) { this.description = description; }

    public float getAmount() { return this.amount; }
    public void setAmount(float amount) { this.amount = amount; }

    public Date getUpdateDate() { return this.updateDate; }
    public void setUpdateDate(Date updateDate) { this.updateDate = updateDate; }

    public int getUpdater() { return this.updater; }
    public void setUpdater(int updater) { this.updater = updater; }

    public int getDisable() { return this.disable; }
    public void setDisable(int disable) { this.disable = disable; }


    public String toJsonString() {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        StringBuffer sb = new StringBuffer();
        sb.append("{");
        sb.append(String.format("\"sid\":%d,",this.sid));
        sb.append(String.format("\"feeType\":%d,",this.feeType));
        if (this.name != null) sb.append(String.format("\"name\":\"%s\",",this.name));
        if (this.description != null) sb.append(String.format("\"description\":\"%s\",",this.description));
        sb.append(String.format("\"amount\":%f,",this.amount));
        if (this.updateDate != null) sb.append(String.format("\"updateDate\":\"%s\",",sdf.format(this.updateDate)));
        sb.append(String.format("\"updater\":%d,",this.updater));
        sb.append(String.format("\"disable\":%d,",this.disable));
        if(sb.lastIndexOf(",") == sb.length() -1 ) sb.deleteCharAt(sb.length()-1);
        sb.append("}");
        return sb.toString();
    }

}