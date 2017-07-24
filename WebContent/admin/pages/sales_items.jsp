<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page import="com.boas.posone.util.UtilMethodClass"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil" %>
<%
    session.setAttribute("wrp_admin_last_loaded_page","sales_items");
    String storeId = MyRequestUtil.getString(request, "storeId", null);
    String owner_id = (session.getAttribute("wrp_admin_store_owner_id") != null)? session.getAttribute("wrp_admin_store_owner_id").toString() : null;
    if (storeId == null) {
        storeId = (session.getAttribute("wrp_admin_selected_store_id") != null)? session.getAttribute("wrp_admin_selected_store_id").toString() : null;
    }
    String userId = (session.getAttribute("posone_admin_login_user_id") != null)? session.getAttribute("posone_admin_login_user_id").toString() : null;
    boolean isOwner = (session.getAttribute("wrp_admin_login_user_owner_flag") != null && session.getAttribute("wrp_admin_login_user_owner_flag").toString().equals("1"))? true: false;
    JSONObject permissionData = null;
    if (!isOwner && owner_id != null && storeId != null) {
    //    permissionData = (JSONObject) ((JSONObject) UtilMethodClass.getSingleton().getPermissionData(owner_id, storeId, userId)).get("Sales Items");
    }

    JSONObject obj = null;
