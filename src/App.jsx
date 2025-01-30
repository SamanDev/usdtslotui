import React, { useState, useEffect } from "react";
import { Dimmer, Loader} from "semantic-ui-react";

import Loaderr from "./components/Loader";
import Reels from "./components/Reels";
import Controls from "./components/Controls";
import $ from "jquery";

let _auth = null;
const loc = new URL(window.location);
const pathArr = loc.pathname.toString().split("/");

if (pathArr.length == 3) {
    _auth = pathArr[1];
}
//const WEB_URL = process.env.REACT_APP_MODE === "production" ? `wss://${process.env.REACT_APP_DOMAIN_NAME}/` : `ws://${loc.hostname}:8092`;
const WEB_URL = `wss://mslot.usdtpoker.club/`;
const r1 = [5, 1, 0, 1, 4, 2, 2, 4, 2, 0, 3, 0, 0, 3, 0, 3, 1, 1, 0, 0, 2, 1, 0, 1, 0, 2, 1, 0, 2, 0, 3, 0, 0, 5, 2, 1, 2, 1, 0, 6, 2, 1, 1, 2, 1, 2, 3, 4, 4, 6, 3, 1, 0, 3, 0, 0, 5, 0, 0, 0, 3, 1];
const r2 = [0, 4, 4, 2, 3, 0, 1, 3, 3, 1, 2, 0, 3, 0, 6, 2, 1, 0, 1, 1, 0, 1, 0, 2, 0, 0, 4, 0, 3, 0, 1, 5, 4, 1, 5, 1, 1, 2, 0, 0, 3, 0, 1, 0, 2, 0, 0, 3, 0, 2, 2, 2, 6, 0, 1, 5, 2, 2, 1, 0, 1, 3];
const r3 = [1, 3, 0, 0, 4, 4, 1, 0, 1, 2, 1, 0, 2, 0, 0, 0, 3, 6, 4, 0, 4, 0, 6, 5, 1, 0, 3, 2, 5, 3, 0, 0, 0, 1, 0, 2, 1, 1, 1, 1, 2, 0, 1, 3, 3, 0, 3, 1, 0, 0, 0, 1, 2, 2, 0, 5, 3, 1, 2, 2, 2, 2];
const rewardsList = [300, 100, 50, 20, 10, 5, 3, 2, 1];

const doCurrency = (value,fix) => {
    var val = parseFloat(value).toFixed(fix || fix == 0 ? fix : 0)?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    return val;
};


function animateNum() {
    $(".counter").each(function () {
        var $this = $(this),
            countTo = $this.attr("data-count"),
            countFrom = $this.attr("start-num") ? $this.attr("start-num") : parseFloat($this.text().replace(/,/g, ""));

        if (countTo != countFrom && !$this.hasClass("doing") && !$this.hasClass("notcount")) {
            $this.attr("start-num", countFrom);
            // $this.addClass("doing");

            $({ countNum: countFrom }).animate(
                {
                    countNum: countTo,
                },

                {
                    duration: 400,
                    easing: "linear",

                    step: function () {
                        //$this.attr('start-num',Math.floor(this.countNum));
                        $this.text(doCurrency((this.countNum),2));
                    },
                    complete: function () {
                        $this.text(doCurrency(this.countNum,2));
                        $this.attr("start-num", (this.countNum));
                        //$this.removeClass("doingdoing");
                        //alert('finished');
                    },
                }
            );
        } else {
            if ($this.hasClass("notcount")) {
                $this.text(doCurrency(countTo));
            }else{
            if ($this.hasClass("doing")) {
                $this.attr("start-num", countFrom);
                $this.removeClass("doing");
            } else {
                $this.text(doCurrency(countFrom,2));
                $this.attr("start-num", countFrom);
                
            }
        }
        }
    });
}
const AppOrtion = () => {
    let gWidth = $("#root").width() / 1000;
    let gHight = $("#root").height() / 650;
    let scale = gWidth < gHight ? gWidth : gHight;
    let highProtect = $("#root").height() * scale;
    //console.log($("#root").width(),$("#root").height());
    // console.log(gWidth,gHight,scale);

    if (highProtect > 850) {
        //console.log(gWidth,gHight,highProtect);
        //gHight = $("#root").height() / 850;
        // scale = (scale + gHight)/2;
        scale = gHight;
        highProtect = $("#root").height() * scale;
        let _t = ($("#root").height() - highProtect) / 2;
        if (_t < 0) {
            _t = _t * -1;
        }

        if (scale < 1) {
            setTimeout(() => {
                $("#scale").css("transform", "scale(" + scale + ")");
            }, 10);
        } else {
            scale = 1;
            setTimeout(() => {
                $("#scale").css("transform", "scale(" + scale + ") translateY(" + _t + "px)");
            }, 10);
        }
    } else {
        // gHight = $("#root").height() / 850;
        // scale = (scale + gHight)/2;
        //  scale = gHight;
        let _t = ($("#root").height() - highProtect) / 2;
        if (_t < 0) {
            _t = _t * -1;
        }
        if (scale < 1) {
            setTimeout(() => {
                $("#scale").css("transform", "scale(" + scale + ") translateY(" + _t + "px)");
            }, 10);
        } else {
            scale = 1;
            setTimeout(() => {
                $("#scale").css("transform", "scale(" + scale + ") translateY(" + _t + "px)");
            }, 10);
        }
    }

    // console.log(gWidth,highProtect,gHight,scale)
};
const socket = new WebSocket(WEB_URL, _auth);
window.addEventListener("message", function (event) {
    if (event?.data?.username) {
        const payLoad = {
            method: "syncBalance",

            balance: event?.data?.balance,
        };
        try {
            socket.send(JSON.stringify(payLoad));
        } catch (error) {}
    }
});
let supportsOrientationChange = "onorientationchange" in window,
    orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";

