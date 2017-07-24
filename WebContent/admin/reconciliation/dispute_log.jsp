<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!doctype html>
<html>
    <head>
        <meta charset="UTF-8"/>
        <meta http-equiv="cache-control" content="no-cache"/>
        <title>WRP DISPUTE LOGGER</title>
       
        <link type="text/css" rel="stylesheet" href="https://myaccount.posmasterus.com/common/jquery/jquery-ui.min.css"/>
        
        <script type="text/javascript" src="https://myaccount.posmasterus.com/common/jquery/jquery-1.10.2.min.js"></script>
        <script type="text/javascript" src="https://myaccount.posmasterus.com/common/jquery/jquery-ui.min.js"></script>
        <style>
        	* {
        		margin: 0px;
        		padding: 0px;
        		-webkit-box-sizing: border-box;
        		-moz-box-sizing: border-box;
        		-ms-box-sizing: border-box;
        		-o-box-sizing: border-box;
        		-box-sizing: border-box;
        	}
        
        	body > article {
        		width: 1200px;
        		margin: 0 auto;
        	}
        	
        	.line {
        		clear: both;
        		min-height: 20px;
        		margin-bottom: 10px;
        		display: inline-block;
        		width: 100%;
        	}      		
			
			*[class^="grid-"] {
			    float: left;
			    height: 100%;
			    margin-left: 2%;
			    margin-right: 0px;
			    position: relative;
			    font-size: 11px;
			}
			
			*[class^="grid-"]:first-of-type {
			    margin-left: 0px;
			    font-size: 11px;
			}
			
			.grid-1 {
			    width: 6.5%;
			}
			
			.grid-1-5 {
			    width: 10.75%;
			}
			
			.grid-2 {
			    width: 15%;
			}
			
			.grid-2-5 {
			    width: 19.25%;
			}
			
			.grid-3 {
			    width: 23.5%;
			}
			
			.grid-3-5 {
			    width: 26.75%;
			}
			
			.grid-4 {
			    width: 32%;
			}
			
			.grid-4-5 {
			    width: 36.25%;
			}
			
			.grid-5 {
			    width: 40.5%;
			}
			
			.grid-5-5 {
			    width: 44.75%;
			}
			
			.grid-6 {
			    width: 49%;
			}
			
			.grid-6-5 {
			    width: 53.25%;
			}
			
			.grid-7 {
			    width: 57.5%;
			}
			
			.grid-7-5 {
			    width: 61.75%;
			}
			
			.grid-8 {
			    width: 66%;
			}
			
			.grid-8-5 {
			    width: 70.25%;
			}
			
			.grid-9 {
			    width: 74.5%;
			}
			
			.grid-10 {
			    width: 83%;
			}
			
			.grid-11 {
			    width: 91.5%;
			}
			
			.grid-12 {
			    width: 100%;
			}
			
			#master-store-list label {
				float: left;
				min-width: 100px;
				margin-right: 10px;
			}
			
			#master-store-list label:nth-of-type(8n) {
				clear: both;
			}
			
			#dispute-log-list {
			
			}
			
			#dispute-log-list > table {
				width: 100%;
				
				border-collapse: collapse;
			}				
			
			#dispute-log-list > table > thead > tr {
				background-color: rgba(242,242,242,1);
			}			
			
			#dispute-log-list > table > thead > tr > th {
				border: 1px solid;
				font-size: 13px;
			}
			
			#dispute-log-list > table > tbody > tr {
				background-color: rgba(255,255,255,1);
			}			
			
			#dispute-log-list > table > tbody > tr:nth-of-type(2n) {
				background-color: rgba(242,242,242,1);
			}			
			
			#dispute-log-list > table > tbody > tr > td {
				border: 1px solid;
				font-size: 11px;
				text-align: center;
			}
			
        </style>
    </head>
    <body>
    	<article>
	        <div class="line" style="text-align: center;">
	        	<h1>WRP DISPUTE LOGGER</h1>
	        </div>
	        <div class="line">
	        	<div class="grid-2" style="text-align: right;">
	        		SELECT MASTER
	        	</div>
	        	<div class="grid-4">
	        		<select id="select-master-list" onchange="WRPDisputeLogger.getMasterStoreList(this.value);">
	        			
	        		</select>
	        	</div>
	        </div>
	        <div class="line">
	        	<div class="grid-2" style="text-align: right;">
	        		SELECT STORE
	        	</div>
	        	<div class="grid-10" id="master-store-list">
	        	
	        	</div>
	        </div>
	        <div class="line">
	        	<div class="grid-2" style="text-align: right;">
	        		SET PERIOD
	        	</div>
	        	<div class="grid-10">
	        		<input type="text" class="jquery-datepicker" id="set-period-start-date" readonly/>	        		
	        		~        	
	        		<input type="text" class="jquery-datepicker" id="set-period-end-date" readonly/>
	        	</div>
	        </div>
	        <div class="line" style="text-align: center;">	
	        	<button onclick="WRPDisputeLogger.getDisputeLogList();">Search</button>
	        </div>
	        <div class="line" id="dispute-log-list">
	        	
	        </div>
    	</article>
    	<script type="text/javascript" src="dispute_log.js"></script>
    	<script type="text/javascript">    		
    	WRPDisputeLogger.getMasterList();
    		$(".jquery-datepicker").datepicker();
    	</script>
    </body>
</html>