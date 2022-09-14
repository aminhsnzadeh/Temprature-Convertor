import React from "react";
import './style.css'

function toC(fa) {
    return(fa - 32) * 5 / 9
}
function toF(ce) {
    return(ce * 9 / 5) + 32
}
function converting(temp, convert) {
    const input = parseFloat(temp)
    if(Number.isNaN(input)) {
        return ''
    }
    const output = convert(input)
    const rounding = Math.round(output * 1000) / 1000
    return rounding.toString()
}
// alert(converting('100', toF)) testing to F
// alert(converting('212', toC)) testing to C
function IsBoilding(props) {
    if(props.temp >= 100) {
        return(<p style={{animationName : 'shake', animationIterationCount : 'infinite', animationDuration: '0.4s'}}><span style={{color: '#fa2828'} } className="bi-cup-hot"></span>Water is about to Boil.<span style={{color: '#fa2828'} } className="bi-cup-hot"></span></p>)
    } else {
        return(<p><span style={{color : '#286afa'}} className="bi-droplet-fill"></span>Water is not about to Boil.</p>)
    }
}

const scales = {
    c: 'Celsius',
    f: 'Fahrenheit'
}

class TempInputs extends React.Component {
    constructor(props) {
        super(props)
        this.handleTemp = this.handleTemp.bind(this)
    }
    handleTemp(e) {
        this.props.onTempChange(e.target.value)
    }
    render() {
        const scaleName = this.props.scale
        const tempVal = this.props.val

        return(
            <div className="temp" id={scales[scaleName].toLowerCase()}>
                <h2>The temperature in <span style={{textDecoration : 'underline'}}>{scales[scaleName]}</span> :</h2>
                <input type="text" value={tempVal} onChange={this.handleTemp} />
                <span>{tempVal} {this.props.icon}</span>
            </div>
        )
    }
}

export default class Calculate extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            temp : '',
            scale : 'c',
            degs : {
                c : [0, 25, 50, 75, 100],
                f : [32, 77, 122, 167, 212]
            }
        }
        this.handleC = this.handleC.bind(this)
        this.handleF = this.handleF.bind(this)
    }
    handleC(temp) {
        this.setState({temp : temp, scale : 'c'})
    }
    handleF(temp) {
        this.setState({temp : temp, scale : 'f'})
    }
    render() {
        const finalTemp = this.state.temp
        const faTemp = this.state.scale === 'c' ? converting(finalTemp, toF) : finalTemp
        const ceTemp = this.state.scale === 'f' ? converting(finalTemp, toC) : finalTemp
        let color , heights, anime
        if(ceTemp >= 25) {
            color = '#fa2828';
        } else {
            color = '#286afa';
        }
        if (ceTemp >= 100) {
            heights = 100
            anime = 'shake'
        } else {
            heights = ceTemp
        }
        const fdegs = this.state.degs.f.map((content, index) => <span key={index}>{content}</span>)
        const cdegs = this.state.degs.c.map((content, index) => <span key={index}>{content}</span>)
        return(
            <section className="calculator">
                <div className="glass" style={{animationName : anime}}>
                    <div className="num right">{fdegs}</div>
                    <div className="num left">{cdegs}</div>
                    <div className="circle" style={{backgroundColor: color}}></div>
                    <div className="meter" style={{height : heights + '%', backgroundColor: color }}></div>
                </div>
                <TempInputs onTempChange={this.handleC} icon='C' val={ceTemp} scale='c' />
                <TempInputs onTempChange={this.handleF} icon='F' val={faTemp} scale='f' />
                <IsBoilding temp={parseFloat(ceTemp)} />
            </section>
        )
    }
}



