import React from 'react'

function initBar(value: number, anim: string): object {
    const barHeight: number = value/10;
    return ({
        height: barHeight + '%',
        backgroundColor: anim,
        width: '100%',
        margin: '0 0%',
        borderRadius: '0.5em 0.5em 0 0'
    });
}

interface DataProperty {
    value: number,
    animation: string
}

export default function Bar(props: DataProperty) {
    const { value, animation } = props

    return (
        <div className="Bar" style={initBar(value,animation)}></div>
    );
}