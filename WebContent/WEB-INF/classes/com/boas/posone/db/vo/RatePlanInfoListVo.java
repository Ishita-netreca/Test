package com.boas.posone.db.vo;

/**
 * Created by Researcher01 on 2016-09-27.
 */
public class RatePlanInfoListVo {
    private int ratePlanNo;
    private String carrier;
    private String planCode;
    private String planDesc;
    private String planType;
    private String groupType;
    private float mrc;
    private int updatedUserNo;
    private String updatedUserId;
    private String updatedDatetime;

    public RatePlanInfoListVo() { }
    public RatePlanInfoListVo(int ratePlanNo, String carrier, String planCode, String planDesc, String planType, String groupType, float mrc, int updatedUserNo, String updatedUserId, String updatedDatetime) {
        this.ratePlanNo = ratePlanNo;
        this.carrier = carrier;
        this.planCode = planCode;
        this.planDesc = planDesc;
        this.planType = planType;
        this.groupType = groupType;
        this.mrc = mrc;
        this.updatedUserNo = updatedUserNo;
        this.updatedUserId = updatedUserId;
        this.updatedDatetime = updatedDatetime;
    }

    public int getRatePlanNo() { return this.ratePlanNo; }
    public void setRatePlanNo(int ratePlanNo) { this.ratePlanNo = ratePlanNo; }

    public String getCarrier() { return this.carrier; }
    public void setCarrier(String carrier) { this.carrier = carrier; }

    public String getPlanCode() { return this.planCode; }
    public void setPlanCode(String planCode) { this.planCode = planCode; }

    public String getPlanDesc() { return this.planDesc; }
    public void setPlanDesc(String planDesc) { this.planDesc = planDesc; }

    public String getPlanType() { return this.planType; }
    public void setPlanType(String planType) { this.planType = planType; }

    public String getGroupType() { return this.groupType; }
    public void setGroupType(String groupType) { this.groupType = groupType; }

    public float getMrc() { return this.mrc; }
    public void setMrc(float mrc) { this.mrc = mrc; }

    public int getUpdatedUserNo() { return this.updatedUserNo; }
    public void setUpdatedUserNo(int updatedUserNo) { this.updatedUserNo = updatedUserNo; }

    public String getUpdatedUserId() { return this.updatedUserId; }
    public void setUpdatedUserId(String updatedUserId) { this.updatedUserId = updatedUserId; }

    public String getUpdatedDatetime() { return this.updatedDatetime; }
    public void setUpdatedDatetime(String updatedDatetime) { this.updatedDatetime = updatedDatetime; }


    public String toJsonString() {
        StringBuffer sb = new StringBuffer();
        sb.append("{");
        sb.append(String.format("\"ratePlanNo\":%d,",this.ratePlanNo));
        if (this.carrier != null) sb.append(String.format("\"carrier\":\"%s\",",this.carrier));
        if (this.planCode != null) sb.append(String.format("\"planCode\":\"%s\",",this.planCode));
        if (this.planDesc != null) sb.append(String.format("\"planDesc\":\"%s\",",this.planDesc));
        if (this.planType != null) sb.append(String.format("\"planType\":\"%s\",",this.planType));
        if (this.groupType != null) sb.append(String.format("\"groupType\":\"%s\",",this.groupType));
        sb.append(String.format("\"mrc\":%f,",this.mrc));
        sb.append(String.format("\"updatedUserNo\":%d,",this.updatedUserNo));
        if (this.updatedUserId != null) sb.append(String.format("\"updatedUserId\":\"%s\",",this.updatedUserId));
        if (this.updatedDatetime != null) sb.append(String.format("\"updatedDatetime\":\"%s\",",this.updatedDatetime));
        if(sb.lastIndexOf(",") == sb.length() -1 ) sb.deleteCharAt(sb.length()-1);
        sb.append("}");
        return sb.toString();
    }

}