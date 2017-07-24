package com.boas.posone.db.dto;

/**
 * Created by Researcher01 on 2016-09-27.
 */
public class RatePlanInfoDto {
    private int ratePlanNo;
    private String carrier;
    private String planCode;
    private String planDesc;
    private String planType;
    private String groupType;
    private float mrc;
    private int reactPlanFlag;
    private float newactPrimeCom;
    private float newactSubprimeCom;
    private float newactEipvadCom;
    private float upgradeUpgCom;
    private float upgradeEipvadCom;
    private float empPrimeCom;
    private float empSubprimeCom;
    private float empEipvadCom1;
    private float empUpgCom;
    private float empEipvadCom2;
    private float mrcAmntForPreCollect;
    private int updatedUserNo;
    private String updatedUserId;
    private String updatedDatetime;

    public RatePlanInfoDto() { }
    public RatePlanInfoDto(int ratePlanNo, String carrier, String planCode, String planDesc, String planType, String groupType, float mrc, int reactPlanFlag, float newactPrimeCom, float newactSubprimeCom, float newactEipvadCom, float upgradeUpgCom, float upgradeEipvadCom, float empPrimeCom, float empSubprimeCom, float empEipvadCom1, float empUpgCom, float empEipvadCom2, float mrcAmntForPreCollect, int updatedUserNo, String updatedUserId, String updatedDatetime) {
        this.ratePlanNo = ratePlanNo;
        this.carrier = carrier;
        this.planCode = planCode;
        this.planDesc = planDesc;
        this.planType = planType;
        this.groupType = groupType;
        this.mrc = mrc;
        this.reactPlanFlag = reactPlanFlag;
        this.newactPrimeCom = newactPrimeCom;
        this.newactSubprimeCom = newactSubprimeCom;
        this.newactEipvadCom = newactEipvadCom;
        this.upgradeUpgCom = upgradeUpgCom;
        this.upgradeEipvadCom = upgradeEipvadCom;
        this.empPrimeCom = empPrimeCom;
        this.empSubprimeCom = empSubprimeCom;
        this.empEipvadCom1 = empEipvadCom1;
        this.empUpgCom = empUpgCom;
        this.empEipvadCom2 = empEipvadCom2;
        this.mrcAmntForPreCollect = mrcAmntForPreCollect;
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

    public int getReactPlanFlag() { return this.reactPlanFlag; }
    public void setReactPlanFlag(int reactPlanFlag) { this.reactPlanFlag = reactPlanFlag; }

    public float getNewactPrimeCom() { return this.newactPrimeCom; }
    public void setNewactPrimeCom(float newactPrimeCom) { this.newactPrimeCom = newactPrimeCom; }

    public float getNewactSubprimeCom() { return this.newactSubprimeCom; }
    public void setNewactSubprimeCom(float newactSubprimeCom) { this.newactSubprimeCom = newactSubprimeCom; }

    public float getNewactEipvadCom() { return this.newactEipvadCom; }
    public void setNewactEipvadCom(float newactEipvadCom) { this.newactEipvadCom = newactEipvadCom; }

    public float getUpgradeUpgCom() { return this.upgradeUpgCom; }
    public void setUpgradeUpgCom(float upgradeUpgCom) { this.upgradeUpgCom = upgradeUpgCom; }

    public float getUpgradeEipvadCom() { return this.upgradeEipvadCom; }
    public void setUpgradeEipvadCom(float upgradeEipvadCom) { this.upgradeEipvadCom = upgradeEipvadCom; }

    public float getEmpPrimeCom() { return this.empPrimeCom; }
    public void setEmpPrimeCom(float empPrimeCom) { this.empPrimeCom = empPrimeCom; }

    public float getEmpSubprimeCom() { return this.empSubprimeCom; }
    public void setEmpSubprimeCom(float empSubprimeCom) { this.empSubprimeCom = empSubprimeCom; }

    public float getEmpEipvadCom1() { return this.empEipvadCom1; }
    public void setEmpEipvadCom1(float empEipvadCom1) { this.empEipvadCom1 = empEipvadCom1; }

    public float getEmpUpgCom() { return this.empUpgCom; }
    public void setEmpUpgCom(float empUpgCom) { this.empUpgCom = empUpgCom; }

    public float getEmpEipvadCom2() { return this.empEipvadCom2; }
    public void setEmpEipvadCom2(float empEipvadCom2) { this.empEipvadCom2 = empEipvadCom2; }

    public float getMrcAmntForPreCollect() { return this.mrcAmntForPreCollect; }
    public void setMrcAmntForPreCollect(float mrcAmntForPreCollect) { this.mrcAmntForPreCollect = mrcAmntForPreCollect; }

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
        sb.append(String.format("\"reactPlanFlag\":%d,",this.reactPlanFlag));
        sb.append(String.format("\"newactPrimeCom\":%f,",this.newactPrimeCom));
        sb.append(String.format("\"newactSubprimeCom\":%f,",this.newactSubprimeCom));
        sb.append(String.format("\"newactEipvadCom\":%f,",this.newactEipvadCom));
        sb.append(String.format("\"upgradeUpgCom\":%f,",this.upgradeUpgCom));
        sb.append(String.format("\"upgradeEipvadCom\":%f,",this.upgradeEipvadCom));
        sb.append(String.format("\"empPrimeCom\":%f,",this.empPrimeCom));
        sb.append(String.format("\"empSubprimeCom\":%f,",this.empSubprimeCom));
        sb.append(String.format("\"empEipvadCom1\":%f,",this.empEipvadCom1));
        sb.append(String.format("\"empUpgCom\":%f,",this.empUpgCom));
        sb.append(String.format("\"empEipvadCom2\":%f,",this.empEipvadCom2));
        sb.append(String.format("\"mrcAmntForPreCollect\":%f,",this.mrcAmntForPreCollect));
        sb.append(String.format("\"updatedUserNo\":%d,",this.updatedUserNo));
        if (this.updatedUserId != null) sb.append(String.format("\"updatedUserId\":\"%s\",",this.updatedUserId));
        if (this.updatedDatetime != null) sb.append(String.format("\"updatedDatetime\":\"%s\",",this.updatedDatetime));
        if(sb.lastIndexOf(",") == sb.length() -1 ) sb.deleteCharAt(sb.length()-1);
        sb.append("}");
        return sb.toString();
    }

}