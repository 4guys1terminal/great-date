import React, { Component } from 'react';

// TODO: remove react-bootstrap dependencies
import { Button , ButtonGroup } from 'react-bootstrap';

//TODO: update
// import RadioGroup from '@material-ui/core/RadioGroup';
// import Radio from '@material-ui/core/Radio';


class RadioGroup extends Component {
	render() {
		const {
			disabled,
			name,
			onChange,
			options,
			value,
			...props
		} = this.props;

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
