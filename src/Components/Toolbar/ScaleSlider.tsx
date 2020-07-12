import React from 'react'

interface Props {
    onScaleChange: Function,
    value: number
}


export default class ScaleSlider extends React.Component<Props,{}> {
    constructor(props: any) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e: any) {
        this.props.onScaleChange(e.target.value)
    }

    render() {
        const value = this.props.value 

        return (
            <div className="ScaleSlider">
                <input type='range' 
                    min='5' 
                    max='150' 
                    className='slider'
                    onChange={this.handleChange}
                    />
                <p>{value}</p>
            </div>
        )
    } 
}
