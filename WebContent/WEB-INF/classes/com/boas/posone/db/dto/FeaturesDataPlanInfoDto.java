package com.boas.posone.db.dto;

import java.text.DecimalFormat;

import com.boas.posone.util.UtilMethodClass;

public class FeaturesDataPlanInfoDto {
	private int no;
	private String planCode;
	private String planDescription;
	private String planType;
	private float mrc;
	
	public FeaturesDataPlanInfoDto() {
		
	}
	
	public FeaturesDataPlanInfoDto(int no, String planCode, String planDescription, String planType, float mrc) {
		this.no = no;
		this.planCode = planCode;
		this.planDescription = planDescription;
		this.planType = planType;
		this.mrc = mrc;
	}
	
	public int getNo() {
		return this.no;
	}
	
	public void setNo(int no) {
		this.no = no;
	}
	
	public String getPlanCode() {
		return this.planCode;
	}
	
	public void setPlanCode(String planCode) {
		this.planCode = planCode;
	}
	
	public String getPlanDescription() {
		return this.planDescription;
	}
	
	public void setPlanDescription(String planDescription) {
		this.planDescription = planDescription;
	}
	
	public String getPlanType() {
		return this.planType;
	}
	
	public void setPlanType(String planType) {
		this.planType = planType;
	}
	
	public float getMrc() {
		return this.mrc;
	}
	
	public void setMrc(float mrc) {
		this.mrc = mrc;
	}
	
	public String toJsonString() {
		StringBuffer sb = new StringBuffer();
		DecimalFormat df = new DecimalFormat("0.00");
		sb.append("{");
		sb.append(String.format("\"no\":%d,", this.no));
		if (this.planCode == null) sb.append("\"plan_code\":null,");
		else sb.append(String.format("\"plan_code\":\"%s\",", this.planCode));
		if (this.planDescription == null) sb.append("\"plan_description\":null,");
		else sb.append(String.format("\"plan_description\":\"%s\",", UtilMethodClass.getSingleton().convertPlainTextToHtmlText(this.planDescription)));
		if (this.planType == null) sb.append("\"plan_type\":null,");
		else sb.append(String.format("\"plan_type\":\"%s\",", this.planType));
		sb.append(String.format("\"mrc\":%s", df.format(this.mrc)));
		sb.append("}");
		return sb.toString();
	}
}
