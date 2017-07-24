/**
 * Created by Researcher01 on 2016-10-10.
 */

POSOneAdminIndexModule = function() {
    return {
        init: function() {

        },
        loginSystem: function() {
            var data = {};

            try {
                data.userId = document.getElementById("login-user-id").value;
                if (data.userId.length == 0) {
                    alert("Input User ID");
                    return;
                }
            } catch (e) {
                console.warn(e);
                return;
            }

            try {
                data.password = document.getElementById("login-user-password").value;
                if (data.password.length == 0) {
                    alert("Input Password");
                    return;
                }
            } catch (e) {
                console.warn(e);
                return;
            }
            $.ajax({
                url: "ajax/session/loginSystem.jsp",
                data: data,
                method: "POST",
                dataType: "json",
                success: function(result) {
                    switch (result) {
                        case 0:
                            location.href="main.jsp";
                            break;
                        case -1:
                            alert("You did input incorrect ID or password");
                            break;
                        case -2:
                            alert("You aren't allowed to access any store");
                            break;
                        case -3:
                            alert("Access Denied");
                            break;
                        case -4:
                            alert("This user isn't allocated in owner or master");
                            break;
                        case -5:
                            alert("Master DB Name isn't defined");
                            break;
                    }
                }
            });
        },
        loginSystemAsEmily: function() {
            var data = {};

            data.userId = "EMILY.LEGATO";
            data.password = "1234";

            $.ajax({
                url: "ajax/session/loginSystem.jsp",
                data: data,
                method: "POST",
                dataType: "json",
                success: function(result) {
                    switch (result) {
                    case 0:
                        location.href="main.jsp";
                        break;
                    case -1:
                        alert("You did input incorrect ID or password");
                        break;
                    case -2:
                        alert("You aren't allowed to access any store");
                        break;
                    case -3:
                        alert("Access Denied");
                        break;
                    case -4:
                        alert("This user isn't allocated in owner or master");
                        break;
                    case -5:
                        alert("Master DB Name isn't defined");
                        break;
                    }
                }
            });
        }
    };
}();