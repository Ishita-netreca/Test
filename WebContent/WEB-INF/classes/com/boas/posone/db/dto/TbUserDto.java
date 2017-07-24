package com.boas.posone.db.dto;

/**
 * Created by Researcher01 on 2016-09-28.
 */
public class TbUserDto {
    private int sid;
    private String userId;
    private int userType;
    private String firstName;
    private String middleName;
    private String lastName;
    private String address1;
    private String address2;
    private String city;
    private String state;
    private String zipcode;
    private String tel;
    private String email;
    private String payrollId;
    private int disable;

    public TbUserDto() { }
    public TbUserDto(int sid, String userId, int userType, String firstName, String middleName, String lastName, String address1, String address2, String city, String state, String zipcode, String tel, String email, String payrollId, int disable) {
        this.sid = sid;
        this.userId = userId;
        this.userType = userType;
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.address1 = address1;
        this.address2 = address2;
        this.city = city;
        this.state = state;
        this.zipcode = zipcode;
        this.tel = tel;
        this.email = email;
        this.payrollId = payrollId;
        this.disable = disable;
    }

    public int getSid() { return this.sid; }
    public void setSid(int sid) { this.sid = sid; }

    public String getUserId() { return this.userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public int getUserType() { return this.userType; }
    public void setUserType(int userType) { this.userType = userType; }

    public String getFirstName() { return this.firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getMiddleName() { return this.middleName; }
    public void setMiddleName(String middleName) { this.middleName = middleName; }

    public String getLastName() { return this.lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getAddress1() { return this.address1; }
    public void setAddress1(String address1) { this.address1 = address1; }

    public String getAddress2() { return this.address2; }
    public void setAddress2(String address2) { this.address2 = address2; }

    public String getCity() { return this.city; }
    public void setCity(String city) { this.city = city; }

    public String getState() { return this.state; }
    public void setState(String state) { this.state = state; }

    public String getZipcode() { return this.zipcode; }
    public void setZipcode(String zipcode) { this.zipcode = zipcode; }

    public String getTel() { return this.tel; }
    public void setTel(String tel) { this.tel = tel; }

    public String getEmail() { return this.email; }
    public void setEmail(String email) { this.email = email; }

    public String getPayrollId() { return this.payrollId; }
    public void setPayrollId(String payrollId) { this.payrollId = payrollId; }

    public int getDisable() { return this.disable; }
    public void setDisable(int disable) { this.disable = disable; }


    public String toJsonString() {
        StringBuffer sb = new StringBuffer();
        sb.append("{");
        sb.append(String.format("\"sid\":%d,",this.sid));
        if (this.userId != null) sb.append(String.format("\"userId\":\"%s\",",this.userId));
        sb.append(String.format("\"userType\":%d,",this.userType));
        if (this.firstName != null) sb.append(String.format("\"firstName\":\"%s\",",this.firstName));
        if (this.middleName != null) sb.append(String.format("\"middleName\":\"%s\",",this.middleName));
        if (this.lastName != null) sb.append(String.format("\"lastName\":\"%s\",",this.lastName));
        if (this.address1 != null) sb.append(String.format("\"address1\":\"%s\",",this.address1));
        if (this.address2 != null) sb.append(String.format("\"address2\":\"%s\",",this.address2));
        if (this.city != null) sb.append(String.format("\"city\":\"%s\",",this.city));
        if (this.state != null) sb.append(String.format("\"state\":\"%s\",",this.state));
        if (this.zipcode != null) sb.append(String.format("\"zipcode\":\"%s\",",this.zipcode));
        if (this.tel != null) sb.append(String.format("\"tel\":\"%s\",",this.tel));
        if (this.email != null) sb.append(String.format("\"email\":\"%s\",",this.email));
        if (this.payrollId != null) sb.append(String.format("\"payrollId\":\"%s\",",this.payrollId));
        sb.append(String.format("\"disable\":%d,",this.disable));
        if(sb.lastIndexOf(",") == sb.length() -1 ) sb.deleteCharAt(sb.length()-1);
        sb.append("}");
        return sb.toString();
    }

}