package com.boas.posone.db.vo;

import java.sql.Date;
import java.text.SimpleDateFormat;

/**
 * Created by Researcher01 on 2016-09-29.
 */
public class TbRateplanListVo {
    private int sid;
    private String rateplanCode;
    private String carrier;
    private String description;
    private int planTypeId;
    private int groupTypeId;
    private String planType;
    private String groupType;
    private float mrc;
    private int reactPlanFlag;
    private Date startDate;
    private Date endDate;
    private int updater;
    private Date updateDate;
    private int disable;

    private String userId;

    public TbRateplanListVo() { }
    public TbRateplanListVo(int sid, String rateplanCode, String carrier, String description, int planTypeId, int groupTypeId, float mrc, int reactPlanFlag, Date startDate, Date endDate, int updater, Date updateDate, int disable, String userId) {
        this.sid = sid;
        this.rateplanCode = rateplanCode;
        this.carrier = carrier;
        this.description = description;
        this.planTypeId = planTypeId;
        this.groupTypeId = groupTypeId;
        this.mrc = mrc;
        this.reactPlanFlag = reactPlanFlag;
        this.startDate = startDate;
        this.endDate = endDate;
        this.updater = updater;
        this.updateDate = updateDate;
        this.disable = disable;
        this.userId = userId;
    }

    public int getSid() { return this.sid; }
    public void setSid(int sid) { this.sid = sid; }

    public String getRateplanCode() { return this.rateplanCode; }
    public void setRateplanCode(String rateplanCode) { this.rateplanCode = rateplanCode; }

    public String getCarrier() { return this.carrier; }
    public void setCarrier(String carrier) { this.carrier = carrier; }

    public String getDescription() { return this.description; }
    public void setDescription(String description) { this.description = description; }

    public int getPlanTypeId() { return this.planTypeId; }
    public void setPlanTypeId(int planTypeId) { this.planTypeId = planTypeId; }

    public String getPlanType() { return this.planType; }
    public void setPlanType(String planType) { this.planType = planType; }

    public int getGroupTypeId() { return this.groupTypeId; }
    public void setGroupTypeId(int groupTypeId) { groupTypeId = groupTypeId; }

    public String getGroupType() { return this.groupType; }
    public void setGroupType(String groupType) { this.groupType = groupType; }

    public float getMrc() { return this.mrc; }
    public void setMrc(float mrc) { this.mrc = mrc; }

    public int getReactPlanFlag() { return this.reactPlanFlag; }
    public void setReactPlanFlag(int reactPlanFlag) { this.reactPlanFlag = reactPlanFlag; }

    public Date getStartDate() { return this.startDate; }
    public void setStartDate(Date startDate) { this.startDate = startDate; }

    public Date getEndDate() { return this.endDate; }
    public void setEndDate(Date endDate) { this.endDate = endDate; }

    public int getUpdater() { return this.updater; }
    public void setUpdater(int updater) { this.updater = updater; }

    public Date getUpdateDate() { return this.updateDate; }
    public void setUpdateDate(Date updateDate) { this.updateDate = updateDate; }

    public int getDisable() { return this.disable; }
    public void setDisable(int disable) { this.disable = disable; }

    public String getUserId() { return this.userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String toJsonString() {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        StringBuffer sb = new StringBuffer();
        sb.append("{");
        sb.append(String.format("\"sid\":%d,",this.sid));
        if (this.rateplanCode != null) sb.append(String.format("\"rateplanCode\":\"%s\",",this.rateplanCode));
        if (this.carrier != null) sb.append(String.format("\"carrier\":\"%s\",",this.carrier));
        if (this.description != null) sb.append(String.format("\"description\":\"%s\",",this.description));
        sb.append(String.format("\"planTypeId\":%d,",this.planTypeId));
        sb.append(String.format("\"groupTypeId\":%d,",this.groupTypeId));
        sb.append(String.format("\"mrc\":%f,",this.mrc));
        sb.append(String.format("\"reactPlanFlag\":%d,",this.reactPlanFlag));
        if (this.startDate != null) sb.append(String.format("\"startDate\":\"%s\",",sdf.format(this.startDate)));
        if (this.endDate != null) sb.append(String.format("\"endDate\":\"%s\",",sdf.format(this.endDate)));
        sb.append(String.format("\"updater\":%d,",this.updater));
        if (this.updateDate != null) sb.append(String.format("\"updateDate\":\"%s\",",sdf.format(this.updateDate)));
        sb.append(String.format("\"disable\":%d,",this.disable));
        if (this.userId != null) sb.append(String.format("\"userId\":\"%s\",",this.userId));
        if(sb.lastIndexOf(",") == sb.length() -1 ) sb.deleteCharAt(sb.length()-1);
        sb.append("}");
        return sb.toString();
    }

}