import React from "react";
import { Image, Segment } from "semantic-ui-react";
/* 
for (let index = 1; index <= 2; index++) {
    rewardsList.push(6);
}
for (let index = 1; index <= 3; index++) {
    rewardsList.push(5);
}
for (let index = 1; index <= 4; index++) {
    rewardsList.push(4);
}
for (let index = 1; index <= 8; index++) {
    rewardsList.push(3);
}
for (let index = 1; index <= 11; index++) {
    rewardsList.push(2);
}
for (let index = 1; index <= 14; index++) {
    rewardsList.push(1);
}
for (let index = 1; index <= 20; index++) {
    rewardsList.push(0);
}
//console.log(rewardsList);

function shuffle(array) {
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
        // Pick a remaining element...
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
} */
//shuffle(rewardsList);
var r1 = [5, 1, 0, 1, 4, 2, 2, 4, 2, 0, 3, 0, 0, 3, 0, 3, 1, 1, 0, 0, 2, 1, 0, 1, 0, 2, 1, 0, 2, 0, 3, 0, 0, 5, 2, 1, 2, 1, 0, 6, 2, 1, 1, 2, 1, 2, 3, 4, 4, 6, 3, 1, 0, 3, 0, 0, 5, 0, 0, 0, 3, 1];
var r2 = [0, 4, 4, 2, 3, 0, 1, 3, 3, 1, 2, 0, 3, 0, 6, 2, 1, 0, 1, 1, 0, 1, 0, 2, 0, 0, 4, 0, 3, 0, 1, 5, 4, 1, 5, 1, 1, 2, 0, 0, 3, 0, 1, 0, 2, 0, 0, 3, 0, 2, 2, 2, 6, 0, 1, 5, 2, 2, 1, 0, 1, 3];
var r3 = [1, 3, 0, 0, 4, 4, 1, 0, 1, 2, 1, 0, 2, 0, 0, 0, 3, 6, 4, 0, 4, 0, 6, 5, 1, 0, 3, 2, 5, 3, 0, 0, 0, 1, 0, 2, 1, 1, 1, 1, 2, 0, 1, 3, 3, 0, 3, 1, 0, 0, 0, 1, 2, 2, 0, 5, 3, 1, 2, 2, 2, 2];

const Reel = ({ reel }) =>
    r1.map(function (x, i) {
        return (
            <div className="reel" key={i}>
                <Image src={"/imgs/icons/" + reel[i] + ".png"} />
            </div>
        );
    });
const Lines = () => (
    <div className="lines">
        <Image className="l1" src={"/imgs/lines/1.png"} />
        <Image className="l2" src={"/imgs/lines/2.png"} />
        <Image className="l3" src={"/imgs/lines/3.png"} />
        <Image className="l4" src={"/imgs/lines/4.png"} />
        <Image className="l5" src={"/imgs/lines/5.png"} />
        <Image className="l6" src={"/imgs/lines/6.png"} />
        <Image className="l7" src={"/imgs/lines/7.png"} />
        <Image className="l8" src={"/imgs/lines/8.png"} />
        <Image className="l9" src={"/imgs/lines/9.png"} />
        <Image className="l10" src={"/imgs/lines/10.png"} />
        <Image className="l11" src={"/imgs/lines/11.png"} />
        <Image className="l12" src={"/imgs/lines/12.png"} />
        <Image className="l13" src={"/imgs/lines/13.png"} />
        <Image className="l14" src={"/imgs/lines/14.png"} />
        <Image className="l15" src={"/imgs/lines/15.png"} />
    </div>
);
const ShowReels = ({ reel }) => (
    <>
        <Reel reel={reel} />
        <Reel reel={reel} />
       
    </>
);

const Reels = () => (
    <Segment inverted className="reels">
        <div className="glass">
             <div className="flexreels r1" style={{ top: 0 }}>
            <ShowReels reel={r1} />
        </div>
        </div>
        <div className="glass">
        <div className="flexreels r2" style={{ top: 0 }}>
            <ShowReels reel={r2} />
        </div></div>
        <div className="glass">
        <div className="flexreels r3" style={{ top: 0 }}>
            <ShowReels reel={r3} />
        </div></div>
        <Lines />
    </Segment>
);

export default Reels;
