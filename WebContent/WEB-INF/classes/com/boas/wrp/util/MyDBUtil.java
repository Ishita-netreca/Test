package com.boas.wrp.util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.Statement;
import java.sql.Types;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

public class MyDBUtil {
	
	// getJSON
	// 설명 : 쿼리 실행 후 로드 된 데이터를 JSONObject 형태로 반환
	// 파라미터 : 
	// Connection conn : JDBC Connection 객체
	// String query : 입력할 쿼리문
	// 반환 :
	// JSONObject 객체 또는 null(쿼리문 오류 또는 Connection 객체나 쿼리가 입력되지 않은 경우)
	public static JSONObject getJSON(Connection conn, String query) {
		JSONObject returnObj = null, newObj = null;
		
		JSONArray dataset = null;
		
		Statement stmt = null;
		ResultSet rs = null;
		ResultSetMetaData rsmd = null;
		
		int colCnt = 0, i = 0, colType = 0;
		String colName = null;
		
		try {
			if (conn == null || query == null || query.length() < 1) {
				try {
					if (conn != null && !conn.isClosed()) {
						conn.close();
						conn = null;
					}
				} catch (Exception e) {
					
				}
				return null;
			}
			
			stmt = conn.createStatement();
			rs = stmt.executeQuery(query);		
			
			if (rs != null) {
				returnObj = new JSONObject();
				dataset = new JSONArray();
				
				rsmd = rs.getMetaData();
				colCnt = rsmd.getColumnCount();
				
				while(rs.next()) {
					newObj = new JSONObject();
					for (i = 1; i <= colCnt; i++) {
						try {
							colType = rsmd.getColumnType(i); // sql에서는 참조 인덱스를 1부터 시작
							colName = rsmd.getColumnLabel(i).replace(".", "_");
							switch (colType) {
							case Types.CHAR:
							case Types.VARCHAR:
								if (rs.getString(colName) != null) {
									newObj.put(colName, rs.getString(colName));
								}
								break;
							case Types.BIGINT:
							case Types.INTEGER:
							case Types.SMALLINT:
							case Types.TINYINT:
							case Types.BIT:
								newObj.put(colName, rs.getInt(colName));
								break;
							case Types.DOUBLE:
							case Types.FLOAT:
							case Types.NUMERIC:
							case Types.DECIMAL:
							case Types.REAL:
								newObj.put(colName, rs.getDouble(colName));
								break;
							default:
								if (rs.getString(colName) != null) {
									newObj.put(colName, rs.getString(colName));
								}
								break;
							}
						} catch (Exception e) {
							e.printStackTrace();
						}
					}
					dataset.add(newObj);
				}
				
				if (dataset.size() == 1) {
					returnObj.put("data", dataset.get(0));
				} else {
					returnObj.put("data", dataset);					
				}
			}			
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		} finally {
			try {
				if (rs != null && !rs.isClosed()) {
					rs.close();
					rs = null;
				}
			} catch (Exception e) {
				
			}
			try {
				if (stmt != null && !stmt.isClosed()) {
					stmt.close();
					stmt = null;
				}
			} catch (Exception e) {
				
			}
			try {
				if (conn != null && !conn.isClosed()) {
					conn.close();
					conn = null;
				}
			} catch (Exception e) {
				
			}
		}
		
		return returnObj;
	}
	
	// getJSONString
	// 설명 : 쿼리 실행 후 로드 된 데이터를 JSON Format의 문자열로 반환
	// 파라미터 : 
	// Connection conn : JDBC Connection 객체
	// String query : 입력할 쿼리문
	// 반환 :
	// JSON Format의 문자열 또는 null(쿼리문 오류 또는 Connection 객체나 쿼리가 입력되지 않은 경우)
	public static String getJSONString(Connection conn, String query) {
		JSONObject obj = getJSON(conn, query);
		if (obj != null) {
			return obj.toString();
		} else {
			return null;
		}
	}
	
	// getJSONString
	// 설명 : 쿼리 실행 후 로드 된 데이터를 JSON Format의 문자열로 반환
	// 파라미터 : 
	// Connection conn : JDBC Connection 객체
	// StringBuffer query : 입력할 쿼리문의 StringBuffer 객체
	// 반환 :
	// JSON Format의 문자열 또는 null(쿼리문 오류 또는 Connection 객체나 쿼리가 입력되지 않은 경우)
	public static String getJSONString(Connection conn, StringBuffer query) {
		JSONObject obj = getJSON(conn, query.toString());
		if (obj != null) {
			return obj.toString();
		} else {
			return null;
		}
	}
	
