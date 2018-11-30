import React, { Component } from 'react';

export default class FormInput extends Component {
	constructor(props) {
		super(props)
		this.state = {
			type: this.props.type || 'text'
		}
	}

	render() {
		//must use an if statement that runs the function only if errors exist. otherwise the page won't render because errors do not exist.
		if (this.props.errors) {
			var passError = this.props.errors;
			var errorList = passError.map(function (el, i) {
				return <li key={i}> {el} </li>
			})
		}

		return (

			<div className={`form-group ${this.props.errors && 'has-error'}`}>
				<label
					htmlFor={this.props.name}
					className='control-label'
				>
					{this.props.label}
				</label>
				<input
					type={this.state.type}
					name={this.props.name}
					value={this.props.value}
					onChange={this.props.onChange}
					className='form-control'
				/>

				{this.props.errors &&
					<div className='help-block'>
						<ul>
							{errorList}
						</ul>
					</div>
				}
			</div>
		)
	}
}
