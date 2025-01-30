import React, { useState, useEffect } from "react";
import { Checkbox, Segment, Label, LabelDetail, ButtonGroup, Button, ListItem, ListHeader, ListContent, Image, List } from "semantic-ui-react";
import $ from "jquery";

const rewardsListCount = [300, 100, 50, 20, 10, 5, 3, 2, 1];

const rewardsListIcon = [
    [6, 6, 6],
    [5, 5, 5],
    [4, 4, 4],
    [3, 3, 3],
    [2, 2, 2],
    [1, 1, 1],
    [0, 0, 0],
    [0, 0, "any"],
    [0, "any", "any"],
];
const Rewards = ({ bet }) => {
    return (
        <Segment inverted className="rewardlist">
            <List divided inverted verticalAlign="middle">
                {rewardsListCount.map(function (x, i) {
                    return (
                        <ListItem key={i} className={"listreward lr" + rewardsListIcon[i][0]}>
                            <Image avatar src={"/imgs/icons/" + rewardsListIcon[i][0] + ".png"} />
                            <Image avatar src={"/imgs/icons/" + rewardsListIcon[i][1] + ".png"} />
                            <Image avatar src={"/imgs/icons/" + rewardsListIcon[i][2] + ".png"} />
                            <ListContent>
                                <ListHeader>x{x}</ListHeader>
                            </ListContent>
                            <ListContent floated="right">
                                <ListHeader className="counter" data-count={x * bet}></ListHeader>
                            </ListContent>
                        </ListItem>
                    );
                })}
            </List>
        </Segment>
    );
};



const GetControls = ({ balance, animateNum }) => {
    const [line, setLine] = useState(15);
    const [bet, setBet] = useState(0.5);
    useEffect(() => {
        animateNum();
    }, [bet,line]);
    useEffect(() => {
        $(".lines img").hide();
        for (let i = 1; i <= line; i++) {
            $(".l" + i).show();
        }
    }, [line]);
    return (
        <Segment inverted>
            <div className="balance">
             <Label image size="huge" color="black">
                        <span className="counter" data-count={balance}></span>
                        <LabelDetail>Balance</LabelDetail>
                    </Label></div>
            <div className="flexcontrol">
                
                <div className="boxcontrol">
                    <Label image size="large"  color="teal">
                        <span className="counter" data-count={bet * line}></span>
                        <LabelDetail>Total Bet</LabelDetail>
                    </Label>
                </div>
                <div className="boxcontrol">
                    <Label image size="large"  color="red">
                        <span className="counter" id="totalwin" data-count={0}></span>
                        <LabelDetail>Total Win</LabelDetail>
                    </Label>
                </div>
            </div>

            <Rewards bet={bet} />
            <Button className="go disabled" color="orange" size="huge" fluid disabled={bet * line> balance?true:false}>
                Start Spinning...
            </Button>
            <Checkbox label='AUTO SPIN' id="autospin" className="auto" />
            <div className="flexcontrol">
                <div className="boxcontrol">
                    <LinesButtons valFunc={line} setFunc={setLine} valSum={1} max={15} />
                    <Label image size="large"  color="olive">
                    <span className="counter notcount" data-count={line}>{line}</span>
                    <span id="lineval" style={{display:'none'}}>{line}</span>
                        <LabelDetail>Line</LabelDetail>
                    </Label>
                </div>
                <div className="boxcontrol">
                    <LinesButtons valFunc={bet} setFunc={setBet} valSum={.5} max={.5 * 20} />
                    <Label image size="large"  color="pink">
                        <span className="counter" data-count={bet}></span>
                        <span id="betval" style={{display:'none'}}>{bet}</span>
                        <LabelDetail>Bet</LabelDetail>
                    </Label>
                </div>
            </div>
        </Segment>
    );
};
const LinesButtons = ({ setFunc, valFunc, valSum, max }) => (
    <ButtonGroup widths="3" style={{ padding:7}}>
        <Button icon="minus" basic color="red" disabled={valFunc <= valSum ? true : false} onClick={() => setFunc(valFunc - valSum)} />
        <Button icon="plus" basic color="green" disabled={valFunc >= max ? true : false} onClick={() => setFunc(valFunc + valSum)} />
        <Button basic inverted content="Max" color="purple" floated="right" disabled={valFunc >= max ? true : false} onClick={() => setFunc(max)} />
    </ButtonGroup>
);
export default GetControls;
