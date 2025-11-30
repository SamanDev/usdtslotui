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
            <List divided inverted verticalAlign="middle" size="huge">
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
                                <ListHeader className="counter" data-count={parseFloat(x * bet).toFixed(2)}></ListHeader>
                            </ListContent>
                        </ListItem>
                    );
                })}
            </List>
        </Segment>
    );
};



const GetControls = ({ balance, animateNum, doCurrency }) => {
    const [line, setLine] = useState(15);
    const [bet, setBet] = useState(0.1);
    useEffect(() => {
        animateNum();
    }, [bet, line]);
    useEffect(() => {
        $(".lines img").hide();
        for (let i = 1; i <= line; i++) {
            $(".l" + i).show();
        }
    }, [line]);
    return (
        <>
            <Segment inverted>
                <div className="balance">
                    <Label image size="huge" color="black">
                        <span className="counter" data-count={balance}></span>
                        <LabelDetail>Balance</LabelDetail>
                    </Label></div>
                <div className="flexcontrol">

                    <div className="boxcontrol">
                        <Label image size="huge" color="teal">
                            <span className="counter" data-count={bet * line}></span>
                            <LabelDetail>Bet</LabelDetail>
                        </Label>
                    </div>
                    <div className="boxcontrol">
                        <Label image size="huge" color="red">
                            <span className="counter" id="totalwin"  data-count={0}></span>
                            <LabelDetail>Win</LabelDetail>
                        </Label>
                    </div>
                </div>

                <Rewards bet={bet} />
                <Button className="go" color="orange" size="huge" fluid disabled={bet * line > balance ? true : false}>
                    Start Spinning...
                </Button>
                <Checkbox label='AUTO SPIN' id="autospin" className="auto" />

            </Segment>
            <div className="flexcontrol bottomControll">
                <div className="boxcontrol">
                    <LinesButtons valFunc={line} setFunc={setLine} valSum={1} min={1} max={15} text="Line" color="olive" id="lineval"/>

                </div>
                <div className="boxcontrol">
                    <LinesButtons valFunc={bet} setFunc={setBet} valSum={0.1} min={0.1} max={0.1 * 100} text={"Bet"} color="purple" id="betval" />
                   
                </div>
            </div>
        </>
    );
};
const LinesButtons = ({ setFunc, valFunc, valSum,min, max, text,color,id }) => (
<>
<ButtonGroup size="huge" color={color}>
    <Button  icon='minus' disabled={valFunc <= valSum ? true : false} onClick={() => setFunc(valFunc - valSum)}/>
    <Button basic inverted  color={color}  onClick={() => setFunc(valFunc >= max?min:max)} >{text}: <span className="counter" data-count={valFunc} data-sign={text=='Line'?true:false}></span> <span id={id} style={{ display: 'none' }}>{valFunc}</span></Button>
    <Button icon='plus' disabled={valFunc >= max ? true : false} onClick={() => setFunc(valFunc + valSum)} />
  </ButtonGroup>
</>
    

);
export default GetControls;
