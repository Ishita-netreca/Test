<%@ page import="com.boas.posone.util.MyRequestUtil" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.Calendar" %>
<%@ page import="java.text.SimpleDateFormat" %>
<!doctype html>
<%
    String timestamp = new SimpleDateFormat("yyyyMMddHHmmss").format(Calendar.getInstance().getTime());
%>
<html>
    <head>
        <meta charset="UTF-8"/>
        <meta http-equiv="cache-control" content="no-cache"/>
        <title>Permission Test Page</title>
        <link type="text/css" rel="stylesheet" href="https://myaccount.posmasterus.com/common/jquery/jquery-ui.min.css?timestamp=<%=timestamp%>"/>
    	<link rel="stylesheet" href="https://myaccount.posmasterus.com/common/jqwidgets/styles/jqx.base.css?timestamp=<%=timestamp%>" type="text/css" />
        <link rel="stylesheet" type="text/css" href="https://myaccount.posmasterus.com/common/jqwidgets/styles/jqx.arctic.css?timestamp=<%=timestamp%>"/>
        <script type="text/javascript" src="https://myaccount.posmasterus.com/common/jquery/jquery-1.10.2.min.js?timestamp=<%=timestamp%>"></script>
        <script type="text/javascript" src="https://myaccount.posmasterus.com/common/jquery/jquery-ui.min.js?timestamp=<%=timestamp%>"></script>
        <script type="text/javascript" src="https://myaccount.posmasterus.com/common/jquery/jquery.form.js?timestamp=<%=timestamp%>"></script>
        <script type="text/javascript" src="https://myaccount.posmasterus.com/common/scrollbar/jquery.scrollbar.js?timestamp=<%=timestamp%>"></script>

        <script type="text/javascript" src="https://myaccount.posmasterus.com/common/d3/d3.v3.min.js?timestamp=<%=timestamp%>"></script>
        <script type="text/javascript" src="https://myaccount.posmasterus.com/common/xls/xls.js?timestamp=<%=timestamp%>"></script>        
        
	    <script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxcore.js?timestamp=<%=timestamp%>"></script>
    	<script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxtabs.js?timestamp=<%=timestamp%>"></script>
	    <script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxdata.js?timestamp=<%=timestamp%>"></script> 
	    <script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxdatatable.js?timestamp=<%=timestamp%>"></script>
   	 	<script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxwindow.js?timestamp=<%=timestamp%>"></script>
	    <script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxbuttons.js?timestamp=<%=timestamp%>"></script>
	    <script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxradiobutton.js?timestamp=<%=timestamp%>"></script>
	    <script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxscrollbar.js?timestamp=<%=timestamp%>"></script>
	    <script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxlistbox.js?timestamp=<%=timestamp%>"></script>
	    <script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxdropdownlist.js?timestamp=<%=timestamp%>"></script>
	    <script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxmenu.js?timestamp=<%=timestamp%>"></script>
	    <script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxgrid.js?timestamp=<%=timestamp%>"></script>
	    <script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxgrid.edit.js?timestamp=<%=timestamp%>"></script>
    	<script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxgrid.grouping.js?timestamp=<%=timestamp%>"></script>
	    <script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxgrid.filter.js?timestamp=<%=timestamp%>"></script>
	    <script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxgrid.sort.js?timestamp=<%=timestamp%>"></script>
	    <script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxgrid.selection.js?timestamp=<%=timestamp%>"></script> 
    	<script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxinput.js?timestamp=<%=timestamp%>"></script>
	    <script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxpanel.js?timestamp=<%=timestamp%>"></script>
	    <script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/globalization/globalize.js?timestamp=<%=timestamp%>"></script>
	    <script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxcalendar.js?timestamp=<%=timestamp%>"></script>
	    <script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxdatetimeinput.js?timestamp=<%=timestamp%>"></script>
	    <script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxcheckbox.js?timestamp=<%=timestamp%>"></script>
    	<script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxdraw.js?timestamp=<%=timestamp%>"></script>
		<script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxtooltip.js?timestamp=<%=timestamp%>"></script>
  		<script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxchart.core.js?timestamp=<%=timestamp%>"></script>
	    <script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxpanel.js?timestamp=<%=timestamp%>"></script>
   		<script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxprogressbar.js?timestamp=<%=timestamp%>"></script>
	    <script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxtree.js?timestamp=<%=timestamp%>"></script>
    	<script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxsplitter.js?timestamp=<%=timestamp%>"></script>
    	<script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxgrid.pager.js?timestamp=<%=timestamp%>"></script>
    	<script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxgrid.columnsresize.js?timestamp=<%=timestamp%>"></script>
    	<script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxcombobox.js?timestamp=<%=timestamp%>"></script>
    	<script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxpasswordinput.js?timestamp=<%=timestamp%>"></script>
    	<script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxbargauge.js?timestamp=<%=timestamp%>"></script>
    	<script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxcolorpicker.js?timestamp=<%=timestamp%>"></script>
    	<script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxslider.js?timestamp=<%=timestamp%>"></script>
    	<script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxscrollview.js?timestamp=<%=timestamp%>"></script>
	    <script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxtreegrid.js?timestamp=<%=timestamp%>"></script>
    	<!-- 170120 jh : export.js-->
    	<script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxdata.export.js?timestamp=<%=timestamp%>"></script> 
    	<script type="text/javascript" src="https://myaccount.posmasterus.com/common/jqwidgets/jqxgrid.export.js?timestamp=<%=timestamp%>"></script>
    </head>
    <body>
        <div id="get-checked-row-btn">Get Checked Rows</div>
        <div id="permission-structure"></div>
        <script>
        	$.ajax({
        		url: "ajax/permission/getPermissionStruct.jsp",
        		method: "POST",
        		dataType: "json",
        		success: function(result) {
        			var data;
        		
        			data = result.data;
        			
        			if (!data) return;
        			
        			$("#permission-structure").jqxTreeGrid({
        				width: "99%",
        				source: new $.jqx.dataAdapter({
        					dataType: "json",
        					dataFields: [
        						{name: "sid", type: "number"},
        						{name: "id", type: "string"},
        						{name: "parent_id", type: "string"},
        						{name: "root_id", type: "string"},
        						{name: "name", type: "string"},
        						{name: "description", type: "string"},
        						{name: "value", type: "number"}
        					],
        					hierarchy: {
        						keyDataField: {name: "id"},
        						parentDataField: {name: "parent_id"}
        					},
        					id: "id",
        					localData: data
        				}),
        				checkboxes: true,
        				columns: [
        					{text: "Name", dataField: "name", width: 200},
        					{text: "Description", dataField: "description"}
        				],
        				ready: function() {
        					var data;
        					
        					var checkrowfunc = function(rows) {
            					var i, len, obj;

            					for (i = 0, len = rows.length; i < len; i++) {
            						obj = rows[i];
            						if (obj.records !== undefined && obj.records.length > 0) {
            							checkrowfunc(obj.records);
            						}
            						if (obj.value === undefined) {
            							continue;
            						}
            						if (obj.value > 0) {
            							elem.jqxTreeGrid("checkRow", obj.uid);
            						}
            					}
        					}
        					
        					elem = $("#permission-structure");
        					data = elem.jqxTreeGrid("getRows");
        					
        					checkrowfunc(data);
        				}
        			});
        			
        			$("#get-checked-row-btn").jqxButton({
        				width: 200,
        				height: 30
        			}).on("click", function(event) {
        				console.log($("#permission-structure").jqxTreeGrid("getCheckedRows"));
        			});
        		}
        	});
        	
        </script>
    </body>
</html>