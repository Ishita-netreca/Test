package com.boas.posone.db.dto;

/**
 * Created by Researcher01 on 2016-09-28.
 */
public class TbCategoriesDictDto {
    private int sid;
    private String categoryName;
    private int parentSid;

    public TbCategoriesDictDto() { }
    public TbCategoriesDictDto(int sid, String categoryName, int parentSid) {
        this.sid = sid;
        this.categoryName = categoryName;
        this.parentSid = parentSid;
    }

    public int getSid() { return this.sid; }
    public void setSid(int sid) { this.sid = sid; }

    public String getCategoryName() { return this.categoryName; }
    public void setCategoryName(String categoryName) { this.categoryName = categoryName; }

    public int getParentSid() { return this.parentSid; }
    public void setParentSid(int parentSid) { this.parentSid = parentSid; }


    public String toJsonString() {
        StringBuffer sb = new StringBuffer();
        sb.append("{");
        sb.append(String.format("\"sid\":%d,",this.sid));
        if (this.categoryName != null) sb.append(String.format("\"categoryName\":\"%s\",",this.categoryName));
        sb.append(String.format("\"parentSid\":%d,",this.parentSid));
        if(sb.lastIndexOf(",") == sb.length() -1 ) sb.deleteCharAt(sb.length()-1);
        sb.append("}");
        return sb.toString();
    }

}
