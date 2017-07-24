<%@page import="java.util.Date"%>
<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="com.boas.wrp.util.MyDBUtil"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="org.json.simple.parser.*"%>
<%@ page import="java.io.*" %>
<%@ page import="java.text.SimpleDateFormat"%>
<%@page import="com.oreilly.servlet.MultipartRequest"%>
<%@page import="org.apache.poi.ss.usermodel.Workbook"%>
<%@page import="org.apache.poi.ss.usermodel.WorkbookFactory"%>
<%@page import="org.apache.poi.ss.usermodel.Cell"%>
<%@page import="org.apache.poi.ss.usermodel.Row"%>
<%@page import="org.apache.poi.ss.usermodel.Sheet"%>
<%@ include file="../common.jsp" %>
<%
		StringBuffer query = new StringBuffer();
		session.setAttribute("wrp_admin_upload_reconciliation_last_row_num", 0);
		session.setAttribute("wrp_admin_upload_reconciliation_curr_row_num", -1);

		String flag = "";
		
		Date time;
		
		int cell_ = 0;
		
		int upload = 0;
		
		Workbook mWorkbook = null;
		Sheet sheet = null;
		
		boolean isHeaderContained = true;
		
		HashMap<Integer, String> columnsMap = null;
		
		String strTmp = null;
		String []strArrTmp = null;
		int count = 0;
		
		try {
		    if (db_name == null) {
		        throw new Exception();
		    }
			String realPath = String.format("%s/uploads/%s", application.getRealPath("/"), user_id.toLowerCase());
			int maxSize = 1024 * 1024 * 30; // 30 MB
			int date_count = 1;
			File f = new File (realPath);
			if (!f.isFile()) {
				if (!f.isDirectory()) {
					f.mkdir();
				}
			}
			SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
			SimpleDateFormat sdf2 = new SimpleDateFormat("yyyy-MM-dd");

			MultipartRequest mRequest = new MultipartRequest(request, realPath, maxSize, "UTF-8");
			f = mRequest.getFile("uploadExcelFile");
			File newFile = null;
			
			if (f.getName().lastIndexOf(".") > -1) 
				newFile = new File(String.format("%s/%s_%s%s",f.getParent(), f.getName(), sdf.format(Calendar.getInstance().getTime()), f.getName().substring(f.getName().lastIndexOf("."))));
			else  
				newFile = new File(String.format("%s/%s_%s",f.getParent(), f.getName(), sdf.format(Calendar.getInstance().getTime())));
			
			f.renameTo(newFile);
			if (!newFile.getName().endsWith(".xls") && !newFile.getName().endsWith(".xlsx")) {
				out.print(-1);
				throw new Exception();
			}
			
			// Excel File Open & Read
			mWorkbook = WorkbookFactory.create(newFile);
			if (mWorkbook.getNumberOfSheets() < 1) {
				out.print(-2);
				throw new Exception();
			}
			sheet = mWorkbook.getSheetAt(0);
			
			session.setAttribute("wrp_admin_upload_reconciliation_last_row_num", sheet.getLastRowNum());
			//int max_date = MyDBUtil.getInt(String.format("SELECT MAX(date_division) AS sid FROM `%s`.`tb_reconciliation_qualified` ORDER BY `date_division` DESC;", db_name), "sid");
			//int min_date = MyDBUtil.getInt(String.format("SELECT MIN(date_division) AS sid FROM `%s`.`tb_reconciliation_qualified` ORDER BY `date_division` DESC;", db_name), "sid");
			//MyDBUtil.execute(String.format("INSERT INTO `%s`.`tb_reconciliation_update_%s` SET `update_date`=now(), `file`='%s', `user_id`='%s', `type`='1'", db_name, db_name, f.getName().toString(), user_sid));
			//MyDBUtil.execute(String.format("DELETE FROM `%s`.`tb_reconciliation_qualified`;", db_name));
			//MyDBUtil.execute(String.format("INSERT INTO `%s`.`tb_reconciliation_update_%s` SET `update_date`=now(), `file`='%s', `user_id`='%s', `type`='2'", db_name, db_name, f.getName().toString(), user_sid));
			int sid = MyDBUtil.getInstance().getInt(String.format("SELECT MAX(sid) AS sid FROM `%s`.`tb_reconciliation_update_%s` ORDER BY `sid` DESC;", db_name, db_name ), "sid");
			int i=0;
			String[] columns = {"door_code",   
								"door_name",   
								"address",   
								"asap_login",   
								"account_number",   
								"subscriber_id",   
								"mdn",   
								"esn",   
								"sim",   
								"esn_history",   
								"sim_history",
								"subscriber_status", 
								"account_balance",
								"handset_model",   
								"transaction_date",  
								"transaction_type",   
								"rate_plan",   
								"bolt_on",   
								"business_rule_reason_code",
								};
			
			try {
				for (Row row : sheet) {
					session.setAttribute("wrp_admin_upload_reconciliation_curr_row_num", row.getRowNum());
					if (row.getCell(0) == null || row.getCell(1) == null || row.getCell(2) == null || row.getCell(3) == null) {
						continue;
					} else {
						if (!row.getCell(0).toString().contains("Door Code") && !(	row.getCell(0).toString().equals("") || 
																					row.getCell(1).toString().equals("") || 
																					row.getCell(2).toString().equals("") || 
																					row.getCell(3).toString().equals(""))) {
							query.append(String.format("INSERT INTO `%s`.`tb_reconciliation_disqualified` SET", db_name));

							for (Cell cell : row) {
								if (cell.getColumnIndex() > 18) break;

								strTmp = cell.toString();
								if (cell.getColumnIndex() == 14) {
									strArrTmp = strTmp.split("/");
									strTmp = strArrTmp[2]+"-"+strArrTmp[0]+"-"+strArrTmp[1];
									query.append(String.format(" `%s`=STR_TO_DATE('%s', '%%Y-%%m-%%d'),", columns[cell.getColumnIndex()], strTmp));
								} else {
									query.append(String.format(" `%s`='%s',", columns[cell.getColumnIndex()], strTmp));
								}
							}
							query.append(String.format("`update_sid`=-1;"));
						}
					}
					count++;
					if (count > 999) {
						if (MyDBUtil.getInstance().execute(query.toString()) == 0) {

							query.delete(0, query.length());
							count = 0;
						} else {
							out.print(-3);
							count = -1;
							break;
						}
					}	
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
			MyDBUtil.getInstance().execute(query.toString());
			session.setAttribute("wrp_admin_upload_reconciliation_curr_row_num", sheet.getLastRowNum());
			mWorkbook.close();
		} catch (Exception e) {			
            if (e.getMessage() != null && e.getMessage().length() > 0) {
		    	e.printStackTrace();
            }
		}
		
		strTmp = null;
		query = null;
%>