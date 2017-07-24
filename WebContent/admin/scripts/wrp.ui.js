/**
 * Created by Researcher01 on 2016-11-04.
 */

// 변수가 정의되지 않을 경우 변수 정의(자바스크립트에서만 가능함)
try {
    WRP;
} catch (e) {
    WRP = {};
}

WRP.UI = function() {

    function onSplitMouseDown(event) {
        var target = event.target, elem;
        elem = target.parentNode;

        if (elem && elem.getAttribute("class").indexOf("split-panel") == -1) return;

        elem = target.previousElementSibling;
        if (elem && elem.getAttribute("class").indexOf("panel") == -1) return;

        elem = target.nextElementSibling;
        if (elem && elem.getAttribute("class").indexOf("panel") == -1) return;

        window.splitCurrentTop = target.offsetTop;
        window.splitMouseStartY = event.clientY;
        window.splitMouseEndY = event.clientY;
        window.splitCurrentSplit = target;

        document.body.addEventListener("mousemove", onSplitMouseMove);
        document.body.addEventListener("mouseup", onSplitMouseUp);
        document.body.addEventListener("mouseout", onSplitMouseOut);
    }

    function onSplitMouseMove(event) {
        var panel, panel2, split, totalHeight, splitTop, i, len, elems;
        if (window.splitCurrentSplit === undefined) return;

        split = window.splitCurrentSplit;

        panel = split.previousElementSibling;
        if (!panel || panel.getAttribute("class").indexOf("panel") == -1) return;

        panel2 = split.nextElementSibling;
        if (!panel2 || panel2.getAttribute("class").indexOf("panel") == -1) return;

        totalHeight = panel.offsetHeight + panel2.offsetHeight;

        window.splitMouseEndY = event.clientY;
        splitTop = ((window.splitCurrentTop - panel.offsetTop) + (window.splitMouseEndY - window.splitMouseStartY));
        if (50 > splitTop) return;
        if ((totalHeight - 50) < splitTop) return;

        event.preventDefault(); // element가 드래그 되는 현상 방지

        split.style.top = splitTop + panel.offsetTop + "px";

        panel.style.height = splitTop + "px";
        panel2.style.height = (totalHeight - splitTop) + "px";

        if (split.parentNode.getAttribute("panelname") && split.parentNode.getAttribute("panelname").length > 0) {
            elems = document.querySelectorAll("div[panelname='" + split.parentNode.getAttribute("panelname") + "'] .body.scroll-content");
            for (i = 0, len = elems.length; i < len; i++) {
                try {
                    //elems[i].style.height = (elems[i].offsetHeight + (window.splitMouseEndY - window.splitMouseStartY)) + "px";
                } catch (e) {
                    console.log(e);
                }
            }
        }
    }

    function onSplitMouseUp(event) {

        window.splitCurrentTop = undefined;
        window.splitMouseStartY = undefined;
        window.splitMouseEndY = undefined;
        window.splitCurrentSplit = undefined;
        document.body.removeEventListener("mousemove", onSplitMouseMove);
        document.body.removeEventListener("mouseup", onSplitMouseUp);
        document.body.removeEventListener("mouseout", onSplitMouseOut);
    }

    function onSplitMouseOut(event) {

        if (event.clientX < 3 || event.clientX > window.innerWidth - 3) {
            window.splitCurrentTop = undefined;
            window.splitMouseStartY = undefined;
            window.splitMouseEndY = undefined;
            window.splitCurrentSplit = undefined;
            document.body.removeEventListener("mousemove", onSplitMouseMove);
            document.body.removeEventListener("mouseup", onSplitMouseUp);
            document.body.removeEventListener("mouseout", onSplitMouseOut);
        }
        if (event.clientY < 3 || event.clientY > window.innerHeight - 3) {
            window.splitCurrentTop = undefined;
            window.splitMouseStartY = undefined;
            window.splitMouseEndY = undefined;
            window.splitCurrentSplit = undefined;
            document.body.removeEventListener("mousemove", onSplitMouseMove);
            document.body.removeEventListener("mouseup", onSplitMouseUp);
            document.body.removeEventListener("mouseout", onSplitMouseOut);
        }
    }

    function onTabPanelClick(event) {
        var target, parent;

        target = event.target;
    }

    return {
        init: function() {

        },
        initHeaderFixedTable: function() {
            var div, elem, elem2,
                table, thead, tbody,
                width, height,
                i, len, j, len2,
                canvas, context;

            if (arguments.length < 1) {
                console.warn("no input table element");
                return;
            }
            table = arguments[0];
            try {
                if (!table.className || table.className.indexOf("header-fixed-table") == -1) {
                    return;
                }
            } catch (e) {
                return;
            }

            for (i = 0, len = table.children.length; i < len; i++) {
                elem = table.children[i];
                if (elem.nodeName === "THEAD") {
                    thead = elem;
                } else if (elem.nodeName === "TBODY") {
                    tbody = elem;
                }

                if (thead && tbody) {
                    break;
                }
            }

            if (!thead || !tbody) return;
            width = table.getAttribute("width");

            div = document.createElement("div");
            div.className = table.className;

            if (table.removeAttribute) table.removeAttribute("class");
            else table.className = "";

            if (width) {
                if (width.indexOf("%") > -1) {
                    div.style.width = width;
                } else {
                    if (width && !isNaN(parseInt(width))) {
                        div.style.width = parseInt(width) + "px";
                    }
                }
                table.removeAttribute("width");
            }
            if (thead.children.length > 0) {
                for (i = 0, len = thead.children[0].children.length; i < len; i++) {
                    elem = thead.children[0].children[i];
                    width = elem.getAttribute("width");
                    if (width && width.indexOf("%") > -1) {
                        elem.style.width = width;
                    } else {
                        if (width && !isNaN(parseInt(width))) {
                            elem.style.width = parseInt(width) + "px";
                        }
                    }
                    elem.removeAttribute("width");
                    height = elem.getAttribute("height");
                    if (i == 0 && height && !isNaN(parseInt(height))) {
                        thead.children[0].style.height = parseInt(height) + "px";
                    }
                    elem.removeAttribute("height");
                }
            }
            for (i = 0, len = thead.children.length; i < len; i++) {
                elem = thead.children[i];
                for (j = 0, len2 = elem.children.length; j < len2; j++) {
                    elem2 = elem.children[j];
                    if (elem2.getAttribute) {
                        if (elem2.getAttribute("align")) {
                            elem2.style.textAlign = elem2.getAttribute("align");
                            elem2.removeAttribute("align");
                        }
                    }
                }
            }
            for (i = 0, len = tbody.children.length; i < len; i++) {
                elem = tbody.children[i];
                if (elem.className) {
                    if (i % 2 == 0) {
                        elem.className = elem.className + " odd";
                    } else {
                        elem.className = elem.className + " even";
                    }
                } else {
                    if (i % 2 == 0) {
                        elem.className = "odd";
                    } else {
                        elem.className = "even";
                    }
                }
                for (j = 0, len2 = elem.children.length; j < len2; j++) {
                    elem2 = elem.children[j];
                    if (elem2.getAttribute) {
                        if (elem2.getAttribute("align")) {
                            elem2.style.textAlign = elem2.getAttribute("align");
                            elem2.removeAttribute("align");
                        }
                    }
                }
            }
            div.innerHTML = '<div class="header"><table>' + thead.outerHTML + '</table></div>';

            table.parentNode.replaceChild(div, table);
            elem = document.createElement("div");
            elem.className = "body scrollbar-macosx";
            div.appendChild(elem);
            elem.appendChild(table);
            height = table.getAttribute("height");
            if (height) {
                if (height.indexOf("calc") == 0) {
                    elem.style.height = "100%";
                } else {
                    if (height.indexOf("%") > -1) {
                        elem.style.height = "100%";
                    } else {
                        if (!isNaN(parseInt(height)) ){
                            elem.style.height = parseInt(height) + "px";
                        }
                    }
                }
                table.removeAttribute("height");
            }
            if (thead.children.length > 0) {
                for (i = 0, len = thead.children[0].children.length; i < len; i++) {
                    thead.children[0].children[i].innerHTML = "";
                }
            }

            canvas = document.createElement("canvas");

            context = canvas.getContext("2d");
            if (context) {
                canvas.width = 50;
                canvas.height = 50;

                context.fillStyle = "rgba(250,250,250,1)";
                context.fillRect(0, 0, 50, 25);

                context.fillStyle = "rgba(242,242,242,1)";
                context.fillRect(0, 25, 50, 25);

                elem.style.backgroundImage = 'url("'+canvas.toDataURL() + '")';
                elem.style.backgroundRepeat = "repeat";
            }

            $(elem).scrollbar();
        },
        removeRow: function() {
            var tr, parent;
            if (arguments.length < 1) {
                console.warn("no input element");
                return;
            }

            tr = arguments[0];

            while(tr) {
                try {
                    if (tr.nodeName === "TR") break;
                } catch (e) {
                    console.warn(e);
                }
                tr = tr.parentNode;
            }

            if (tr) {
                try {
                    tr.parentNode.removeChild(tr);
                } catch (e) {

                }
            }
        },
        initSplitPanel: function() {
            var splitPanel, panel, split, i, len;
            if (arguments.length < 1) {
                console.warn("no input split panel element");
                return;
            }

            splitPanel = arguments[0];

            try {
                if (splitPanel.className !== "split-panel") return;
            } catch (e) {
                console.warn(e);
                return;
            }

            for (i = 0, len = splitPanel.children.length; i < len; i++) {
                panel = splitPanel.children[i];
                if (i == 0) continue;

                try {
                    if (panel.getAttribute("class").indexOf("panel") > -1) {
                        if (splitPanel.children[i-1].getAttribute("class").indexOf("panel") > -1) {
                            split = document.createElement("div");
                            if (panel.getAttribute("class").indexOf("plain") == 0 && splitPanel.children[i-1].getAttribute("class").indexOf("plain") == 0) {
                                split.setAttribute("class", "split visible");
                            } else {
                                split.setAttribute("class", "split");

                            }
                            //split.style.top = panel.offsetTop + "px";
                            split.addEventListener("mousedown", onSplitMouseDown);
                            splitPanel.insertBefore(split, panel);
                            split = undefined;
                            len = splitPanel.children.length;
                        }
                    }
                } catch (e) {
                    console.log(e);
                }
            }

            splitPanel.className = splitPanel.className + " handled";
        },
        changePanelBySubmenu: function() { // param : [submenu element or panel name]
            var submenu, submenuContainer, panelContainer, i, len, elem;
            if (arguments.length < 1) {
                console.warn("no input submenu element or panel name");
                return;
            }

            if (typeof(arguments[0]) === "string") {
                submenu = document.querySelector(".submenu[panelname='"+ arguments[0] + "']");
                if (!submenu) {
                    console.warn("this submenu not exists");
                    return;
                }
            } else {
                submenu = arguments[0];
            }

            try {
                if (submenu.getAttribute("panelname") === undefined || submenu.getAttribute("panelname").length == 0) {
                    return;
                }
            } catch (e) {
                console.warn(e);
                return;
            }

            try {
                submenuContainer = submenu.parentNode;
                if (submenuContainer.className !== "page-submenu-container") {
                    return;
                }
            } catch (e) {
                console.warn(e);
                return;
            }

            try{
            	for(i = 0; i < submenuContainer.children.length; i++){
            		if(submenuContainer.children[i].className == "submenu"){
            			submenuContainer.children[i].style.backgroundColor = 'rgba(0,0,0,0)';
            		}
            	}

            	submenu.style.backgroundColor = 'rgba(200,200,200,0.5)';
            }catch(e){
            	console.warn(e);
            	return;
            }
            
            try {
                panelContainer = submenuContainer.parentNode.children[1];
                if (panelContainer.className !== "panels") {
                    return;
                }
            } catch (e) {
                console.warn(e);
                return;
            }

            for (i = 0, len = panelContainer.children.length; i < len; i++) {
                try {
                    elem = panelContainer.children[i];
                    if (elem.getAttribute("panelname") === submenu.getAttribute("panelname")) {
                        elem.style.display = "block";
                    } else {
                        elem.style.display = "none";
                    }
                } catch (e) {
                    console.warn(e);
                }
            }
        },
        changeTab: function() { // param : [tab element or tab name]
            var tab, tabContainer, tabContentContainer, i, len, elem;
            if (arguments.length < 1) {
                console.warn("no input tab element or tab name");
                return;
            }

            if (typeof(arguments[0]) === "string") {
                tab = document.querySelector(".tab[tabname='"+ arguments[0] + "']");
                if (!tab) {
                    console.warn("this tab not exists");
                    return;
                }
            } else {
                tab = arguments[0];
            }

            try {
                if (tab.getAttribute("tabname") === undefined || tab.getAttribute("tabname").length == 0) {
                    return;
                }
            } catch (e) {
                console.warn(e);
                return;
            }

            try {
                tabContainer = tab.parentNode;
                if (tabContainer.className !== "tab-container") {
                    return;
                }
            } catch (e) {
                console.warn(e);
                return;
            }

            try {
                tabContentContainer = tabContainer.parentNode.children[1];
                if (tabContentContainer.className !== "tab-content-container") {
                    return;
                }
            } catch (e) {
                console.warn(e);
                return;
            }

            for (i = 0, len = tabContainer.children.length; i < len; i++) {
                try {
                    elem = tabContainer.children[i];
                    if (elem.getAttribute("tabname") === tab.getAttribute("tabname")) {
                        elem.setAttribute("class", "tab activate");
                    } else {
                        elem.setAttribute("class", "tab");
                    }
                } catch (e) {
                    console.warn(e);
                }
            }

            for (i = 0, len = tabContentContainer.children.length; i < len; i++) {
                try {
                    elem = tabContentContainer.children[i];
                    if (elem.getAttribute("tabname") === tab.getAttribute("tabname")) {
                        elem.style.display = "block";
                    } else {
                        elem.style.display = "none";
                    }
                } catch (e) {
                    console.warn(e);
                }
            }
        }
    };
}();