window.addEventListener(
    orientationEvent,
    function () {
        AppOrtion();
    },
    false
);
window.parent.postMessage("userget", "*");

if (window.self == window.top) {
    //window.location.href = "https://www.google.com/";
}
const BlackjackGame = () => {
    const [userData, setUserData] = useState(null);

   
    const [conn, setConn] = useState(true);
    function getCols(reels) {
        var cols = [];
        cols.push([reels[0] - 1, reels[1] - 1, reels[2] - 1]);
        cols.push(reels);
        cols.push([reels[0] + 1, reels[1] + 1, reels[2] + 1]);
        var lines = [];
        lines.push([r1[cols[1][0]], r2[cols[1][1]], r3[cols[1][2]]]);
        lines.push([r1[cols[2][0]], r2[cols[2][1]], r3[cols[2][2]]]);
        lines.push([r1[cols[0][0]], r2[cols[0][1]], r3[cols[0][2]]]);

        lines.push([r1[cols[1][0]], r2[cols[1][1]], r3[cols[2][2]]]);
        lines.push([r1[cols[1][0]], r2[cols[1][1]], r3[cols[0][2]]]);

        lines.push([r1[cols[1][0]], r2[cols[0][1]], r3[cols[0][2]]]);
        lines.push([r1[cols[1][0]], r2[cols[2][1]], r3[cols[2][2]]]);

        lines.push([r1[cols[2][0]], r2[cols[1][1]], r3[cols[1][2]]]);
        lines.push([r1[cols[0][0]], r2[cols[1][1]], r3[cols[1][2]]]);

        lines.push([r1[cols[0][0]], r2[cols[0][1]], r3[cols[1][2]]]);
        lines.push([r1[cols[2][0]], r2[cols[2][1]], r3[cols[1][2]]]);

        lines.push([r1[cols[1][0]], r2[cols[0][1]], r3[cols[1][2]]]);
        lines.push([r1[cols[1][0]], r2[cols[2][1]], r3[cols[1][2]]]);

        lines.push([r1[cols[2][0]], r2[cols[1][1]], r3[cols[2][2]]]);
        lines.push([r1[cols[0][0]], r2[cols[1][1]], r3[cols[0][2]]]);
        var winX = 0;
        var line = $("#lineval").text();
        lines.map(function (x, i) {
            if (i < line) {
                if (x[0] == x[1] && x[1] == x[2]) {
                    if (x[0] == 6) {
                        winX = winX + rewardsList[0];
                    }
                    if (x[0] == 5) {
                        winX = winX + rewardsList[1];
                    }
                    if (x[0] == 4) {
                        winX = winX + rewardsList[2];
                    }
                    if (x[0] == 3) {
                        winX = winX + rewardsList[3];
                    }
                    if (x[0] == 2) {
                        winX = winX + rewardsList[4];
                    }
                    if (x[0] == 1) {
                        winX = winX + rewardsList[5];
                    }
                    if (x[0] == 0) {
                        winX = winX + rewardsList[6];
                    }
                } else if (x[0] == x[1] && x[1] == 0) {
                    winX = winX + rewardsList[7];
                } else if (x[0] == 0) {
                    winX = winX + rewardsList[8];
                }
            }
        });
        setTimeout(() => {
            var bet = parseFloat($("#betval").text());

            //console.log(winX);

            $("#totalwin").attr("data-count", winX * bet);
            animateNum();
            lines.map(function (x, i) {
                if (i < line) {
                    if (x[0] == x[1] && x[1] == x[2]) {
                        $(".lines").addClass("win");
                        $(".l" + (i + 1)).show();

                        $(".lr" + x[0])
                            .eq(0)
                            .addClass("win");
                    } else if (x[0] == x[1] && x[1] == 0) {
                        $(".lines").addClass("win");
                        $(".l" + (i + 1)).show();

                        $(".lr" + x[0])
                            .eq(1)
                            .addClass("win");
                    } else if (x[0] == 0) {
                        $(".lines").addClass("win");
                        $(".l" + (i + 1)).show();

                        $(".lr" + x[0])
                            .eq(2)
                            .addClass("win");
                    }
                }
            });
        }, 3700);

        //console.log(reels, cols, lines);

        // generate random number smaller than 13 then floor it to settle between 0 and 12 inclusive
        var seed = Math.floor(Math.random() * 12);
        seed = seed + 1;

        return seed;
    }
    function spin() {
        $("#totalwin").attr("data-count", 0);
                animateNum();
                $(".lines img").hide();
                $("#dark-overlay").addClass("curplayer");
                $("button").addClass("disabled");

                $(".win").removeClass("win");
        var line = $("#lineval").text();
        var bet = parseFloat($("#betval").text());
        const payLoad = {
            method: "spin",
            line: line,
            bet: bet,
        };
        try {
            socket.send(JSON.stringify(payLoad));
        } catch (error) {}
    }
    useEffect(() => {
        // Event onopen baraye vaghti ke websocket baz shode
        $("body").css("background", "radial-gradient(rgb(32 32 32), rgb(239 182 29))");
        socket.onopen = () => {
            console.log("WebSocket connected");
        };

        // Event onmessage baraye daryaft data az server
        socket.onmessage = (event) => {
            const data = JSON.parse(event.data); // Parse kardan JSON daryafti
            //console.log("Game data received: ", data);
            if (data.method == "spin") {
                $("#totalwin").attr("data-count", 0);
                animateNum();
                $(".lines img").hide();
                $("#dark-overlay").addClass("curplayer");
                $("button").addClass("disabled");

                $(".win").removeClass("win");

                var seeds = data.reels;
                for (var i = 1; i < 4; i++) {
                    var seed = seeds[i - 1];
                    var org = (seed - 1) * -180;
                    var _top = org - 62 * 180;

                    $(".r" + i)
                        .removeClass("freez")
                        .attr("data-help", org)
                        .css("top", "" + _top + "px");
                }
                getCols(seeds);
                setTimeout(() => {
                    for (var i = 1; i < 4; i++) {
                        $(".r" + i);
                        var _top = $(".r" + i)
                            .addClass("freez")
                            .attr("data-help");

                        $(".r" + i).css("top", "" + _top + "px");
                    }

                    $("#dark-overlay").removeClass("curplayer");
                    setTimeout(() => {
                        $("button").removeClass("disabled");
                        if($("#autospin").is(":checked")){
                            setTimeout(() => {
                                $(".go").trigger("click");
                            }, 2000);
                        }
                    }, 500);
                    
                
                }, 3500);
            }
            if (data.method == "connect") {
                if (data.theClient?.balance >= 0) {
                    setUserData(data.theClient);
                    animateNum()
                } else {
                    setUserData(data.theClient);
                    // setConn(false);
                    //_auth = null;
                    animateNum()
                }
                // Update kardan state
            }
        };

        // Event onclose baraye vaghti ke websocket baste mishe
        socket.onclose = () => {
            console.log("WebSocket closed");
            setConn(false);
            _auth = null;
        };
        setTimeout(() => {
            $('.fload').remove()
            AppOrtion();

            $(".go").removeClass('disabled').on("click", function () {
                spin();
            });
        }, 1500);
        // Cleanup websocket dar zamane unmount kardan component
        return () => {
            // socket.close();
        };
    
       
    }, []);

    if (_auth == null || !conn || !userData) {
       // return <>hi</>
        return <Loaderr errcon={!userData ? false : true} />;
    }

    return (
        <>
        <span className="fload"><Dimmer active>
            
                <Loader size="huge" />
            
        </Dimmer></span>
            <span id="dark-overlay"></span>
            <div>
                <div className="game-room" id="scale">
                    <div className="flex">
                        <div className="box">
                            <Controls balance={userData.balance} animateNum={animateNum} />
                        </div>
                        <div className="box">
                            <Reels  />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BlackjackGame;
