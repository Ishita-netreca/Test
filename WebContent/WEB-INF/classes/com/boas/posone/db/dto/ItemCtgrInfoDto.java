package com.boas.posone.db.dto;

/**
 * Created by Researcher01 on 2016-09-26.
 */
public class ItemCtgrInfoDto {
    private int ctgrNo;
    private String ctgrName;

    public ItemCtgrInfoDto() { }
    public ItemCtgrInfoDto(int ctgrNo, String ctgrName) {
        this.ctgrNo = ctgrNo;
        this.ctgrName = ctgrName;
    }

    public int getCtgrNo() { return this.ctgrNo; }
    public void setCtgrNo(int ctgrNo) { this.ctgrNo = ctgrNo; }

    public String getCtgrName() { return this.ctgrName; }
    public void setCtgrName(String ctgrName) { this.ctgrName = ctgrName; }


    public String toJsonString() {
        StringBuffer sb = new StringBuffer();
        sb.append("{");
        sb.append(String.format("\"ctgrNo\":%d,",this.ctgrNo));
        if (this.ctgrName != null) sb.append(String.format("\"ctgrName\":\"%s\",",this.ctgrName));
        if(sb.lastIndexOf(",") == sb.length() -1 ) sb.deleteCharAt(sb.length()-1);
        sb.append("}");
        return sb.toString();
    }

}