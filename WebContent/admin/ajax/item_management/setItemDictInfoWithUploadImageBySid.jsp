<%@ page language="java" contentType="text/plain; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.io.*"%>
<%@ page import="com.oreilly.servlet.MultipartRequest"%>
<%@ page import="java.text.SimpleDateFormat"%>
<%@ page import="java.util.Calendar"%>
<%@ page import="com.boas.posone.util.MyRequestUtil"%>
<%@ page import="com.boas.wrp.util.MyDBUtil"%>
<%@ page import="com.boas.wrp.util.PreparedStatementParams"%>
<%@ page import="org.json.simple.*"%>
<%@ page import="org.json.simple.parser.*"%>
<%@ include file="../common.jsp" %>
<%
    // 16.10.19
    // Item 수정시 기존에 업로드 된 Item 이미지 파일을 지우는 작업이 필요함.
    String hiddenItemDictData = null;
	JSONObject inputItemDict = null;
	
	String imagePath = null;
	
	StringBuffer query = new StringBuffer();
	
	String table_description = null;
	String store_list_str = null;
	String [] store_list = null;
	
	int sid = 0;
	
	PreparedStatementParams mPreparedStatementParams = null;
	
	try {
	    if ((!master_user_flag && !subdealer_user_flag) || user_sid == null || db_name == null ) {
	    	out.print(-1);
	        throw new Exception();
	    }
		String realPath = String.format("%s/../wrp_uploads/%s", application.getRealPath("/"), user_id.toLowerCase());
		int maxSize = 1024 * 1024 * 10; // 10 MB
		File f = new File (realPath);
		if (!f.isFile()) {
			if (!f.isDirectory()) {
				f.mkdirs();
			}
		}
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");

		MultipartRequest mRequest = new MultipartRequest(request, realPath, maxSize, "UTF-8");
		f = mRequest.getFile("itemImageFile");
		hiddenItemDictData = mRequest.getParameter("hiddenItemDictData");
		File newFile = null;
		if (f.getName().lastIndexOf(".") > -1) newFile = new File(String.format("%s/%s%s",f.getParent(), sdf.format(Calendar.getInstance().getTime()), f.getName().substring(f.getName().lastIndexOf("."))));
		else  newFile = new File(String.format("%s/%s",f.getParent(), sdf.format(Calendar.getInstance().getTime())));
		f.renameTo(newFile);
		imagePath = newFile.getAbsolutePath().replace(application.getRealPath("/"), "").replaceAll("\\\\","/");
		if (imagePath.indexOf("..") == 0) {
			imagePath = imagePath.replace("..","");
		}
		
		if (hiddenItemDictData != null) {
			inputItemDict = (JSONObject)new JSONParser().parse(hiddenItemDictData);
			if (inputItemDict == null || inputItemDict.get("sid") == null || inputItemDict.get("item_code") == null || inputItemDict.get("item_type") == null) {
				out.print(-2);
				throw new Exception();
			}
			
			sid = Integer.parseInt(inputItemDict.get("sid").toString());
			
			if (master_user_flag) {
				table_description = String.format("`%s`.`tb_item_dict_%s`", db_name, db_name);
			} else if (subdealer_user_flag) {
				table_description = String.format("`%s`.`tb_item_dict_%s`", db_name, owner_id);
			}
			
			// 파라미터 입력
			mPreparedStatementParams = new PreparedStatementParams();
			if (sid > 0) {
				query.append(String.format("SELECT COUNT(`sid`) AS `count` FROM %s WHERE (`sid`=? AND (`item_code` != ?)) AND `item_code`=?", table_description));
				mPreparedStatementParams.set(sid);
				mPreparedStatementParams.set(inputItemDict.get("item_code").toString());
				mPreparedStatementParams.set(inputItemDict.get("item_code").toString());
			} else {
				query.append(String.format("SELECT COUNT(`sid`) AS `count` FROM %s WHERE `item_code`=?", table_description));
				mPreparedStatementParams.set(inputItemDict.get("item_code").toString());
			}
			

			
			if (MyDBUtil.getInstance().getInt(db_name, owner_id, null, query.toString(), mPreparedStatementParams, "count") > 0) {
				out.print(1);
				throw new Exception();
			}
			
			if (query.length() > 0) query.delete(0, query.length());
			
			if (sid > 0) {
				query.append(String.format("UPDATE %s SET", table_description));			
			} else {
				query.append(String.format("INSERT INTO %s SET", table_description));
			}
			
			query.append(String.format("`item_type`=?, `update_date`=NOW(), `updater`=?, `item_code`=?"));
			mPreparedStatementParams.set(inputItemDict.get("item_type").toString());
			mPreparedStatementParams.set(user_sid);
			mPreparedStatementParams.set(inputItemDict.get("item_code").toString());
			
			if (sid == 0) {
				if (master_user_flag) {
					query.append(String.format(" ,`sid`=(SELECT `insert`.`sid` FROM (SELECT IF(MAX(`sid`) > 100000, MAX(`sid`)+1, 100001 ) AS `sid` FROM %s) AS `insert`)", table_description));
				} else if (subdealer_user_flag) {
					query.append(String.format(" ,`sid`=(SELECT `insert`.`sid` FROM (SELECT IF(MAX(`sid`) > 300000, MAX(`sid`)+1, 300001 ) AS `sid` FROM %s) AS `insert`)", table_description));				
				} else {
					query.append(String.format(" ,`sid`=(SELECT `insert`.`sid` FROM (SELECT IF(MAX(`sid`) > 300000, MAX(`sid`)+1, 300001 ) AS `sid` FROM %s) AS `insert`)", table_description));
				}
			}
			
			if (inputItemDict.get("model") != null) {
				query.append(String.format(" ,`model`=?"));
				mPreparedStatementParams.set(inputItemDict.get("model").toString());
			}
			
			if (inputItemDict.get("description") != null) {
				query.append(String.format(" ,`description`=?"));
				mPreparedStatementParams.set(inputItemDict.get("description").toString());
			}
			
			if (inputItemDict.get("distributor") != null) {
				query.append(String.format(" ,`distributor`=?"));
				mPreparedStatementParams.set(inputItemDict.get("distributor").toString());
			}
			
			if (inputItemDict.get("category") != null && inputItemDict.get("category").toString().length() > 0) {
				try {
					query.append(String.format(" ,`category`=%d", Integer.parseInt(inputItemDict.get("category").toString())));
				} catch (Exception e) {
					
				}
			}
			
			if (inputItemDict.get("sub_category") != null && inputItemDict.get("sub_category").toString().length() > 0) {
				try {
					query.append(String.format(" ,`sub_category`=%d", Integer.parseInt(inputItemDict.get("sub_category").toString())));
				} catch (Exception e) {
					
				}
			}
			
			if (inputItemDict.get("manufacturer") != null) {
				query.append(String.format(" ,`manufacturer`=?"));
				mPreparedStatementParams.set(inputItemDict.get("manufacturer").toString());
			}
			
			if (inputItemDict.get("color") != null) {
				query.append(String.format(" ,`color`=?"));
				mPreparedStatementParams.set(inputItemDict.get("color").toString());
			}
			
			if (inputItemDict.get("condition") != null) {
				query.append(String.format(" ,`condition`=?"));
				mPreparedStatementParams.set(inputItemDict.get("condition").toString());
			}
			
			if (inputItemDict.get("sku") != null) {
				query.append(String.format(" ,`sku`=?"));
				mPreparedStatementParams.set(inputItemDict.get("sku").toString());
			}
			
			if (inputItemDict.get("upc") != null) {
				query.append(String.format(" ,`upc`=?"));
				mPreparedStatementParams.set(inputItemDict.get("upc").toString());
			}
			
			if (sid == 0) {
				if (inputItemDict.get("item_cost") != null && inputItemDict.get("item_cost").toString().length() > 0) {
					query.append(String.format(" ,`item_cost`=?"));
					mPreparedStatementParams.set(inputItemDict.get("item_cost").toString());
				}
				
				if (inputItemDict.get("retail_price") != null && inputItemDict.get("retail_price").toString().length() > 0) {
					query.append(String.format(" ,`retail_price`=?"));
					mPreparedStatementParams.set(inputItemDict.get("retail_price").toString());
				}
				
				if (inputItemDict.get("wholesale_price") != null && inputItemDict.get("wholesale_price").toString().length() > 0) {
					query.append(String.format(" ,`wholesale_price`=?"));
					mPreparedStatementParams.set(inputItemDict.get("wholesale_price").toString());
				}		
			}
			
			if (imagePath != null) {
				query.append(String.format(" ,`image`=?"));
				mPreparedStatementParams.set(imagePath);
			}		
			
			
			if (sid > 0) {
				query.append(String.format(" WHERE `sid`=?;"));
				mPreparedStatementParams.set(sid);
			} else {
				query.append(String.format(";"));
			}
			
			if (subdealer_user_flag) {
				store_list_str = MyDBUtil.getInstance().getString(String.format("SELECT GROUP_CONCAT(`store_id` SEPARATOR '|') AS `store_list_str` FROM `wrp`.`tb_stores` WHERE `owner_sid`='%s' AND `store_id` IN (SELECT `store_id` FROM `%s`.`tb_stores`)", user_sid, db_name), "store_list_str");
				if (store_list_str != null && store_list_str.length() > 0) {
					store_list = store_list_str.split("\\|");				
					if (sid > 0) {
						for (int i = 0; i < store_list.length; i++) {
							/*
							query.append(String.format("DELETE FROM `%s`.`tb_item_dict_%s` WHERE `sid`=%d;", db_name, store_list[i], sid));
							query.append(String.format("INSERT INTO `%s`.`tb_item_dict_%s` ( SELECT * FROM `%s`.`tb_item_dict_%s` WHERE `sid`=%d);", db_name, store_list[i], db_name, owner_id, sid));		
							*/
							
							query.append(String.format("UPDATE `%s`.`tb_item_dict_%s` SET", db_name, store_list[i]));			
							
							
							query.append(String.format("`item_type`=?, `update_date`=NOW(), `updater`=?, `item_code`=?"));
							mPreparedStatementParams.set(inputItemDict.get("item_type").toString());
							mPreparedStatementParams.set(user_sid);
							mPreparedStatementParams.set(inputItemDict.get("item_code").toString());
							
							if (inputItemDict.get("model") != null) {
								query.append(String.format(" ,`model`=?"));
								mPreparedStatementParams.set(inputItemDict.get("model").toString());
							}
							
							if (inputItemDict.get("description") != null) {
								query.append(String.format(" ,`description`=?"));
								mPreparedStatementParams.set(inputItemDict.get("description").toString());
							}
							
							if (inputItemDict.get("distributor") != null) {
								query.append(String.format(" ,`distributor`=?"));
								mPreparedStatementParams.set(inputItemDict.get("distributor").toString());
							}
							
							if (inputItemDict.get("category") != null && inputItemDict.get("category").toString().length() > 0) {
								try {
									query.append(String.format(" ,`category`=%d", Integer.parseInt(inputItemDict.get("category").toString())));
								} catch (Exception e) {
									
								}
							}
							
							if (inputItemDict.get("sub_category") != null && inputItemDict.get("sub_category").toString().length() > 0) {
								try {
									query.append(String.format(" ,`sub_category`=%d", Integer.parseInt(inputItemDict.get("sub_category").toString())));
								} catch (Exception e) {
									
								}
							}
							
							if (inputItemDict.get("manufacturer") != null) {
								query.append(String.format(" ,`manufacturer`=?"));
								mPreparedStatementParams.set(inputItemDict.get("manufacturer").toString());
							}
							
							if (inputItemDict.get("color") != null) {
								query.append(String.format(" ,`color`=?"));
								mPreparedStatementParams.set(inputItemDict.get("color").toString());
							}
							
							if (inputItemDict.get("condition") != null) {
								query.append(String.format(" ,`condition`=?"));
								mPreparedStatementParams.set(inputItemDict.get("condition").toString());
							}
							
							if (inputItemDict.get("sku") != null) {
								query.append(String.format(" ,`sku`=?"));
								mPreparedStatementParams.set(inputItemDict.get("sku").toString());
							}
							
							if (inputItemDict.get("upc") != null) {
								query.append(String.format(" ,`upc`=?"));
								mPreparedStatementParams.set(inputItemDict.get("upc").toString());
							}
							
							if (imagePath != null) {
								query.append(String.format(" ,`image`=?"));
								mPreparedStatementParams.set(imagePath);
							}									
							
							query.append(String.format(" WHERE `sid`=?;"));
							mPreparedStatementParams.set(sid);							
						}
					} else {
						for (int i = 0; i < store_list.length; i++) {
							query.append(String.format("DELETE FROM `%s`.`tb_item_dict_%s` WHERE `sid` IN (SELECT IF(MAX(`sid`) > 300000, MAX(`sid`), 300001 ) AS `sid` FROM `%s`.`tb_item_dict_%s`);", db_name, store_list[i], db_name, owner_id));
							query.append(String.format("INSERT INTO `%s`.`tb_item_dict_%s` ( SELECT * FROM `%s`.`tb_item_dict_%s` WHERE `sid` IN (SELECT IF(MAX(`sid`) > 300000, MAX(`sid`), 300001 ) AS `sid` FROM `%s`.`tb_item_dict_%s`) );", db_name, store_list[i], db_name, owner_id, db_name, owner_id));						
						}
					}
				}
			}

			// 리스트일 경우 두번째 파라미터를 true로, 단일 객체 (한개의 데이터를 조회하는 경우)일 경우 false 입력
	        out.print(MyDBUtil.getInstance().execute(db_name, owner_id, null, query.toString(), mPreparedStatementParams));
			
		} else {
			out.print(-2);
		}
	} catch (Exception e) {
		e.printStackTrace();
	}
	
	query = null;
%>