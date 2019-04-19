// React Imports
import React from 'react';
import { Link } from 'react-router-dom';

// Modules && General Components
import {
	Card,
	CardMedia,
	CardContent,
	CardActions,
	Typography,
	IconButton
} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';

// Styles
import '../../../App.scss';
import './date-card.scss';

// TODO: add PropTypes

const DateCard = props => {
	const {
		id,
		title,
		imageName,
		location
	} = props.activity;

	return (
		<div className="date-card hvr-grow-shadow">
				<Link to={`/activities/${id}`}>
					<Card>
						<CardMedia
							image={imageName}
							title={`Date Image ${id}`}
							className="card-image"
						/>
						<CardContent className="card-content">
							<div className="top-content">
								<div className="title-div">
									<Typography variant="h4" gutterBottom>{title}</Typography>
								</div>

								{/* Hard coded for now */}
								<Typography variant="h3" className="cost-icon">$$$</Typography>
							</div>

							<Typography className="location" variant="h5" gutterBottom>Location: {location}</Typography>

							{/* <Typography className="created-by" variant="h6">Created By: <i>jordanj</i></Typography> */}

							<CardActions className="card-actions">
								<IconButton aria-label="Add to favorites">
									<FavoriteIcon />
								</IconButton>
								<span>42</span>
								<IconButton aria-label="Share">
									<ShareIcon />
								</IconButton>
								<IconButton className="more-btn" aria-label="More Details">
									<MoreVertIcon />
								</IconButton>
							</CardActions>
						</CardContent>
					</Card>
				</Link>
		</div>
	)
}

export default DateCard;
