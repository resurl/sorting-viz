import React from 'react'

interface Props {
    onAlgoChange: Function,
    algo: number
}

export default function AlgorithmSelect(props: Props) {
    const {onAlgoChange, algo} = props

    const handleChange = (e: any) => {
        onAlgoChange(e.target.value)
    }

    return (
        <select value={algo} className='AlgoSelect' onChange={handleChange}>
            <option className='AlgoSelect_op' value='0'>Insertion</option>
            <option className='AlgoSelect_op' value='1'>Merge</option>
            <option className='AlgoSelect_op' value='2'>Quick</option>
        </select>

    )
}
