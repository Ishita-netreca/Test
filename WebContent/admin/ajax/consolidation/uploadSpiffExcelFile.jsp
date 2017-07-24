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
		session.setAttribute("wrp_admin_upload_consolidation_last_row_num", 0);
		session.setAttribute("wrp_admin_upload_consolidation_curr_row_num", -1);

		String flag = "";
		
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
			int maxSize = 1024 * 1024 * 100; // 30 MB
			int date_count = 1;
			File f = new File (realPath);
			if (!f.isFile()) {
				if (!f.isDirectory()) {
					f.mkdir();
				}
			}
			SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
			SimpleDateFormat sdf2 = new SimpleDateFormat("yyyyMMddHHmmss");

			MultipartRequest mRequest = new MultipartRequest(request, realPath, maxSize, "UTF-8");
			f = mRequest.getFile("uploadExcelFile");
			File newFile = null;
			if (f.getName().lastIndexOf(".") > -1) newFile = new File(String.format("%s/%s_%s%s",f.getParent(), f.getName(), sdf.format(Calendar.getInstance().getTime()), f.getName().substring(f.getName().lastIndexOf("."))));
			else  newFile = new File(String.format("%s/%s_%s",f.getParent(), f.getName(), sdf.format(Calendar.getInstance().getTime())));
			f.renameTo(newFile);
			if (!newFile.getName().endsWith(".xls") && !newFile.getName().endsWith(".xlsx")) {
				out.print(-1);
				throw new Exception();
			}
			sdf = null;
			sdf = new SimpleDateFormat("MM/dd/yyyy");
			sdf2 = new SimpleDateFormat("yyyyMM");
			mWorkbook = WorkbookFactory.create(newFile);
			if (mWorkbook.getNumberOfSheets() < 1) {
				out.print(-2);
				throw new Exception();
			}
			sheet = mWorkbook.getSheetAt(0);
			session.setAttribute("wrp_admin_upload_consolidation_last_row_num", sheet.getLastRowNum());
			int max_date = MyDBUtil.getInstance().getInt(String.format("SELECT MAX(date_division) AS sid FROM `%s`.`tb_reconsolidation_spiff` ORDER BY `date_division` DESC;", db_name), "sid");
			int min_date = MyDBUtil.getInstance().getInt(String.format("SELECT MIN(date_division) AS sid FROM `%s`.`tb_reconsolidation_spiff` ORDER BY `date_division` DESC;", db_name), "sid");
			MyDBUtil.getInstance().execute(String.format("INSERT INTO `%s`.`tb_consolidation_update_%s` SET `update_date`=now(), `file`='%s', `user_id`='%s', `type`='4'", db_name, db_name, f.getName().toString(), user_sid));
			//MyDBUtil.execute(String.format("DELETE FROM `%s`.`tb_consolidation`;", db_name));
			int sid = MyDBUtil.getInstance().getInt(String.format("SELECT MAX(sid) AS sid FROM `%s`.`tb_consolidation_update_%s` ORDER BY `sid` DESC;", db_name, db_name ), "sid");
			int i=0;
			try {
				for (Row row : sheet) {
					session.setAttribute("wrp_admin_upload_consolidation_curr_row_num", row.getRowNum());
					if (isHeaderContained) {
						columnsMap = new HashMap<Integer, String>();
						for (Cell cell : row) {
							if((cell.getStringCellValue().toLowerCase().replaceAll("\n","_").replaceAll(" ", "_").replaceAll("__", "_")).replaceAll("__", "_").matches(".*door_code.*")){	upload+=1 ;}
							if(cell.getStringCellValue().equals("\n") || cell.getStringCellValue().equals("") || upload < 1) continue;
							strTmp = cell.getStringCellValue();
							strTmp = (strTmp.trim().toLowerCase().replaceAll("\n","_").replaceAll(" ", "_").replaceAll("__", "_")).replaceAll("__", "_");
							
							if(strTmp.indexOf("_") == 0) {
								strTmp = strTmp.substring(1);
							}
							if(strTmp.lastIndexOf("_") == strTmp.length()) {
								strTmp = strTmp.substring(0, strTmp.length()-1);
							}
							if (strTmp != null && upload > 0) {
								columnsMap.put(cell.getColumnIndex(), strTmp);
								isHeaderContained = false;
							}
						}
						
					} else {
						query.append(String.format("INSERT INTO `%s`.`tb_reconsolidation_spiff` SET", db_name));
						for (Cell cell : row) {
							if (columnsMap.get(cell.getColumnIndex()) != null) {
								strTmp = cell.toString();
								
								if (strTmp != null) {
									switch (cell.getCellType()) {
									case 0:
										try {
											strArrTmp = strTmp.split("-");
											if (strArrTmp.length == 3) {	
												strTmp = sdf.format(cell.getDateCellValue());												
												query.append(String.format(" `%s`='%s',", columnsMap.get(cell.getColumnIndex()), strTmp));
												if(date_count == 1){	query.append(String.format(" `date_division`='%s',", sdf2.format(cell.getDateCellValue())));	++date_count;}
											} else {	
												query.append(String.format(" `%s`='%s',", columnsMap.get(cell.getColumnIndex()), strTmp));
											}
										} catch (Exception e2) {
											strTmp = cell.toString();	
											query.append(String.format(" `%s`='%s',", columnsMap.get(cell.getColumnIndex()), strTmp));																														
										}
										break;
									default:
										query.append(String.format(" `%s`='%s',", columnsMap.get(cell.getColumnIndex()), strTmp));				
										break;
									}
								}
							}
						}
						query.append(String.format("`update_sid`=%d;", sid));
						date_count = 1;
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
				
				query.append(String.format("DELETE FROM `%s`.`tb_reconsolidation_spiff` WHERE `update_sid` = %d AND `date_division` BETWEEN %s AND %s;", db_name, sid, min_date, max_date));
				query.append(String.format("DELETE FROM `%s`.`tb_reconsolidation_spiff` WHERE `door_name` IS NULL OR `door_name` = '' OR `door_code` LIKE '%Door Name';", db_name));
			} catch (Exception e) {
				e.printStackTrace();
			}
			if (count > 0) {
				if (MyDBUtil.getInstance().execute(query.toString()) == 0) {
					count = 0;
				} else {
					out.print(-3);
				}
			}
			
			session.setAttribute("wrp_admin_upload_consolidation_curr_row_num", sheet.getLastRowNum());
			mWorkbook.close();
		} catch (Exception e) {			
            if (e.getMessage() != null && e.getMessage().length() > 0) {
		    	e.printStackTrace();
            }
		}
		
		strTmp = null;
		query = null;
%>