// React Imports
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Modules && General Components
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';

// Styles
import '../../../App.scss';
import './date-preview.scss';


class DatePreview extends Component {
    render() {
        const { id, title, image } = this.props;

        return (
            <div className="date-card hvr-grow-shadow">
                <li className="date-preview cell" key={id}>
                    <Link to={`/activities/${id}`}>
                        <Card className="preview-card">
                            <div className="date-card">
                                <CardMedia
                                    image={image}
                                    title="Date Image"
                                    className="thumbnails responsive-image"
                                />
                            </div>

                            <CardContent>
                                <Typography className='card-title'>{title}</Typography>
								<CardActions>
									<Button size="small" color="primary">
										The Details
									</Button>
								</CardActions>
							</CardContent>
                        </Card>
                    </Link>
                </li>

            </div>
        )
    }
}

export default DatePreview;
