import React, {Component} from 'react';
import '../App.css';
import {Button} from 'react-bootstrap';

class DateGenerator extends Component {
    render() {
        return (<div className='date-generator'>
            <h1>
                Date Generator
            </h1>

            {/* <div className='cost-chooser'>

                <div className='individual-costs'>
                    <i class="cost-icons fa-3x fas fa-dollar-sign"></i>
                </div>

                <div className='individual-costs'>

                    <i class="cost-icons fa-3x fas fa-dollar-sign"></i>
                    <i class="cost-icons fa-3x fas fa-dollar-sign"></i>
                </div>

                <div className='individual-costs'>
                    <i class="cost-icons fa-3x fas fa-dollar-sign"></i>
                    <i class="cost-icons fa-3x fas fa-dollar-sign"></i>
                    <i class="cost-icons fa-3x fas fa-dollar-sign"></i>
                </div>

            </div> */}
            <br/>

        <Button onClick={this.props.onClick} className='date-btn' bsSize="large">Shuffle</Button>
        </div>);
    }
}

export default DateGenerator;
