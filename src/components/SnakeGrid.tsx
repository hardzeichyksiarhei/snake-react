import React from 'react'


interface IProps {
    children: React.ReactNode,
    rows: number,
    cols: number
}

const SnakeGrid = (props: IProps) => {
    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${props.cols}, 1fr)`,
            gridTemplateRows: `repeat(${props.rows}, 1fr)`
        }} className="snake-grid">
            {props.children}
        </div>
    )
}

export default SnakeGrid