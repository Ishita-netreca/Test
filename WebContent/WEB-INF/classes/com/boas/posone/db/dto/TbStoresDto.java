package com.boas.posone.db.dto;

/**
 * Created by Researcher01 on 2016-09-28.
 */
public class TbStoresDto {
    private int sid;
    private String storeId;
    private String name;
    private String address1;
    private String address2;
    private String city;
    private String state;
    private String zipcode;
    private String tel;
    private String fax;
    private String owner;
    private String districtCode;
    private String areaCode;
    private String carrierMarketId;
    private float taxRate;

    public TbStoresDto() { }
    public TbStoresDto(int sid, String storeId, String name, String address1, String address2, String city, String state, String zipcode, String tel, String fax, String owner, String districtCode, String areaCode, String carrierMarketId, float taxRate) {
        this.sid = sid;
        this.storeId = storeId;
        this.name = name;
        this.address1 = address1;
        this.address2 = address2;
        this.city = city;
        this.state = state;
        this.zipcode = zipcode;
        this.tel = tel;
        this.fax = fax;
        this.owner = owner;
        this.districtCode = districtCode;
        this.areaCode = areaCode;
        this.carrierMarketId = carrierMarketId;
        this.taxRate = taxRate;
    }

    public int getSid() { return this.sid; }
    public void setSid(int sid) { this.sid = sid; }

    public String getStoreId() { return this.storeId; }
    public void setStoreId(String storeId) { this.storeId = storeId; }

    public String getName() { return this.name; }
    public void setName(String name) { this.name = name; }

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

    public String getFax() { return this.fax; }
    public void setFax(String fax) { this.fax = fax; }

    public String getOwner() { return this.owner; }
    public void setOwner(String owner) { this.owner = owner; }

    public String getDistrictCode() { return this.districtCode; }
    public void setDistrictCode(String districtCode) { this.districtCode = districtCode; }

    public String getAreaCode() { return this.areaCode; }
    public void setAreaCode(String areaCode) { this.areaCode = areaCode; }

    public String getCarrierMarketId() { return this.carrierMarketId; }
    public void setCarrierMarketId(String carrierMarketId) { this.carrierMarketId = carrierMarketId; }

    public float getTaxRate() { return this.taxRate; }
    public void setTaxRate(float taxRate) { this.taxRate = taxRate; }


    public String toJsonString() {
        StringBuffer sb = new StringBuffer();
        sb.append("{");
        sb.append(String.format("\"sid\":%d,",this.sid));
        if (this.storeId != null) sb.append(String.format("\"storeId\":\"%s\",",this.storeId));
        if (this.name != null) sb.append(String.format("\"name\":\"%s\",",this.name));
        if (this.address1 != null) sb.append(String.format("\"address1\":\"%s\",",this.address1));
        if (this.address2 != null) sb.append(String.format("\"address2\":\"%s\",",this.address2));
        if (this.city != null) sb.append(String.format("\"city\":\"%s\",",this.city));
        if (this.state != null) sb.append(String.format("\"state\":\"%s\",",this.state));
        if (this.zipcode != null) sb.append(String.format("\"zipcode\":\"%s\",",this.zipcode));
        if (this.tel != null) sb.append(String.format("\"tel\":\"%s\",",this.tel));
        if (this.fax != null) sb.append(String.format("\"fax\":\"%s\",",this.fax));
        if (this.owner != null) sb.append(String.format("\"owner\":\"%s\",",this.owner));
        if (this.districtCode != null) sb.append(String.format("\"districtCode\":\"%s\",",this.districtCode));
        if (this.areaCode != null) sb.append(String.format("\"areaCode\":\"%s\",",this.areaCode));
        if (this.carrierMarketId != null) sb.append(String.format("\"carrierMarketId\":\"%s\",",this.carrierMarketId));
        sb.append(String.format("\"taxRate\":%f,",this.taxRate));
        if(sb.lastIndexOf(",") == sb.length() -1 ) sb.deleteCharAt(sb.length()-1);
        sb.append("}");
        return sb.toString();
    }

}