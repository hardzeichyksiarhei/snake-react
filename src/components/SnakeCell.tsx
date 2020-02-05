import React from 'react'
import classNames from 'classnames';

interface IProps {
    isSnake: boolean,
    isSnakeHead: boolean,
    isFood: boolean
}

const SnakeCell = (props: IProps) => {
    return (
        <div className={classNames({
            'snake-cell': true,
            'snake-cell--snake': props.isSnake,
            'snake-cell--snake-head': props.isSnakeHead,
            'snake-cell--food': props.isFood
        })}></div>
    )
}

export default SnakeCell