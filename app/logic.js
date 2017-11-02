var firstTwelve = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
var secondTwelve = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
var thirdTwelve = [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36];
var topRow = [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34];
var midRow = [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35];
var botRow = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36];
var red = [1, 3, 5, 7, 9, 12, 14, 16, 18, 21, 23, 25, 27, 28, 30, 32, 34, 36];
var black = [2, 4, 6, 8, 10, 11, 13, 15, 17, 19, 20, 22, 24, 26, 29, 31, 33, 35];
var zero = [0]
var firstHalf = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
var secondHalf = [19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36];
var chipsPlaced = [];
var multiplier = chipsPlaced.length;
var prevSpins = [];
var redSpins = [];
var blackSpins = [];
var balance = 100;
var auto;

function spinFunction() {

    var prevBalance = balance; 
    var postBalance;
    var payout;
    var multiplier = chipsPlaced.length;
    var betAmt = $("#betInput").val();
    var totalBet = multiplier * betAmt;
    var lastSpin = Math.floor(Math.random() * 37);

    if (totalBet > balance) {
        alert("Insufficient funds!");
        console.log("Insufficient funds!")
        clearInterval(auto);
        return
    }

    balance = balance - totalBet;

    for (var i = 0; i < chipsPlaced.length; i++) {
        if (chipsPlaced[i] === lastSpin) {
            balance = balance + betAmt * 37;
        };
        if (chipsPlaced[i] === "1-12") {
            if (firstTwelve.includes(lastSpin)) {
                balance = balance + betAmt * 3
            }
        };
        if (chipsPlaced[i] === "13-24") {
            if (secondTwelve.includes(lastSpin)) {
                balance = balance + betAmt * 3
            }
        };
        if (chipsPlaced[i] === "25-36") {
            if (thirdTwelve.includes(lastSpin)) {
                balance = balance + betAmt * 3
            }
        };
        if (chipsPlaced[i] === "Top") {
            if (topRow.includes(lastSpin)) {
                balance = balance + betAmt * 3
            }
        };
        if (chipsPlaced[i] === "Mid") {
            if (midRow.includes(lastSpin)) {
                balance = balance + betAmt * 3
            }
        };
        if (chipsPlaced[i] === "Bottom") {
            if (botRow.includes(lastSpin)) {
                balance = balance + betAmt * 3
            }
        };
        if (chipsPlaced[i] === "1-18") {
            if (firstHalf.includes(lastSpin)) {
                balance = balance + betAmt * 2
            }
        };
        if (chipsPlaced[i] === "19-36") {
            if (secondHalf.includes(lastSpin)) {
                balance = balance + betAmt * 2
            }
        };
        if (chipsPlaced[i] === "red") {
            if (red.includes(lastSpin)) {
                balance = balance + betAmt * 2
            }
        };
        if (chipsPlaced[i] === "black") {
            if (black.includes(lastSpin)) {
                balance = balance + betAmt * 2
            }
        };
        if (chipsPlaced[i] === "even") {
            if (lastSpin % 2 === 0) {
                if (lastSpin !== 0) {
                    balance = balance + betAmt * 2
                }
            }
        };
        if (chipsPlaced[i] === "odd") {
            if (lastSpin % 2 === 1) {
                if (lastSpin !== 0) {
                    balance = balance + betAmt * 2
                }
            }
        };
    };

    //payout
    postBalance = balance;
    payout = postBalance - prevBalance;

    if (payout === 0) {
        $('#payout').html("<a class='black-text'>" + (Math.round(payout * 10000000) / 10000000) + "</a>")
    }

    if (payout < 0) {
        $('#payout').html("<a class='red-text'>" + (Math.round(payout * 10000000) / 10000000) + "</a>")
    };

    if (payout > 0) {
        $('#payout').html("<a class='green-text'>" + (Math.round(payout * 10000000) / 10000000) + "</a>")
    };

    $('#balance').html((Math.round(balance * 10000000) / 10000000));

    //display last spin
    if (red.includes(lastSpin)) {
        document.getElementById("lastSpin").style.color = "red"
    };

    if (black.includes(lastSpin)) {
        document.getElementById("lastSpin").style.color = "black"
    };

    if (lastSpin === 0) {
        document.getElementById("lastSpin").style.color = "green"
    }

    $('#lastSpin').html(lastSpin);

    //display spin history
    if (black.includes(lastSpin)) {
        var lastSpinDisplay = "<a id='blackHistory' class='black-text col s11'>" + lastSpin + " </a>";
        $('#spinDisplay').prepend(lastSpinDisplay)
    };

    if (red.includes(lastSpin)) {
        var lastSpinDisplay = "<a id='redHistory' class='red-text col s11'>" + lastSpin + " </a> ";
        $('#spinDisplay').prepend(lastSpinDisplay)
    };

    if (zero.includes(lastSpin)) {
        var lastSpinDisplay = "<a id='zeroHistory'class='green-text col s11'>" + lastSpin + " </a> ";
        $('#spinDisplay').prepend(lastSpinDisplay)
    };

    console.log("Bet Amount: " + betAmt + ", TotalBet: " + Math.round(totalBet * 10000000) / 10000000)
    console.log("Payout: " + (Math.round(payout * 10000000) / 10000000) + ", Current Balance: " + (Math.round(balance * 10000000) / 10000000));
    console.log("Last Spin: " + lastSpin)
};

