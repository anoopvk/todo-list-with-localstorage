$(document).ready(function () {
    var pendingdataprev = localStorage.getItem('pendingdataprev');
    var completeddataprev = localStorage.getItem('completeddataprev');
    var pendingdata=[];
    var completeddata=[];
    
    if(pendingdataprev!=null){
        setpendingdataprev(pendingdataprev);
        pendingdata=[pendingdataprev];

    }
    if(completeddataprev!=null){
        setcompleteddataprev(completeddataprev);
        completeddata=[completeddataprev];

    }
    
    let pendingcounter = 0;
    let completedcounter = 0;
    drawcounter(pendingcounter, completedcounter);
    $("#inputb").on("keyup", function (e) {
        if (e.keyCode == 13 && $("#inputb").val() != "") {
            pendingdata.push($("#inputb").val());
            localStorage.setItem('pendingdataprev', pendingdata);

            let pending = $("<div class='item'></div>").text($("#inputb").val());
            let done = $("<i class='fas fa-check'></i>");
            let del = $("<i class='fas fa-trash'></i>");
            del.on("click", function () {
                let par = $(this).parent();
                console.log(par.text());
                par.fadeOut(0, function () {

                    // console.log(par.parent().attr("id"));
                    if (par.parent().attr("id") == "incomp") {
                        let ind=pendingdata.indexOf(par.text());
                        pendingdata.splice(ind,1);

                        pendingcounter -= 1;
                        drawcounter(pendingcounter, completedcounter);
                        // console.log("pending=", pendingcounter);
                    }
                    if (par.parent().attr("id") == "comp") {
                        let ind=completeddata.indexOf(par.text());
                        completeddata.splice(ind,1);

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
                let ind=pendingdata.indexOf(par.text());
                completeddata.push(pendingdata[ind]);
                pendingdata.splice(ind,1);

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
            $("#inputb").val("");
        }
    })

    function drawcounter(pending, completed) {
        console.log("completed array=",completeddata);
        console.log("pending array=",pendingdata);
        


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



    function setpendingdataprev(pendingdataprev){
        console.log("setpendingdataprev",pendingdataprev);
        // pendingdataprev.forEach(textvalue => {
            
        // });





    }
    function setcompleteddataprev(completeddataprev){
        console.log("setcompleteddataprev",completeddataprev);

    }


























});


