import React, { Component } from 'react';

import { FormControl, FormControlLabel, RadioGroup, Radio } from '@material-ui/core';


class RadioGroupModule extends Component {
	render() {
		const {
			disabled,
			name,
			onChange,
			options,
			value,
			className,
			...props
		} = this.props;

		return (
			<FormControl>
				<RadioGroup
					aria-label={name}
					name={name}
					className={className}
					value={value}
					onChange={onChange}
				>
					{options.map(option => {
						console.log("option", option)
						return <FormControlLabel
							value={option[0]}
							control={<Radio />}
							label={option[1]}
						/>
					})}
				</RadioGroup>
			</FormControl>
		)
	}
}


export default RadioGroupModule
