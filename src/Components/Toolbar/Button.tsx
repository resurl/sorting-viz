import React from 'react'

interface Props {
    behaviour: string,
    clickCallback: Function
}

export default class Button extends React.Component<Props,{}> {
    constructor(props: any) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(e: any) {
        this.props.clickCallback()
    }


    render() {
        const behaviour = this.props.behaviour
        return (
            <button className='Button' onClick={this.handleClick}>
                {behaviour}
            </button>
        )
    }
}