%>
<%
    if (isOwner || permissionData != null && permissionData.get("allow") != null && (Boolean)permissionData.get("allow") == true) {
%>
<div pagename="sales_items" class="theme-01">
    <div class="page-title-wrapper">
        <div class="page-title">
            Sales Items
        </div>
        <div class="page-sub-title">
            information Management
        </div>
        <div class="left-input-area">
<%
        obj = (JSONObject)UtilMethodClass.getSingleton().getPermissionDataByName(permissionData, "Add");
        if (isOwner || (obj != null && obj.get("allow") != null && (Boolean)obj.get("allow") == true)) {
%>
            <div class="btn sky" onclick="WRPAdminApp.pagescript.initItemEditContainer();">
                + ADD ITEM
            </div>
<%
        }
%>

        </div>
        <div class="right-input-area">
            <label for="item-search-type-1"><input type="radio" name="itemSearchType" id="item-search-type-1" value="1"/>ID</label>
            <label for="item-search-type-2"><input type="radio" name="itemSearchType" id="item-search-type-2" value="2"/>Name</label>
            <label for="item-search-type-3"><input type="radio" name="itemSearchType" id="item-search-type-3" value="3"/>Company</label>
            <label for="item-search-type-0"><input type="radio" name="itemSearchType" id="item-search-type-0" value="0" checked/>ALL</label>
            <div class="search-container">
                <input type="text" placeholder="Keyword"/>
                <div class="right-btn">
                </div>
            </div>
        </div>
    </div>
    <div class="page-content-wrapper">
        <div class="page-content">
            <table class="header-fixed-table" height="520">
                <thead>
                    <tr>
                        <th>Item Code</th>
                        <th>Description</th>
                        <th>Company / Carrier</th>
                        <th>Category</th>
                        <th>Sub-Category</th>
                        <th>Manufacturer</th>
                        <th>Color</th>
                        <th>Qty</th>
                        <th>Item Cost</th>
                    </tr>
                </thead>
                <tbody id="item-list">

                </tbody>
            </table>
        </div>
    </div>
    <div class="popup-area">
<%
        obj = (JSONObject)UtilMethodClass.getSingleton().getPermissionDataByName(permissionData, "Item Management");
        if (isOwner || (obj != null && obj.get("allow") != null && (Boolean)obj.get("allow") == true)) {
%>
        <div class="popup-container" popupname="itemEditContainer">
            <div class="close-btn" onclick="">
            </div>
            <div class="title-bar">
                ITEM MANAGEMENT
            </div>

            <div class="plain-view">
                <div class="plain-content">
                    <div class="panel">
                        <div class="title">
                            <div class="left-area">Item Information</div>
<%
            obj = (JSONObject)UtilMethodClass.getSingleton().getPermissionDataByName(obj, "Save");
            if (isOwner || (obj != null && obj.get("allow") != null && (Boolean)obj.get("allow") == true)) {
%>
                            <div class="right-area text_right"><div class="btn sky" onclick="WRPAdminApp.pagescript.updateItemDictInfo();">SAVE INFORMATION</div></div>
<%
            }
%>
                        </div>
                        <div class="content">
                            <div class="line">
                                <div class="grid-3">
                                    Item Code
                                </div>
                                <div class="grid-3">
                                    <input type="text" class="fill_width_parent" id="item-edit-item-code"/>
                                </div>
                                <div class="grid-3">
                                    Model
                                </div>
                                <div class="grid-3">
                                    <input type="text" class="fill_width_parent" id="item-edit-item-model"/>
                                </div>
                            </div>
                            <div class="line">
                                <div class="grid-3">
                                    Item Description
                                </div>
                                <div class="grid-9">
                                    <input type="text" class="fill_width_parent" id="item-edit-item-description"/>
                                </div>
                            </div>
                            <div class="line">
                                <div class="grid-3">
                                    Company / Carrier
                                </div>
                                <div class="grid-3">
                                    <input type="text" class="fill_width_parent" id="item-edit-item-distributor"/>
                                </div>
                                <div class="grid-3">
                                    Manufacturer
                                </div>
                                <div class="grid-3">
                                    <input type="text" class="fill_width_parent" id="item-edit-item-manufacturer"/>
                                </div>
                            </div>
                            <div class="line">
                                <div class="grid-3">
                                    Category
                                </div>
                                <div class="grid-3">
                                    <select class="fill_width_parent" id="item-edit-item-category" onchange="WRPAdminApp.pagescript.getCategoriesDicListByParentSID(this.value);">
                                    </select>
                                </div>
                                <div class="grid-3">
                                    Sub Category
                                </div>
                                <div class="grid-3">
                                    <select class="fill_width_parent" id="item-edit-item-sub-category">
                                    </select>
                                </div>
                            </div>
                            <div class="line">
                                <div class="grid-3">
                                    Color
                                </div>
                                <div class="grid-3">
                                    <input type="text" class="fill_width_parent" id="item-edit-item-color"/>
                                </div>
                                <div class="grid-3">
                                    Condition
                                </div>
                                <div class="grid-3">
                                    <input type="text" class="fill_width_parent" id="item-edit-item-condition"/>
                                </div>
                            </div>
                            <div class="line">
                                <div class="grid-3">
                                    SKU
                                </div>
                                <div class="grid-3">
                                    <input type="text" class="fill_width_parent" id="item-edit-item-sku"/>
                                </div>

                                <div class="grid-3">
                                    item type
                                </div>
                                <div class="grid-3">
                                    <select id="item-edit-item-type" class="fill_width_parent" onchange="WRPAdminApp.pagescript.onItemTypeValueChanged();">
                                        <option value="0">Phone</option>
                                        <option value="1">Sim Card</option>
                                        <option value="2">Accessory (Serialized)</option>
                                        <option value="3">Accessory</option>
                                    </select>
                                </div>

                                <!--
                                <div class="grid-3">
                                    Serialized
                                </div>
                                <div class="grid-3">
                                    <input type="checkbox" id="item-edit-serialized"/>
                                </div>
                                -->
                            </div>
                            <div class="line">
                                <div class="grid-3">
                                    Item cost
                                </div>
                                <div class="grid-3">
                                    <input type="text" class="fill_width_parent dollar" id="item-edit-item-cost"/>
                                </div>
                                <div class="grid-3">
                                    Qty
                                </div>
                                <div class="grid-3" id="item-edit-item-qty-wrapper">
                                    <input type="text" class="fill_width_parent" id="item-edit-item-qty"/>
                                </div>
                            </div>
                            <div class="line item-edit-for-only-tangible" >
                                <div class="grid-3">
                                    Retail Price
                                </div>
                                <div class="grid-3">
                                    <input type="text" class="fill_width_parent dollar" id="item-edit-item-retail-price"/>
                                </div>
                                <div class="grid-3">
                                    Wholesale Price
                                </div>
                                <div class="grid-3">
                                    <input type="text" class="fill_width_parent dollar" id="item-edit-item-wholesale-price"/>
                                </div>
                            </div>
                            <div class="line" style="height: 100px;">
                                <div class="grid-3">
                                    Image<br/>
                                    <span style="font-size: 11px;">(Click a Box if you want change image)</span>
                                </div>
                                <form id="form-upload-image" method="post" enctype="multipart/form-data" style="display: none;">
                                    <input type="file" class="fill_width_parent" name="itemImageFile" id="item-edit-item-image" onchange="WRPAdminApp.pagescript.setItemImagePreview();"/>
                                </form>
                                <div class="grid-9" style="" id="item-edit-image-preview" onclick="try { document.getElementById('item-edit-item-image').click(); } catch(e) { }">

                                </div>
                            </div>
                            <div class="line item-edit-for-only-serialized" style="margin-bottom: 0px; padding-bottom: 5px;">
                                <div class="grid-3" style="font-size: 15px;">
                                    Serial Numbers
                                </div>
                            </div>
                            <div class="hr item-edit-for-only-serialized" style="margin-top: 0px; margin-bottom: 5px;"></div>
                            <div class="line item-edit-for-only-serialized" style="height: 116px;">
                                <div class="grid-12">
                                    <div class="table" id="item-edit-inven-serial-no-tb">
                                        <div class="thead">
                                            <div class="tr">
                                                <div class="td">Serial No.</div>
                                                <div class="td">P.O. ID</div>
                                                <div class="td">Vendor</div>
                                                <div class="td">Update Date</div>
                                                <div class="td">Update User</div>
                                            </div>
                                        </div>
                                        <div class="tbody" id="item-edit-inven-serial-no-list">
                                            <div class="tr">
                                                <div class="td"></div>
                                                <div class="td"></div>
                                                <div class="td"></div>
                                                <div class="td"></div>
                                                <div class="td"></div>
                                            </div>
                                            <div class="tr">
                                                <div class="td"></div>
                                                <div class="td"></div>
                                                <div class="td"></div>
                                                <div class="td"></div>
                                                <div class="td"></div>
                                            </div>
                                            <div class="tr">
                                                <div class="td"></div>
                                                <div class="td"></div>
                                                <div class="td"></div>
                                                <div class="td"></div>
                                                <div class="td"></div>
                                            </div>
                                            <div class="tr">
                                                <div class="td"></div>
                                                <div class="td"></div>
                                                <div class="td"></div>
                                                <div class="td"></div>
                                                <div class="td"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


<%
            }
%>
    </div>
</div>
<%
    }
%>