	// getInt
	// 설명 : 쿼리 실행 후 마지막에 로드 된 데이터들 중 특정 정수형 Column의 데이터를 반환
	// 파라미터 : 
	// Connection conn : JDBC Connection 객체
	// String query : 입력할 쿼리문
	// String columnName : Column 명
	// 반환 :
	// Integer 데이터 또는 오류 발생시 0으로 반환
	public static int getInt(Connection conn, String query, String columnName) {
		int result = 0;
		
		Statement stmt = null;
		ResultSet rs = null;
		
		try {			
			if (conn == null || query == null || query.length() < 1) {
				try {
					if (conn != null && !conn.isClosed()) {
						conn.close();
						conn = null;
					}
				} catch (Exception e) {
					
				}
				return 0;
			}
			
			stmt = conn.createStatement();
			
			boolean hasMoreResultSets = stmt.execute(query);

			while(hasMoreResultSets || stmt.getUpdateCount() != -1 ) {
			    if ( hasMoreResultSets ) {
	                rs = stmt.getResultSet();
	                if (rs.next()) {
	                    result = rs.getInt(columnName);
	                }
	                try {
	                    if (rs != null && !rs.isClosed()) {
	                        rs.close();
	                    }
	                } catch (Exception e2) {

	                }
	            } else {
	                  if (stmt.getUpdateCount() == -1) break;
	            }
	            hasMoreResultSets = stmt.getMoreResults();
			}

	        try {
	            if (stmt != null && !stmt.isClosed()) {
	                stmt.close();
	            }
	        } catch (Exception e2) {

	        }

	        try {
	            if (conn != null && !conn.isClosed()) {
	            	conn.close();
	            }
	        } catch (Exception e2) {

	        }
		} catch (Exception e) {
			e.printStackTrace();
			
            try {
                if (rs != null && !rs.isClosed()) {
                    rs.close();
                }
            } catch (Exception e2) {

            }

	        try {
	            if (stmt != null && !stmt.isClosed()) {
	                stmt.close();
	            }
	        } catch (Exception e2) {

	        }

	        try {
	            if (conn != null && !conn.isClosed()) {
	            	conn.close();
	            }
	        } catch (Exception e2) {

	        }
		}
		
		return result;
	}
	
	// getFloat
	// 설명 : 쿼리 실행 후 마지막에 로드 된 데이터들 중 특정 실수형 Column의 데이터를 반환
	// 파라미터 : 
	// Connection conn : JDBC Connection 객체
	// String query : 입력할 쿼리문
	// String columnName : Column 명
	// 반환 :
	// Float 데이터 또는 오류 발생시 0으로 반환
	public static float getFloat(Connection conn, String query, String columnName) {
		float result = 0;
		
		Statement stmt = null;
		ResultSet rs = null;
		
		try {			
			if (conn == null || query == null || query.length() < 1) {
				try {
					if (conn != null && !conn.isClosed()) {
						conn.close();
						conn = null;
					}
				} catch (Exception e) {
					
				}
				return 0;
			}
			
			stmt = conn.createStatement();
			
			boolean hasMoreResultSets = stmt.execute(query);

			while(hasMoreResultSets || stmt.getUpdateCount() != -1 ) {
			    if ( hasMoreResultSets ) {
	                rs = stmt.getResultSet();
	                if (rs.next()) {
	                    result = rs.getFloat(columnName);
	                }
	                try {
	                    if (rs != null && !rs.isClosed()) {
	                        rs.close();
	                    }
	                } catch (Exception e2) {

	                }
	            } else {
	                  if (stmt.getUpdateCount() == -1) break;
	            }
	            hasMoreResultSets = stmt.getMoreResults();
			}

	        try {
	            if (stmt != null && !stmt.isClosed()) {
	                stmt.close();
	            }
	        } catch (Exception e2) {

	        }

	        try {
	            if (conn != null && !conn.isClosed()) {
	            	conn.close();
	            }
	        } catch (Exception e2) {

	        }
		} catch (Exception e) {
			e.printStackTrace();
			
            try {
                if (rs != null && !rs.isClosed()) {
                    rs.close();
                }
            } catch (Exception e2) {

            }

	        try {
	            if (stmt != null && !stmt.isClosed()) {
	                stmt.close();
	            }
	        } catch (Exception e2) {

	        }

	        try {
	            if (conn != null && !conn.isClosed()) {
	            	conn.close();
	            }
	        } catch (Exception e2) {

	        }
		}
		
		return result;
	}
	
