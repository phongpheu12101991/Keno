import React from 'react';
import styled from 'styled-components';
import { Route } from 'react-router-dom';
import Keno from 'components/games/keno';

interface BProps {

}

const Body = ({ }: BProps) => {
    return <BD>
        <Route path="/" render={() => <Keno />} />
    </BD>
}

export default Body;


const BD = styled.div`
    width: 100%;
    height: fit-content;
    background-color: #242938;
    padding-top: 70px;
    @media screen and (max-width: 700px) {
        padding-top: 0;
    }
`
