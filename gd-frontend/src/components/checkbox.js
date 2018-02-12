import React, { Component } from 'react';
import '../App.css';
import { Checkbox } from 'react-bootstrap';

class CheckboxComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            isChecked: 'false'
        }
    }

    toggleCheckboxChange= () =>{
        const { handleCheckboxChange, tagId } = this.props;

        this.setState(({ isChecked }) => (
        {
            isChecked: !isChecked,
        }
        ));

        handleCheckboxChange(tagId);
    }


    render() {
        const { tagTitle, tagId } = this.props;

        return (

            <Checkbox inline
                type="checkbox"
                name={tagTitle}
                value={tagId}
                onChange={this.toggleCheckboxChange}>
                    {tagTitle}
            </Checkbox>

        );
    }
}

export default CheckboxComponent;
