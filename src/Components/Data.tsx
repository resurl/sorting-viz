import React from 'react'

function setHeight(value: number): object {
    const barHeight: number = value/10;
    return ({
        height: barHeight + '%'
    });
}

interface Property {
    value: number;
}

export default function Data(props: Property) {
    const { value } = props

    return (
        <div className="Data" style={setHeight(value)}>{value}</div>
    );
}