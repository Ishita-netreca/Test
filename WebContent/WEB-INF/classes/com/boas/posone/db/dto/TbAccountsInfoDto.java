package com.boas.posone.db.dto;

/**
 * Created by Researcher01 on 2016-09-30.
 */
public class TbAccountsInfoDto{
    private int sid;
    private String storeId;
    private String asapId;
    private String asapPassword;
    private String qpayId;
    private String qpayPassword;

    public TbAccountsInfoDto() { }
    public TbAccountsInfoDto(int sid, String storeId, String asapId, String asapPassword, String qpayId, String qpayPassword) {
        this.sid = sid;
        this.storeId = storeId;
        this.asapId = asapId;
        this.asapPassword = asapPassword;
        this.qpayId = qpayId;
        this.qpayPassword = qpayPassword;
    }

    public int getSid() { return this.sid; }
    public void setSid(int sid) { this.sid = sid; }

    public String getStoreId() { return this.storeId; }
    public void setStoreId(String storeId) { this.storeId = storeId; }

    public String getAsapId() { return this.asapId; }
    public void setAsapId(String asapId) { this.asapId = asapId; }

    public String getAsapPassword() { return this.asapPassword; }
    public void setAsapPassword(String asapPassword) { this.asapPassword = asapPassword; }

    public String getQpayId() { return this.qpayId; }
    public void setQpayId(String qpayId) { this.qpayId = qpayId; }

    public String getQpayPassword() { return this.qpayPassword; }
    public void setQpayPassword(String qpayPassword) { this.qpayPassword = qpayPassword; }


    public String toJsonString() {
        StringBuffer sb = new StringBuffer();
        sb.append("{");
        sb.append(String.format("\"sid\":%d,",this.sid));
        if (this.storeId != null) sb.append(String.format("\"storeId\":\"%s\",",this.storeId));
        if (this.asapId != null) sb.append(String.format("\"asapId\":\"%s\",",this.asapId));
        if (this.asapPassword != null) sb.append(String.format("\"asapPassword\":\"%s\",",this.asapPassword));
        if (this.qpayId != null) sb.append(String.format("\"qpayId\":\"%s\",",this.qpayId));
        if (this.qpayPassword != null) sb.append(String.format("\"qpayPassword\":\"%s\",",this.qpayPassword));
        if(sb.lastIndexOf(",") == sb.length() -1 ) sb.deleteCharAt(sb.length()-1);
        sb.append("}");
        return sb.toString();
    }

    public String toString() {
        StringBuffer sb = new StringBuffer();
        sb.append(String.format("sid=%d,",this.sid));
        if (this.storeId != null) sb.append(String.format("storeId=%s,",this.storeId));
        if (this.asapId != null) sb.append(String.format("asapId=%s,",this.asapId));
        if (this.asapPassword != null) sb.append(String.format("asapPassword=%s,",this.asapPassword));
        if (this.qpayId != null) sb.append(String.format("qpayId=%s,",this.qpayId));
        if (this.qpayPassword != null) sb.append(String.format("qpayPassword=%s,",this.qpayPassword));
        if(sb.lastIndexOf(",") == sb.length() -1 ) sb.deleteCharAt(sb.length()-1);
        return sb.toString();
    }
}