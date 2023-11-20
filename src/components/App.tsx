import React, {useState} from 'react';
import classes from './App.module.scss'
import {Link, Outlet} from "react-router-dom";
import labelProps from '@/assets/labelProps.png'
import mem from '@/assets/mem.jpg'
import Arrow from '@/assets/arrow.svg'

export const App = () => {
    const [count, setCount] = useState<number>(0);
    const inc = () => setCount(prev => prev + 1)

    // if(__ENV_MODE === 'development') {
    //     return (
    //         <div>Этот код будет только при разработке и не попадет в финальную сборбу</div>
    //     )
    // }


    //если ее не вызвать - webpack выбросит ее из бандла
    const treeShaking = (a: number) => {
        console.log('Tree shaking')
        return a
    }

    const todo = () => {
        todo2()
    }

    const todo2 = () => {
        throw new Error('todo2')
    }

    return (
        <>
            <div data-testid={'title'}>
                Hello world!
            </div>

            <p data-testid={'platform'}>Platform {__PLATFORM}</p>

            {/*<span>{treeShaking(5)}</span>*/}

            <div>
                <img src={labelProps} alt="labelProps" width={500}/>
                <br/>
                <img src={mem} alt="labelProps" width={200}/>
                <br/>
                {/*<img src={arrow} alt="labelProps"/>*/}
                <Arrow style={{color: 'red'}} width={50} height={50}/>
            </div>

            <br/>
            <Link to={'/about'}>About</Link>
            <br/>
            <Link to={'/shop'}>Shop</Link>
            <div className={classes.value}>{count}</div>
            <button className={classes.button} onClick={inc}>+1</button>
            <button className={classes.button} onClick={todo}>Error</button>
            <Outlet/>
        </>
    );
};


