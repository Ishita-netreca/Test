package com.boas.posone.db.dto;

import java.sql.Date;
import java.text.SimpleDateFormat;

/**
 * Created by Researcher01 on 2016-09-29.
 */
public class TbInventoryDto {
    private int sid;
    private int poId;
    private int itemSid;
    private String serialNo;
    private int qty;
    private Date updateDate;
    private int updater;

    public TbInventoryDto() { }
    public TbInventoryDto(int sid, int poId, int itemSid, String serialNo, int qty, Date updateDate, int updater) {
        this.sid = sid;
        this.poId = poId;
        this.itemSid = itemSid;
        this.serialNo = serialNo;
        this.qty = qty;
        this.updateDate = updateDate;
        this.updater = updater;
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

    public Date getUpdateDate() { return this.updateDate; }
    public void setUpdateDate(Date updateDate) { this.updateDate = updateDate; }

    public int getUpdater() { return this.updater; }
    public void setUpdater(int updater) { this.updater = updater; }


    public String toJsonString() {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        StringBuffer sb = new StringBuffer();
        sb.append("{");
        sb.append(String.format("\"sid\":%d,",this.sid));
        sb.append(String.format("\"poId\":%d,",this.poId));
        sb.append(String.format("\"itemSid\":%d,",this.itemSid));
        if (this.serialNo != null) sb.append(String.format("\"serialNo\":\"%s\",",this.serialNo));
        sb.append(String.format("\"qty\":%d,",this.qty));
        if (this.updateDate != null) sb.append(String.format("\"updateDate\":\"%s\",",sdf.format(this.updateDate)));
        sb.append(String.format("\"updater\":%d,",this.updater));
        if(sb.lastIndexOf(",") == sb.length() -1 ) sb.deleteCharAt(sb.length()-1);
        sb.append("}");
        return sb.toString();
    }

}