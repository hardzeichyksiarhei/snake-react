import React, { useState, useEffect } from 'react';
import useInterval from '@use-it/interval';

import './Snake.sass'
import { Button, ButtonGroup } from '@material-ui/core';
import useKeyPress from '../hooks/useKeyPress';
import SnakeGrid from './SnakeGrid';
import SnakeCell from './SnakeCell';

interface ISnake {
    x: number,
    y: number
}

interface IDirection {
    x: number,
    y: number
}

interface IDirections {
    UP: IDirection,
    DOWN: IDirection,
    LEFT: IDirection,
    RIGHT: IDirection
}

interface IFood {
    x: number,
    y: number
}

const DIRECTIONS: IDirections = {
    UP: { x: 0, y: -1 },
    DOWN: { x: 0, y: 1 },
    LEFT: { x: -1, y: 0 },
    RIGHT: { x: 1, y: 0 }
}

const createAndValidateFood = (snake: ISnake[], row: number, col: number): IFood => {
    let food: IFood = {
        x: 0,
        y: 0
    }
    do {
        food.x = Math.floor(Math.random() * col)
        food.y = Math.floor(Math.random() * row)
    } while (snake.findIndex(segment => segment.x === food.x && segment.y === food.y) !== -1)

    return food
}

const createDefaultSnake = (row: number, col: number): ISnake[] => {
    const snakeHead: ISnake = {
        x: Math.floor(row / 2),
        y: Math.floor(col / 2)
    }
    
    return [
        snakeHead,
        { x: snakeHead.x, y: snakeHead.y - 1 },
        { x: snakeHead.x, y: snakeHead.y - 2 }
    ]
}

const createGrid = (rows: number, cols: number) => {
    let grid = []
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            grid.push({ x: col, y: row })
        }
    }
    return grid
}

const Snake = (props: { row: number; col: number } = { row: 12, col: 12 }) => {
    let [isGaming, setIsGaming] = useState(false)
    let [delay, setDelay] = useState<number | null>(100)

    let [grid, setGrid] = useState(() => createGrid(props.row, props.col))

    let [snake, setSnake] = useState(() => createDefaultSnake(props.row, props.col))
    
    let [food, setFood] = useState(() => createAndValidateFood(snake, props.col, props.row))

    let [direction, setDirection] = useState({
        text: 'DOWN',
        ...DIRECTIONS.DOWN
    })

    const isSnake = (x: number, y: number): boolean => {
        return snake.findIndex(coord => coord.x === x && coord.y === y) !== -1
    }

    const isSnakeHead = (x: number, y: number): boolean => {
        const [head] = snake
        return x === head.x && y === head.y
    }

    const isFood = (x: number, y: number): boolean => {
        return x === food.x && y === food.y
    }

    const isToEat = (x: number, y: number): boolean => {
        return x === food.x && y === food.y
    }

    const limitByRow = (y: number): number => {
        if (y >= props.row) return 0
        if (y < 0) return props.row - 1
        return y
    }

    const limitByCol = (x: number): number => {
        if (x >= props.col) return 0
        if (x < 0) return props.col - 1
        return x
    }

    const newSnakePosition = (oldSnake: ISnake[]): ISnake[] => {
        const [head] = oldSnake
        const newHead: ISnake = {
            x: limitByCol(head.x + direction.x),
            y: limitByRow(head.y + direction.y)
        }
        if (isToEat(newHead.x, newHead.y)) {
            setFood(_ => createAndValidateFood(snake, props.col, props.row))
            setDelay(oldDelay => {
                if (oldDelay && oldDelay >= 20) return oldDelay - 2
                return oldDelay
            })
            return [newHead, ...oldSnake]
        }
        return [newHead, ...oldSnake.slice(0, -1)]
    }

    let [head, ...tail] = snake
    const is_losing = () => tail.findIndex(segment => segment.x === head.x && segment.y === head.y) !== -1

    useInterval(() => {
        if (!isGaming) return
        if (is_losing()) {
            alert("Losing...")
            setDelay(null)
            refreshGame()
            return
        }
        setSnake(oldSnake => newSnakePosition(oldSnake))
    }, delay)

    const pressUp = useKeyPress('ArrowUp');
    const pressDown = useKeyPress('ArrowDown');
    const pressLeft = useKeyPress('ArrowLeft');
    const pressRight = useKeyPress('ArrowRight');

    useEffect(() => {        
        if (pressUp && direction.text !== 'DOWN') setDirection({ text: 'UP', ...DIRECTIONS.UP })
        if (pressDown && direction.text !== 'UP') setDirection({ text: 'DOWN', ...DIRECTIONS.DOWN })
        if (pressLeft && direction.text !== 'RIGHT') setDirection({ text: 'LEFT', ...DIRECTIONS.LEFT })
        if (pressRight && direction.text !== 'LEFT') setDirection({ text: 'RIGHT', ...DIRECTIONS.RIGHT })
    }, [pressUp, pressDown, pressLeft, pressRight])

    const startGame = () => { setIsGaming(true) }
    const stopGame = () => { setIsGaming(false) }
    const refreshGame = () => {
        setIsGaming(false)
        setGrid(() => createGrid(props.row, props.col))
        setSnake(() => createDefaultSnake(props.row, props.col))
        setDelay(100)
        setDirection({ text: 'DOWN', ...DIRECTIONS.DOWN })
        setFood(() => createAndValidateFood(snake, props.row, props.col))
    }

    useEffect(refreshGame, [props.row, props.col])

    return (
        <div className="snake-wrapper">
            <SnakeGrid rows={props.row} cols={props.col}>
                {
                    grid.map(({ x, y }) => {
                        return <SnakeCell key={`${x}-${y}`} isSnake={isSnake(x, y)} isSnakeHead={isSnakeHead(x, y)} isFood={isFood(x, y)}></SnakeCell>;
                    })
                }
            </SnakeGrid>
            <ButtonGroup variant="contained" color="primary" aria-label="text primary button group">
                <Button onClick={startGame} disabled={isGaming}>
                    Start Game
                </Button>
                <Button color="secondary" onClick={stopGame} disabled={!isGaming}>
                    Stop Game
                </Button>
                <Button color="default" onClick={refreshGame}>
                    Refresh Game
                </Button>
            </ButtonGroup>
        </div>
    );
}

export default Snake;