//ready on page load
$(document).ready(function() {
    //dropdown to select bet amount
    $('select').material_select();
    $('select').on("click change", function() {
        var betAmt = $("#betInput").val();
        var multiplier = chipsPlaced.length;
        var totalBet = multiplier * betAmt;
        $('#total').html(Math.round(totalBet * 10000) / 10000)
    })

    // 1 bet per click, display bets
    $('#n1to12').click(function() {
        chipsPlaced.push("1-12");
        console.log(chipsPlaced);
        $("#currentBets").prepend("<a class='green-text col s12'>1st12</a><div class='row'></div>")
    });
    $('#n13to24').click(function() {
        chipsPlaced.push("13-24");
        console.log(chipsPlaced);
        $("#currentBets").prepend("<a class='green-text col s12'>2nd12</a><div class='row'></div>")
    });
    $('#n25to36').click(function() {
        chipsPlaced.push("25-36");
        console.log(chipsPlaced);
        $("#currentBets").prepend("<a class='green-text col s12'>3rd12</a><div class='row'></div>")
    });
    $('#ntoprow').click(function() {
        chipsPlaced.push("Top");
        console.log(chipsPlaced);
        $("#currentBets").prepend("<a class='green-text col s12'>Top</a><div class='row'></div>")
    });
    $('#nmidrow').click(function() {
        chipsPlaced.push("Mid");
        console.log(chipsPlaced);
        $("#currentBets").prepend("<a class='green-text col s12'>Mid</a><div class='row'></div>")
    });
    $('#nbotrow').click(function() {
        chipsPlaced.push("Bottom");
        console.log(chipsPlaced);
        $("#currentBets").prepend("<a class='green-text col s12'>Bottom</a><div class='row'></div>")
    });
    $('#n1to18').click(function() {
        chipsPlaced.push("1-18");
        console.log(chipsPlaced);
        $("#currentBets").prepend("<a class='green-text col s12'>1-18</a><div class='row'></div>")
    });
    $('#n19to36').click(function() {
        chipsPlaced.push("19-36");
        console.log(chipsPlaced);
        $("#currentBets").prepend("<a class='green-text col s12'>19-36</a><div class='row'></div>")
    });
    $('#neven').click(function() {
        chipsPlaced.push("even");
        console.log(chipsPlaced);
        $("#currentBets").prepend("<a class='green-text col s12'>Even</a><div class='row'></div>")
    });
    $('#nodd').click(function() {
        chipsPlaced.push("odd");
        console.log(chipsPlaced);
        $("#currentBets").prepend("<a class='green-text col s12'>Odd</a><div class='row'></div>")
    });
    $('#nred').click(function() {
        chipsPlaced.push("red");
        console.log(chipsPlaced);
        $("#currentBets").prepend("<a class='red-text col s12'>Red</a><div class='row'></div>")
    });
    $('#nblack').click(function() {
        chipsPlaced.push("black");
        console.log(chipsPlaced);
        $("#currentBets").prepend("<a class='black-text col s12'>Black</a><div class='row'></div>")
    });
    $('#n1').click(function() {
        chipsPlaced.push(1);
        console.log(chipsPlaced);
        $("#currentBets").prepend("<a class='red-text col s12'>1</a><div class='row'></div>")
    });
    $('#n2').click(function() {
        chipsPlaced.push(2);
        console.log(chipsPlaced);
        $("#currentBets").prepend("<a class='black-text col s12'>2</a><div class='row'></div>")
    });
    $('#n3').click(function() {
        chipsPlaced.push(3);
        console.log(chipsPlaced);
        $("#currentBets").prepend("<a class='red-text col s12'>3</a><div class='row'></div>")
    });
    $('#n4').click(function() {
        chipsPlaced.push(4);
        console.log(chipsPlaced);
        $("#currentBets").prepend("<a class='black-text col s12'>4</a><div class='row'></div>")
    });
    $('#n5').click(function() {
        chipsPlaced.push(5);
        console.log(chipsPlaced);
        $("#currentBets").prepend("<a class='red-text col s12'>5</a><div class='row'></div>")
    });
    $('#n6').click(function() {
        chipsPlaced.push(6);
        console.log(chipsPlaced);
        $("#currentBets").prepend("<a class='black-text col s12'>6</a><div class='row'></div>")
    });
    $('#n7').click(function() {
        chipsPlaced.push(7);
        console.log(chipsPlaced);
        $("#currentBets").prepend("<a class='red-text col s12'>7</a><div class='row'></div>")
    });
    $('#n8').click(function() {
        chipsPlaced.push(8);
        console.log(chipsPlaced);
        $("#currentBets").prepend("<a class='black-text col s12'>8</a><div class='row'></div>")
    });
    $('#n9').click(function() {
        chipsPlaced.push(9);
        console.log(chipsPlaced);
        $("#currentBets").prepend("<a class='red-text col s12'>9</a><div class='row'></div>")
    });
    $('#n10').click(function() {
        chipsPlaced.push(10);
        console.log(chipsPlaced);
        $("#currentBets").prepend("<a class='black-text col s12'>10</a><div class='row'></div>")
    });
    $('#n11').click(function() {
        chipsPlaced.push(11);
        console.log(chipsPlaced);
        $("#currentBets").prepend("<a class='black-text col s12'>11</a><div class='row'></div>")
    });
    $('#n12').click(function() {
        chipsPlaced.push(12);
        console.log(chipsPlaced);
        $("#currentBets").prepend("<a class='red-text col s12'>12</a><div class='row'></div>")
    });
    $('#n13').click(function() {
        chipsPlaced.push(13);
        console.log(chipsPlaced);
        $("#currentBets").prepend("<a class='black-text col s12'>13</a><div class='row'></div>")
    });
    $('#n14').click(function() {
        chipsPlaced.push(14);
        console.log(chipsPlaced);
        $("#currentBets").prepend("<a class='red-text col s12'>14</a><div class='row'></div>")
    });
    $('#n15').click(function() {
        chipsPlaced.push(15);
        console.log(chipsPlaced);
        $("#currentBets").prepend("<a class='black-text col s12'>15</a><div class='row'></div>")
    });
    $('#n16').click(function() {
        chipsPlaced.push(16);
        console.log(chipsPlaced);
        $("#currentBets").prepend("<a class='red-text col s12'>16</a><div class='row'></div>")
    });
    $('#n17').click(function() {
        chipsPlaced.push(17);
        console.log(chipsPlaced);
        $("#currentBets").prepend("<a class='black-text col s12'>17</a><div class='row'></div>")
    });
    $('#n18').click(function() {
        chipsPlaced.push(18);
        console.log(chipsPlaced);
        $("#currentBets").prepend("<a class='red-text col s12'>18</a><div class='row'></div>")
    });
    $('#n19').click(function() {
        chipsPlaced.push(19);
        console.log(chipsPlaced);
        $("#currentBets").prepend("<a class='black-text col s12'>19</a><div class='row'></div>")
    });
    $('#n20').click(function() {
        chipsPlaced.push(20);
        console.log(chipsPlaced);
        $("#currentBets").prepend("<a class='black-text col s12'>20</a><div class='row'></div>")
    });
    $('#n21').click(function() {
        chipsPlaced.push(21);
        console.log(chipsPlaced);
        $("#currentBets").prepend("<a class='red-text col s12'>21</a><div class='row'></div>")
    });
    $('#n22').click(function() {
        chipsPlaced.push(22);
        console.log(chipsPlaced);
        $("#currentBets").prepend("<a class='black-text col s12'>22</a><div class='row'></div>")
    });
    $('#n23').click(function() {
        chipsPlaced.push(23);
        console.log(chipsPlaced);
        $("#currentBets").prepend("<a class='red-text col s12'>23</a><div class='row'></div>")
    });
    $('#n24').click(function() {
        chipsPlaced.push(24);
        console.log(chipsPlaced);
        $("#currentBets").prepend("<a class='black-text col s12'>24</a><div class='row'></div>")
    });
    $('#n25').click(function() {
        chipsPlaced.push(25);
        console.log(chipsPlaced)
        $("#currentBets").prepend("<a class='red-text col s12'>25</a><div class='row'></div>")
    });
    $('#n26').click(function() {
        chipsPlaced.push(26);
        console.log(chipsPlaced);
        $("#currentBets").prepend("<a class='black-text col s12'>26</a><div class='row'></div>")
    });
    $('#n27').click(function() {
        chipsPlaced.push(27);
        console.log(chipsPlaced);
        $("#currentBets").prepend("<a class='red-text col s12'>27</a><div class='row'></div>")
    });
    $('#n28').click(function() {
        chipsPlaced.push(28);
        console.log(chipsPlaced);
        $("#currentBets").prepend("<a class='red-text col s12'>28</a><div class='row'></div>")
    });
    $('#n29').click(function() {
        chipsPlaced.push(29);
        console.log(chipsPlaced);
        $("#currentBets").prepend("<a class='black-text col s12'>29</a><div class='row'></div>")
    });
    $('#n30').click(function() {
        chipsPlaced.push(30);
        console.log(chipsPlaced);
        $("#currentBets").prepend("<a class='red-text col s12'>30</a><div class='row'></div>")
    });
    $('#n31').click(function() {
        chipsPlaced.push(31);
        console.log(chipsPlaced);
        $("#currentBets").prepend("<a class='black-text col s12'>31</a><div class='row'></div>")
    });
    $('#n32').click(function() {
        chipsPlaced.push(32);
        console.log(chipsPlaced);
        $("#currentBets").prepend("<a class='red-text col s12'>32</a><div class='row'></div>")
    });
    $('#n33').click(function() {
        chipsPlaced.push(33);
        console.log(chipsPlaced);
        $("#currentBets").prepend("<a class='black-text col s12'>33</a><div class='row'></div>")
    });
    $('#n34').click(function() {
        chipsPlaced.push(34);
        console.log(chipsPlaced);
        $("#currentBets").prepend("<a class='red-text col s12'>34</a><div class='row'></div>")
    });
    $('#n35').click(function() {
        chipsPlaced.push(35);
        console.log(chipsPlaced);
        $("#currentBets").prepend("<a class='black-text col s12'>35</a><div class='row'></div>")
    });
    $('#n36').click(function() {
        chipsPlaced.push(36);
        console.log(chipsPlaced);
        $("#currentBets").prepend("<a class='red-text col s12'>36</a><div class='row'></div>")
    });
    $('#n0').click(function() {
        chipsPlaced.push(0);
        console.log(chipsPlaced);
        $("#currentBets").prepend("<a class='green-text col s12'>0</a><div class='row'></div>")
    });

    //remove bets from board
    $('#clear').on("click", function() {
        chipsPlaced = [];
        $("#currentBets").empty();
        $("#total").html("0");
        console.log("cleared")
    });


    $('#clearHistory').on('click', function() {
        $('#spinDisplay').empty()
    })

    // calculate bet amount x chip amount
    // display current bets
    $('button').on("click", function() {
        var multiplier = chipsPlaced.length;
        var totalBet = multiplier * $("#betInput").val();
        $('#total').html(Math.round(totalBet * 10000) / 10000);
    });

    $('#spin').on("click", function() {
        spinFunction();
    });

    $('#autoSpin').on("click", function() {
        clearInterval(auto, 500);

        auto = setInterval(spinFunction, 500);
        spinFunction();
    });
    
    $('#stopAuto').on("click", function() {
        clearInterval(auto);
    });

    console.log("Javascript connected!")
});