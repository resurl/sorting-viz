import React from 'react'

function setHeight(value: number): object {
    const barHeight: number = value/10;
    return ({
        height: barHeight + '%'
    });
}

interface DataProperty {
    value: number,
    isCursor?: boolean, 
    isCompared?: boolean,
    isSorted?: boolean
}

export default function Data(props: DataProperty) {
    const { value } = props

    return (
        <div className="Data" style={setHeight(value)}>{value}</div>
    );
}