import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import M1 from "asserts/img/m1.svg";
import InImg from "asserts/img/infinity.svg";
import NumberFormat from 'react-number-format';


interface BProps {
    title: string,
}

const BetValueInfinity = React.forwardRef(({ title }: BProps, ref) => {
    const [val, setVal] = useState<number>(1);
    const [isInfi, setInfi] = useState<boolean>(false);
    const [hold2, setHold2] = useState<boolean>(false);
    const [HTime2, setHTime2] = useState<boolean>(false);

    useEffect(() => {
        if (isInfi) {
            ref.current = { number: Infinity };
        } else {
            ref.current = { number: val }
        }
    })

    useEffect(() => {
        if (hold2 && HTime2) {
            if (val > 1) {
                setTimeout(() => {
                    setVal(val - 1);
                }, 100);
            } else {
                setVal(0);
            }

        }
    }, [val]);

    useEffect(() => {
        if (hold2) {
            if (HTime2)
                setVal(val - 1);
            else {
                setHold2(false);
            }
        }
    }, [hold2]);

    useEffect(() => {
        if (HTime2)
            setTimeout(() => {
                if (HTime2) {
                    setHold2(true);
                }
            }, 500);
    }, [HTime2])

    return <BV >
        <div className="bv_title">{title}</div>
        <div className="bv_value">
            <div
                className="bv_bt"
                onMouseDown={() => {
                    setHTime2(true);
                }}
                onMouseUp={() => {
                    if (val <= 1) {
                        setVal(0)
                    } else {
                        setVal(val - 1)
                    }
                    setHTime2(false);
                    setHold2(false);
                }}
            >
                <img src={M1} alt="" />
            </div>
            <div className="bv_number">
                <div
                    onClick={() => { setInfi(false); setVal(1) }}
                    className={isInfi ? "infi_value" : "infi_value infi_value_hidden"}
                >
                    <img src={InImg} alt="" />
                </div>
                <NumberFormat
                    value={val}
                    thousandSeparator={true}
                    onValueChange={(values) => {
                        setVal(values.floatValue);
                    }}
                    decimalScale={0}
                    isAllowed={({ floatValue }) => floatValue >= 1}
                    style={{ width: `${10 * (val.toString().length)}px`, minWidth: "20px" }}
                />
            </div>

            <div className="bv_bt" onClick={() => { setInfi(true) }}>
                <img src={InImg} alt="" />
            </div>
        </div>
    </BV>
})

export default BetValueInfinity;

const BV = styled.div`
    width: 47%;
    height: 80px;
    display: flex;
    flex-direction: column;
    .bv_title {
        color: #798FA6;
        height: 40px;
        line-height: 40px;
    }
    .bv_value {
        width: 100%;
        height: 40px;
        background-color: #293245;
        border: 1px solid #45617E;
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .bv_number {
            display: flex;
            justify-content: center;
            align-items: center;
            flex:1;
            height: 24px;
            max-width: 70%;
            position: relative;
            img {
                margin-right: 6px;
            }
            input {
                background-color: transparent;
                border: none;
                outline: none;
                font: normal normal bold 16px/19px Helvetica;
                color: #FFFFFF;
                resize: horizontal;
                padding: 0;
            }
            .infi_value {
                position: absolute;
                z-index: 2;
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: #293245;
                img {
                    object-fit: contain;
                    width: 100%;
                    height: 60%;           
                }
            }
            .infi_value_hidden {
                display: none;
            }
        }   
        .bv_bt {
            padding: 0 15px;
            cursor: pointer;
            height: 100%;
            display: flex;
            align-items: center;
        }
    }
`