	// getDouble
	// 설명 : 쿼리 실행 후 마지막에 로드 된 데이터들 중 특정 실수형 Column의 데이터를 반환
	// 파라미터 : 
	// Connection conn : JDBC Connection 객체
	// String query : 입력할 쿼리문
	// String columnName : Column 명
	// 반환 :
	// Double 데이터 또는 오류 발생시 0으로 반환
	public static double getDouble(Connection conn, String query, String columnName) {
		double result = 0;
		
		Statement stmt = null;
		ResultSet rs = null;
		
		try {			
			if (conn == null || query == null || query.length() < 1) {
				try {
					if (conn != null && !conn.isClosed()) {
						conn.close();
						conn = null;
					}
				} catch (Exception e) {
					
				}
				return 0;
			}
			
			stmt = conn.createStatement();
			
			boolean hasMoreResultSets = stmt.execute(query);

			while(hasMoreResultSets || stmt.getUpdateCount() != -1 ) {
			    if ( hasMoreResultSets ) {
	                rs = stmt.getResultSet();
	                if (rs.next()) {
	                    result = rs.getDouble(columnName);
	                }
	                try {
	                    if (rs != null && !rs.isClosed()) {
	                        rs.close();
	                    }
	                } catch (Exception e2) {

	                }
	            } else {
	                  if (stmt.getUpdateCount() == -1) break;
	            }
	            hasMoreResultSets = stmt.getMoreResults();
			}

	        try {
	            if (stmt != null && !stmt.isClosed()) {
	                stmt.close();
	            }
	        } catch (Exception e2) {

	        }

	        try {
	            if (conn != null && !conn.isClosed()) {
	            	conn.close();
	            }
	        } catch (Exception e2) {

	        }
		} catch (Exception e) {
			e.printStackTrace();
			
            try {
                if (rs != null && !rs.isClosed()) {
                    rs.close();
                }
            } catch (Exception e2) {

            }

	        try {
	            if (stmt != null && !stmt.isClosed()) {
	                stmt.close();
	            }
	        } catch (Exception e2) {

	        }

	        try {
	            if (conn != null && !conn.isClosed()) {
	            	conn.close();
	            }
	        } catch (Exception e2) {

	        }
		}
		
		return result;
	}
	
	// getString
	// 설명 : 쿼리 실행 후 마지막에 로드 된 데이터들 중 특정 String Column의 데이터를 반환
	// 파라미터 : 
	// Connection conn : JDBC Connection 객체
	// String query : 입력할 쿼리문
	// String columnName : Column 명
	// 반환 :
	// String 데이터 또는 오류 발생시 null로 반환
	public static String getString(Connection conn, String query, String columnName) {
		String result = null;
		
		Statement stmt = null;
		ResultSet rs = null;
		
		try {			
			if (conn == null || query == null || query.length() < 1) {
				try {
					if (conn != null && !conn.isClosed()) {
						conn.close();
						conn = null;
					}
				} catch (Exception e) {
					
				}
				return null;
			}
			
			stmt = conn.createStatement();
			
			boolean hasMoreResultSets = stmt.execute(query);

			while(hasMoreResultSets || stmt.getUpdateCount() != -1 ) {
			    if ( hasMoreResultSets ) {
	                rs = stmt.getResultSet();
	                if (rs.next()) {
	                    result = rs.getString(columnName);
	                }
	                try {
	                    if (rs != null && !rs.isClosed()) {
	                        rs.close();
	                    }
	                } catch (Exception e2) {

	                }
	            } else {
	                  if (stmt.getUpdateCount() == -1) break;
	            }
	            hasMoreResultSets = stmt.getMoreResults();
			}

	        try {
	            if (stmt != null && !stmt.isClosed()) {
	                stmt.close();
	            }
	        } catch (Exception e2) {

	        }

	        try {
	            if (conn != null && !conn.isClosed()) {
	            	conn.close();
	            }
	        } catch (Exception e2) {

	        }
		} catch (Exception e) {
			e.printStackTrace();
			
            try {
                if (rs != null && !rs.isClosed()) {
                    rs.close();
                }
            } catch (Exception e2) {

            }

	        try {
	            if (stmt != null && !stmt.isClosed()) {
	                stmt.close();
	            }
	        } catch (Exception e2) {

	        }

	        try {
	            if (conn != null && !conn.isClosed()) {
	            	conn.close();
	            }
	        } catch (Exception e2) {

	        }
		}
		
		return result;
	}
	
	// execute
	// 설명 : 쿼리 실행 후 쿼리 성공 여부 또는 conn이나 쿼리 입력 여부에 따라 반환되는 정수형 데이터가 다름
	// 파라미터 : 
	// Connection conn : JDBC Connection 객체
	// String query : 입력할 쿼리문
	// 반환 :
	// 0: 성공
	// -1: Connection 객체 또는 쿼리가 없음
	// -2: 쿼리 문법 또는 그 외의 에러 (Column이 없는 경우 또는 테이블이 없는 경우 등)
	public static int execute(Connection conn, String query) {		
		Statement stmt = null;
		
		try {
			if (conn == null || query == null || query.length() < 1) {
				try {
					if (conn != null && !conn.isClosed()) {
						conn.close();
						conn = null;
					}
				} catch (Exception e) {
					
				}
				return -1;
			}
			
			stmt = conn.createStatement();
			
			stmt.execute(query);
			
			try {
				if (stmt != null && !stmt.isClosed()) {
					stmt.close();
					stmt = null;
				}
			} catch (Exception e) {
				
			}
			try {
				if (conn != null && !conn.isClosed()) {
					conn.close();
					conn = null;
				}
			} catch (Exception e) {
				
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			try {
				if (stmt != null && !stmt.isClosed()) {
					stmt.close();
					stmt = null;
				}
			} catch (Exception e2) {
				
			}
			try {
				if (conn != null && !conn.isClosed()) {
					conn.close();
					conn = null;
				}
			} catch (Exception e2) {
				
			}
			return -2;
		}
		
		return 0;
	}
}
