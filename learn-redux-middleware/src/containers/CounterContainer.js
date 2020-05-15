import React from 'react';
import {connect} from 'react-redux';
import Counter from '../components/Counter';
import {increaseAsync ,decreaseAsync} from '../modules/counter';
//import {increase,decrease} from '../modules/counter';

const CounterContainer = ({number,increaseAsync,decreaseAsync}) => {
    return (
        <div>
            <Counter number={number} onIncrease={increaseAsync} onDecrease={decreaseAsync}/>
        </div>
    );
};

export default connect(
    state => ({
        number: state.counter
    }),
    {
        increaseAsync,
        decreaseAsync
    }
)(CounterContainer);