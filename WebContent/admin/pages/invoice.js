var _pagescript = {
    _selectedInvoiceData: undefined,
    _selectedStoreId: undefined,
    init: function() {
    	try {
			WRPComponents('div[pagename="invoice"] > .page-submenu-container > .submenu[panelname="invoice_list"]').addShadowedImage('img/icon/invoice.png');
		} catch (e) {
			
		}
        WRPAdminApp.pagescript.getInvoiceList();
        WRPAdminApp.pagescript.getCustomerList();
        
        var date = new Date();

        try {
            document.getElementById("invoice-search-date-end").value = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
        } catch (e) {
            console.warn(e);
            return;
        }
        date.setDate(date.getDate() - 30);
        try {
            document.getElementById("invoice-search-date-start").value = WRPAdminApp.toDecimalFormat((date.getMonth() + 1), "00") + "/" + WRPAdminApp.toDecimalFormat(date.getDate(), "00") + "/" + date.getFullYear();
        } catch (e) {
            console.warn(e);
            return;
        }

    },
    getCustomerList: function() {
		var param = {}, i, len, elem;
		if (WRPAdminApp.pagescript._selectedStoreId === undefined) return;
		try {
			elem = document.getElementsByName("customerSearchType");
			for (i = 0, len = elem.length; i < len; i++) {
				if (elem.checked === true) {
					param.searchType = parseInt(elem.value);
					if (!isNaN(param.searchType)) {
						break;
					} else {
						param.searchType = 0;
					}
				}
			}
		} catch (e) {
			console.warn(e);
			return;
		}

		try {
			param.searchKeyword = document.getElementById("inner-invoice-customer-search-keyword").value;
			if (param.searchKeyword.length === 0) {
				param.searchKeyword = undefined;
				delete param.searchKeyword;
			}
		} catch (e) {
			console.warn(e);
			return;
		}
		
		param.storeId = WRPAdminApp.pagescript._selectedStoreId;

		$.ajax({
			url: "ajax/customer/getCustomerList.jsp",
			data: param,
			method: "POST",
			dataType: "json",
			success: function(result) {
				var data, customerList, i, len, obj, innerHTML, strBuffer;
				data = result.data;
				if (!data) return;

				customerList = document.getElementById("inner-invoice-customer-list");
				if (!customerList) return;

				innerHTML = [];

				for (i = 0, len = data.length;i < len; i++) {
					try {
						obj = data[i];
						innerHTML.push('<tr onclick="WRPAdminApp.closePopup(this);WRPAdminApp.pagescript.getInvoiceList(' + obj.sid + ');">');
						innerHTML.push('<td>');
						innerHTML.push((obj.customerId !== undefined && obj.customerId)? obj.customerId : "&nbsp;");
						innerHTML.push('</td>');
						innerHTML.push('<td>');
						strBuffer = [];
						if (obj.firstName) {
							strBuffer.push(obj.firstName);
						}
						if (obj.middleName) {
							strBuffer.push(' ');
							strBuffer.push(obj.middleName);
						}
						if (obj.lastName) {
							strBuffer.push(' ');
							strBuffer.push(obj.lastName);
						}
						innerHTML.push(strBuffer.join("").trim());
						strBuffer = undefined;
						innerHTML.push('</td>');
						innerHTML.push('<td>');
						strBuffer = [];
						if (obj.address2) {
							strBuffer.push(obj.address2);
						}
						if (obj.address1) {
							strBuffer.push(obj.address1);
						}
						if (obj.city) {
							strBuffer.push(obj.city);
						}
						if (obj.state) {
							strBuffer.push(obj.state);
						}
						if (obj.zipcode) {
							strBuffer.push(obj.zipcode);
						}
						innerHTML.push(strBuffer.join(" ").trim());
						strBuffer = undefined;
						innerHTML.push('</td>');
						innerHTML.push('<td>');
						innerHTML.push((obj.tel !== undefined && obj.tel)? obj.tel : "&nbsp;");
						innerHTML.push('</td>');
						innerHTML.push('<td>');
						innerHTML.push((obj.company !== undefined && obj.company)? obj.company : "&nbsp;");
						innerHTML.push('</td>');
						innerHTML.push('<td>');
						innerHTML.push((obj.joinDate !== undefined && obj.joinDate)? obj.joinDate : "&nbsp;");
						innerHTML.push('</td>');
						innerHTML.push('</tr>');
					} catch (e) {

					}
				}

				if (len < 11) {
					for (; len < 11; len++) {
						innerHTML.push('<tr class="blank"><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
					}
				}

				customerList.innerHTML = innerHTML.join("");
				innerHTML = undefined;

			}
		})
	},
    
    getInvoiceList: function() {
        var storeId, customer, serial, invoiceNo, elem, i;

        try {
            storeId = document.getElementById("select-store").value;
            if (storeId === undefined || storeId.length === 0 || storeId === "all") {
                return;
            }
        } catch (e) {
            console.log(e);
            return;
        }
        
        try {
        	customer = arguments[0];
           
        } catch (e) {
            console.warn(e);
            return;
        }
        
        elem=document.getElementsByName("SearchType");
        
        for (i = 0, len = elem.length; i < len; i++) {
        	if (elem[i].checked === true) {
				if(parseInt(elem[i].value)==1){
					invoiceNo = document.getElementById("invoice-search-keyword").value;
				}
				if(parseInt(elem[i].value)==2){
					serial = document.getElementById("invoice-search-keyword").value;
				}
        	}
		}
        
        
        WRPAdminApp.pagescript._selectedStoreId = storeId;

        $.ajax({
            url: "ajax/invoice/getInvoiceList.jsp",
            data: {
                storeId: storeId,
                customer: customer,
                searchPeriodStart: document.getElementById("invoice-search-date-start").value,
                searchPeriodEnd: document.getElementById("invoice-search-date-end").value,
                searchAmountStart: parseFloat(document.getElementById("invoice-amount-search-start").value),
                searchAmountEnd: parseFloat(document.getElementById("invoice-amount-search-end").value),
                invoiceNo: invoiceNo,
                serial: serial
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data, i, len, obj, invoiceList, innerHTML;
                data = result.data;
                if (!data) {
                    return;
                }



                invoiceList = document.getElementById("invoice-list");
                if (!invoiceList) return;

                innerHTML = [];

                for (i = 0, len = data.length ; i < len; i++) {
                    try {
                        obj = data[i];
                        innerHTML.push('<tr invoice_no="');
                        innerHTML.push(obj.invoice_no);
                        innerHTML.push('" onclick="WRPAdminApp.pagescript.getInvoiceInfo(' + obj.invoice_no + ');">');
                        innerHTML.push('<td>');
                        innerHTML.push(obj.invoice_no);
                        innerHTML.push('</td>');
                        innerHTML.push('<td>');
                        innerHTML.push(obj.user_id);
                        innerHTML.push('</td>');
                        innerHTML.push('<td>');
                        innerHTML.push((obj.customer_id !== undefined && obj.customer_id) ? obj.customer_id : "GUEST");
                        innerHTML.push('</td>');
                        innerHTML.push('<td>');
                        /* 170109 jh : timeZone */
                        innerHTML.push(WRPAdminApp.timeZone(obj.date));
                        /**/
                        innerHTML.push('</td>');
                        innerHTML.push('<td>');
                        innerHTML.push((obj.amount !== undefined && obj.amount) ? '$'+ obj.amount.toFixed(2) : "$0.00");
                        innerHTML.push('</td>');
                        innerHTML.push('<td>');
                        innerHTML.push((obj.tax !== undefined && obj.tax) ? '$'+ obj.tax.toFixed(2) : "");
                        innerHTML.push('</td>');
                        innerHTML.push('</tr>');
                    } catch (e) {

                    }
                }

                invoiceList.innerHTML = innerHTML.join("");
                innerHTML = undefined;
            }
        })
    },
    getInvoiceInfo: function() {
        if (arguments.length < 1) {
            console.warn("no input invoice no");
            return;
        }

        if (WRPAdminApp.pagescript._selectedStoreId === undefined) return;

        $.ajax({
            url: "ajax/invoice/getInvoiceInfo.jsp",
            data: {
                invoiceNo: arguments[0],
                storeId: WRPAdminApp.pagescript._selectedStoreId
            },
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data, invoiceItemList, i, len, obj, innerHTML, totalQty, totalMrc, invoiceTotal, totalTax, strBuffer;

                WRPAdminApp.pagescript._selectedInvoiceData = result;

                data = result.items;
                if (!data) return;


                invoiceItemList = document.getElementById("invoice-view-item-list");
                if (!invoiceItemList) return;

                innerHTML = [];

                totalQty = 0;
                totalMrc = 0;
                invoiceTotal = 0;
                totalTax = 0;

                for (i = 0, len = data.length; i < len; i++) {
                    try {
                        obj = data[i];
                        innerHTML.push('<tr>');
                        innerHTML.push('<td>');
                        innerHTML.push((obj.itemCode !== undefined && obj.itemCode)? obj.itemCode : ((obj.rateplanCode !== undefined && obj.rateplanCode)? obj.rateplanCode : "&nbsp;"));
                        innerHTML.push('</td>');
                        innerHTML.push('<td>');
                        innerHTML.push((obj.description !== undefined && obj.description)? obj.description : "&nbsp;");
                        innerHTML.push('</td>');
                        innerHTML.push('<td>');
                        innerHTML.push((obj.serialNo !== undefined && obj.serialNo)? obj.serialNo : "&nbsp;");
                        innerHTML.push('</td>');
                        innerHTML.push('<td>');
                        innerHTML.push((obj.qty !== undefined && obj.qty)? obj.qty : "0");
                        innerHTML.push('</td>');
                        innerHTML.push('<td>');
                        innerHTML.push((obj.amount !== undefined && obj.amount)? '$'+obj.amount.toFixed(2) : "0");
                        innerHTML.push('</td>');
                        innerHTML.push('<td>');
                        innerHTML.push((obj.taxRate !== undefined && obj.taxRate > 0 )? (obj.taxRate * 100).toFixed(2)+'%' : "&nbsp;");
                        innerHTML.push('</td>');
                        innerHTML.push('<td>');
                        innerHTML.push((obj.taxRate !== undefined && obj.taxRate > 0 && obj.amount !== undefined && obj.amount)? '$'+(obj.taxRate * obj.amount).toFixed(2) : "&nbsp;");
                        innerHTML.push('</td>');
                        innerHTML.push('<td>&nbsp;</td>');
                        innerHTML.push('<td>');
                        innerHTML.push((obj.subtotal !== undefined && obj.subtotal > 0)? '$'+obj.subtotal.toFixed(2) : "0");
                        innerHTML.push('</td>');
                        innerHTML.push('</tr>');

                        totalQty = totalQty + (obj.qty !== undefined && obj.qty)? obj.qty : 0;
                        if (obj.rateplanFlag === 1) {
                            totalMrc = totalMrc + ((obj.subtotal !== undefined && obj.subtotal > 0)? obj.subtotal : 0);
                        } else {
                            totalTax = totalTax + ((obj.taxRate !== undefined && obj.taxRate > 0 && obj.amount !== undefined && obj.amount)? (obj.taxRate * obj.amount) : 0);
                        }

                        invoiceTotal = invoiceTotal + ((obj.subtotal !== undefined && obj.subtotal > 0)? obj.subtotal : 0);
                    } catch (e) {
                        console.warn(e);
                    }
                }

                invoiceItemList.innerHTML = innerHTML.join("");
                innerHTML = undefined;

                /*try {
                    document.getElementById("invoice-view-note").innerHTML = (result.note !== undefined && result.note !== null)? result.note : '';
                } catch (e) {

                }

                try {
                    document.getElementById("invoice-view-total-mrc").innerHTML = "$"+totalMrc.toFixed(2);
                } catch (e) {

                }

                try {
                    document.getElementById("invoice-view-total-qty").innerHTML = totalQty;
                } catch (e) {

                }

                try {
                    document.getElementById("invoice-view-total-taxes").innerHTML = "$"+totalTax.toFixed(2);
                } catch (e) {

                }

                try {
                    document.getElementById("invoice-view-total-price").innerHTML = "$"+invoiceTotal.toFixed(2);
                } catch (e) {

                }*/
                data = result.checkout;
                if (!data) return;

                invoicePaymentsList = document.getElementById("invoice-payments-list");
                if (!invoicePaymentsList) return;

                innerHTML = [];
                var typeN;
                for (i = 0, len = data.length; i < len; i++) {
                    try {
                        obj = data[i];
                        if(obj.type==0){
                        	typeN="Cash";
                        }else if(obj.type==1){
                        	typeN="Credit card";
                        }else if(obj.type==2){
                        	typeN="Debit card";
                        }else if(obj.type==3){
                        	typeN="Loan";
                        }else if(obj.type==4){
                        	typeN="Check";
                        }else if(obj.type==5){
                        	typeN="Credit memo";
                        }
                        innerHTML.push('<tr>');
                        innerHTML.push('<td>');
                        innerHTML.push((typeN !== undefined && typeN)? typeN : "&nbsp;");
                        innerHTML.push('</td>');
                        innerHTML.push('<td>');
                        innerHTML.push((obj.amount !== undefined && obj.amount)? '$'+obj.amount.toFixed(2) : "0");
                        innerHTML.push('</td>');
                        innerHTML.push('<td>');
                        innerHTML.push((obj.note !== undefined && obj.note)? obj.note : "&nbsp;");
                        innerHTML.push('</td>');
                        innerHTML.push('<td>');
                        innerHTML.push(obj.date);
                        innerHTML.push('</td>');
                        innerHTML.push('<td>');
                        innerHTML.push(obj.user_id);
                        innerHTML.push('</td>');
                        innerHTML.push('<td>');
                        innerHTML.push((obj.opt1 !== undefined && obj.opt1)? obj.opt1 : "&nbsp;");
                        innerHTML.push('</td>');
                        innerHTML.push('<td>');
                        innerHTML.push((obj.opt2 !== undefined && obj.opt2 > 0)? obj.opt2 : "&nbsp;");
                        innerHTML.push('</td>');
                        innerHTML.push('</tr>');

                    } catch (e) {
                        console.warn(e);
                    }
                }
                
                invoicePaymentsList.innerHTML = innerHTML.join("");
                innerHTML = undefined;
                
                
                //WRPAdminApp.openPopupInPage('invoiceViewContainer');
                //WRP.UI.changeTab(document.querySelector("#invoice-tab-container > .tab[tabname='items']"));
            }
        })
    },
    reprintAsReceipt: function() {
        if (WRPAdminApp.pagescript._selectedInvoiceData === undefined) {
            return;
        }

        $.ajax({
            url: "ajax/store/getStoreInfo.jsp",
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data, param;
                data = result.data;
                if (!data) return;

                param = [];
                param.push("&");
                if (data.storeId !== undefined) {
                    param.push("storeId="+data.storeId+"&");
                }
                param.push("addr_up=");
                if (data.address1 !== undefined) {
                    param.push(data.address1);
                }
                if (data.address2 !== undefined) {
                    param.push(" "+data.address2);
                }
                param.push("&");
                param.push("addr_down=");
                if (data.city !== undefined) {
                    param.push(" "+data.city);
                }
                if (data.state !== undefined) {
                    param.push(" "+data.state);
                }
                if (data.zipcode !== undefined) {
                    param.push(" "+data.zipcode);
                }
                param.push("&");

                if (data.tel !== undefined) {
                    param.push("tel="+data.tel+"&");
                }

                if (data.userId !== undefined) {
                    param.push("userId="+data.userId+"&");
                }

                if (data.taxRate !== undefined) {
                    param.push("taxRate="+data.taxRate+"&");
                }
                location.href="modules/printReceipt?invoiceData="+JSON.stringify(WRPAdminApp.pagescript._selectedInvoiceData)+param.join("");

            }
        });
    },
    reprintAsInvoice: function() {
        if (WRPAdminApp.pagescript._selectedInvoiceData === undefined) {
            return;
        }

        $.ajax({
            url: "ajax/store/getStoreInfo.jsp",
            method: "POST",
            dataType: "json",
            success: function(result) {
                var data, param;
                data = result.data;
                if (!data) return;

                param = [];
                param.push("&");
                if (data.storeId !== undefined) {
                    param.push("storeId="+data.storeId+"&");
                }
                param.push("addr_up=");
                if (data.address1 !== undefined) {
                    param.push(data.address1);
                }
                if (data.address2 !== undefined) {
                    param.push(" "+data.address2);
                }
                param.push("&");
                param.push("addr_down=");
                if (data.city !== undefined) {
                    param.push(" "+data.city);
                }
                if (data.state !== undefined) {
                    param.push(" "+data.state);
                }
                if (data.zipcode !== undefined) {
                    param.push(" "+data.zipcode);
                }
                param.push("&");

                if (data.tel !== undefined) {
                    param.push("tel="+data.tel+"&");
                }

                if (data.userId !== undefined) {
                    param.push("userId="+data.userId+"&");
                }

                if (data.taxRate !== undefined) {
                    param.push("taxRate="+data.taxRate+"&");
                }
                location.href="modules/printInvoice?invoiceData="+JSON.stringify(WRPAdminApp.pagescript._selectedInvoiceData)+param.join("");

            }
        });
    }
};