// React Imports
import React, { Component } from 'react';
// Globals
// Modules && General Components
import { Button , ButtonGroup } from 'react-bootstrap';
// Component Specfic Imports
// Styles
// Documentation/Notes
class RadioGroup extends Component {
	render() {
		const { disabled, name, onChange, options, value, ...props } = this.props;
		return (
			<ButtonGroup {...props}>
				{options.map(option =>
					<Button
						key={option[0]}
						bsStyle={option[0] === value ? 'success' : 'default'}
						children={option[1]}
						disabled={disabled}
						name={name}
						onClick={onChange}
						value={option[0]}
					/>
				)}
			</ButtonGroup>
		)
	}
}

export default RadioGroup