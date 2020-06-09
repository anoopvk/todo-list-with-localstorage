$(document).ready(function () {

    var pendingdataprev = JSON.parse(localStorage.getItem('pendingdataprev'));
    var completeddataprev = JSON.parse(localStorage.getItem('completeddataprev'));
    var pendingdata = [];
    var completeddata = [];

    var pendingcounter = 0;
    var completedcounter = 0;

    if (pendingdataprev != null) {
        console.log("pendingdataprev", pendingdataprev);
        setpendingdataprev(pendingdataprev);
        pendingdata = pendingdataprev;
    }
    if (completeddataprev != null) {
        console.log("completeddataprev", completeddataprev);
        setcompleteddataprev(completeddataprev);
        completeddata = completeddataprev;

    }


    drawcounter(pendingcounter, completedcounter);


    $("#inputb").on("keyup", function (e) {
        if (e.keyCode == 13 && $("#inputb").val() != "") {
            pendingdata.push($("#inputb").val());
            localStorage.setItem('pendingdataprev', JSON.stringify(pendingdata));
            console.log(pendingdata);
            addpending($("#inputb").val());

            $("#inputb").val("");
        }
    })

    function addpending(value) {
        let pending = $("<div class='item'></div>").text(value);
        let done = $("<i class='fas fa-check'></i>");
        let del = $("<i class='fas fa-trash'></i>");
        del.on("click", function () {
            let par = $(this).parent();
            console.log(par.text());
            par.fadeOut(0, function () {

                // console.log(par.parent().attr("id"));
                if (par.parent().attr("id") == "incomp") {
                    let ind = pendingdata.indexOf(par.text());
                    pendingdata.splice(ind, 1);
                    localStorage.setItem('pendingdataprev', JSON.stringify(pendingdata));
                    console.log(pendingdata);

                    pendingcounter -= 1;
                    drawcounter(pendingcounter, completedcounter);
                    // console.log("pending=", pendingcounter);
                }
                if (par.parent().attr("id") == "comp") {
                    let ind = completeddata.indexOf(par.text());
                    completeddata.splice(ind, 1);
                    localStorage.setItem('completeddataprev', JSON.stringify(completeddata));
                    completedcounter -= 1;
                    drawcounter(pendingcounter, completedcounter);
                    // console.log("completed=", completedcounter);
                }
                par.remove();
            });
        });
        done.on("click", function () {

            let par = $(this).parent();
            // console.log(par.text());
            let ind = pendingdata.indexOf(par.text());
            completeddata.push(pendingdata[ind]);
            pendingdata.splice(ind, 1);
            localStorage.setItem('pendingdataprev', JSON.stringify(pendingdata));
            localStorage.setItem('completeddataprev', JSON.stringify(completeddata));
            console.log(pendingdata);
            let doneremove = $(this);
            par.fadeOut(0, function () {
                doneremove.remove();
                $("#comp").append(par);
                pendingcounter -= 1;
                completedcounter += 1;
                drawcounter(pendingcounter, completedcounter);
                par.fadeIn();
                // par.remove();
            });
        })
        pending.append(done, del);
        // console.log(pending);
        $("#incomp").append(pending);
        pendingcounter += 1;
        drawcounter(pendingcounter, completedcounter);
    }


    function addcompleted(value) {
        let completed = $("<div class='item'></div>").text(value);
        let del = $("<i class='fas fa-trash'></i>");
        del.on("click", function () {
            let par = $(this).parent();
            console.log(par.text());
            par.fadeOut(0, function () {
                if (par.parent().attr("id") == "comp") {
                    let ind = completeddata.indexOf(par.text());
                    completeddata.splice(ind, 1);
                    localStorage.setItem('completeddataprev', JSON.stringify(completeddata));
                    completedcounter -= 1;
                    drawcounter(pendingcounter, completedcounter);
                }
                par.remove();
            });
        });
        completed.append(del);
        $("#comp").append(completed);
        completedcounter += 1;
        drawcounter(pendingcounter, completedcounter);

    }














    function drawcounter(pending, completed) {
        console.log("completed array=", completeddata);
        console.log("pending array=", pendingdata);



        $("#pendingcount").text(pending);
        $("#completedcount").text(completed);
        if (pending == 0) {
            $("#emptyincomp").fadeIn(500);
        }
        else {
            $("#emptyincomp").fadeOut(0);
        }
        if (completed == 0) {
            $("#emptycomp").fadeIn(500);
        }
        else {
            $("#emptycomp").fadeOut(0);
        }
    }



    function setpendingdataprev(pendingdataprev) {
        console.log("setpendingdataprev", pendingdataprev);
        pendingdataprev.forEach(textvalue => {
            addpending(textvalue);
        });





    }
    function setcompleteddataprev(completeddataprev) {
        console.log("setcompleteddataprev", completeddataprev);
        completeddataprev.forEach(textvalue => {
            addcompleted(textvalue);
        });

    }


























});


