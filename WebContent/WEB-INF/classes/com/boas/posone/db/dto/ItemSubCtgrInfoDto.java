package com.boas.posone.db.dto;

/**
 * Created by Researcher01 on 2016-09-26.
 */
public class ItemSubCtgrInfoDto {
    private int subCtgrNo;
    private int ctgrNo;
    private String subCtgrName;

    public ItemSubCtgrInfoDto() { }
    public ItemSubCtgrInfoDto(int subCtgrNo, int ctgrNo, String subCtgrName) {
        this.subCtgrNo = subCtgrNo;
        this.ctgrNo = ctgrNo;
        this.subCtgrName = subCtgrName;
    }

    public int getSubCtgrNo() { return this.subCtgrNo; }
    public void setSubCtgrNo(int subCtgrNo) { this.subCtgrNo = subCtgrNo; }

    public int getCtgrNo() { return this.ctgrNo; }
    public void setCtgrNo(int ctgrNo) { this.ctgrNo = ctgrNo; }

    public String getSubCtgrName() { return this.subCtgrName; }
    public void setSubCtgrName(String subCtgrName) { this.subCtgrName = subCtgrName; }


    public String toJsonString() {
        StringBuffer sb = new StringBuffer();
        sb.append("{");
        sb.append(String.format("\"subCtgrNo\":%d,",this.subCtgrNo));
        sb.append(String.format("\"ctgrNo\":%d,",this.ctgrNo));
        if (this.subCtgrName != null) sb.append(String.format("\"subCtgrName\":\"%s\",",this.subCtgrName));
        if(sb.lastIndexOf(",") == sb.length() -1 ) sb.deleteCharAt(sb.length()-1);
        sb.append("}");
        return sb.toString();
    }

}