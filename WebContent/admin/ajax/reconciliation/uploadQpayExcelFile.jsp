<%@page import="java.util.Date"%>
<%@ page language="java" contentType="text/plain; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="java.util.*"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="com.boas.wrp.util.MyDBUtil"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="org.json.simple.parser.*"%>
<%@ page import="java.io.*"%>
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
	String[] strArrTmp = null;
	int count = 0;
	int lineCnt = 0;
	int row = 0, i;
	try {
		if (db_name == null) {
			throw new Exception();
		}
		String realPath = String.format("%s/uploads/%s", application.getRealPath("/"), user_id.toLowerCase());
		int maxSize = 1024 * 1024 * 30; // 30 MB
		int date_count = 1;
		File f = new File(realPath);

		String line = "";
		
		float[][] indat = new float[3000][12];

		if (!f.isFile()) {
			if (!f.isDirectory()) {
				f.mkdir();
			}
		}
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
		SimpleDateFormat sdf2 = new SimpleDateFormat("yyyy-MM-dd");

		MultipartRequest mRequest = new MultipartRequest(request, realPath, maxSize, "UTF-8");
		f = mRequest.getFile("uploadExcelFile");
		BufferedReader br = new BufferedReader(new FileReader(f));
		BufferedReader br1 = new BufferedReader(new FileReader(f));
		File newFile = null;

		if (f.getName().lastIndexOf(".") > -1)
			newFile = new File(String.format("%s/%s_%s%s", f.getParent(), f.getName(),
					sdf.format(Calendar.getInstance().getTime()),
					f.getName().substring(f.getName().lastIndexOf("."))));
		else
			newFile = new File(String.format("%s/%s_%s", f.getParent(), f.getName(),
					sdf.format(Calendar.getInstance().getTime())));

		f.renameTo(newFile);

		if (!newFile.getName().endsWith(".csv")) {
			out.print(-1);
			throw new Exception();
		}

		//MyDBUtil.execute(String.format("INSERT INTO `%s`.`tb_reconciliation_update_%s` SET `update_date`=now(), `file`='%s', `user_id`='%s', `type`='6'",db_name, db_name, f.getName().toString(), user_sid));
		int sid = MyDBUtil.getInstance().getInt(String.format(
				"SELECT MAX(sid) AS sid FROM `%s`.`tb_reconciliation_update_%s` ORDER BY `sid` DESC;", db_name,
				db_name), "sid");

		String[] columns = { "branch_id", "provider","product", "type", "date/time","account_#","confirmation_id","payment","ld","dealer_fee","total","user","cancellation_reason"  
				     };

		
		while(br1.readLine() != null) {
			String[] token1 = line.split(",", -1);
			if (token1[0].contains(",,,,,,,,,,,,") || token1[0].contains("Branch ID") || token1[0] == null || token1[0] == "" || token1[0].isEmpty()) {
				continue;
			}
			lineCnt++; 
		}
		session.setAttribute("wrp_admin_upload_reconciliation_last_row_num", lineCnt);

		while ((line = br.readLine()) != null) {
			// -1 옵션은 마지막 "," 이후 빈 공백도 읽기 위한 옵션
			String[] token = line.split(",", -1);
			if (token[0].contains(",,,,,,,,,,,,") || token[0].contains("Branch ID") || token[0] == null || token[0] == "" || token[0].isEmpty())
				continue;
			query.append(String.format("INSERT INTO `%s`.`tb_reconciliation_qpay` SET", db_name));
			session.setAttribute("wrp_admin_upload_reconciliation_curr_row_num", row);
			for (i = 0; i < 13; i++) {
				if(i ==4 ) {
					strArrTmp = token[i].split(" ");
					strArrTmp = strArrTmp[0].split("/");
					token[i] = strArrTmp[2]+"-"+strArrTmp[0]+"-"+strArrTmp[1];
					query.append(String.format(" `%s`=STR_TO_DATE('%s', '%%Y-%%m-%%d'),", columns[i], token[i]));
				}
				else		query.append(String.format(" `%s`='%s',", columns[i], token[i]));
			}
			query.append(String.format("`update_sid`=%d;", -1));
			//indat[row][i] = Float.parseFloat(token[i]); 
			// CSV에서 읽어 배열에 옮긴 자료 확인하기 위한 출력
			row++;
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
		session.setAttribute("wrp_admin_upload_reconciliation_curr_row_num", row);	
		//MyDBUtil.execute(query.toString());
		// Excel File Open & Read
		/*
		mWorkbook = WorkbookFactory.create(newFile);
		if (mWorkbook.getNumberOfSheets() < 1) {
			out.print(-2);
			throw new Exception();
		}
		sheet = mWorkbook.getSheetAt(0);
		*/

		/* 
		session.setAttribute("wrp_admin_upload_reconciliation_last_row_num", sheet.getLastRowNum());
		MyDBUtil.execute(String.format("INSERT INTO `%s`.`tb_reconciliation_update_%s` SET `update_date`=now(), `file`='%s', `user_id`='%s', `type`='5'", db_name, db_name, f.getName().toString(), user_sid));
		int sid = MyDBUtil.getInt(String.format("SELECT MAX(sid) AS sid FROM `%s`.`tb_reconciliation_update_%s` ORDER BY `sid` DESC;", db_name, db_name ), "sid");
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
						query.append(String.format("`update_sid`=%d;", sid));
					}
				}
				count++;
				if (count > 999) {
					if (MyDBUtil.execute(query.toString()) == 0) {
		
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
		}*/
		//MyDBUtil.execute(query.toString());
		//session.setAttribute("wrp_admin_upload_reconciliation_curr_row_num", sheet.getLastRowNum());
		//mWorkbook.close();
		br.close();
		br1.close();
	} catch (Exception e) {
		if (e.getMessage() != null && e.getMessage().length() > 0) {
			e.printStackTrace();
		}
	}
	MyDBUtil.getInstance().execute(query.toString());
	strTmp = null;
	query = null;
%>