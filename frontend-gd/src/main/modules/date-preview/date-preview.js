// React Imports
import React, {Component} from 'react';
// Globals
// Modules && General Components
import {
    Card,
    CardImg,
    CardBody,
    CardTitle,
    Button,
} from 'reactstrap';
import { Link } from 'react-router-dom';
// Component Specfic Imports
// Styles
import '../../App.scss';
// Documentation/Notes

class DatePreview extends Component {
    render() {
        const { id, title, image } = this.props;

        return (
            <div className="date-preview hvr-grow-shadow">
                <li className="datePreview cell" key={id}>
                    <Link to={`/activities/${id}`}>
                        <Card className="previewCard">
                            <div className="dateCard">
                                <CardImg 
                                    top width='100%' 
                                    src={image} 
                                    alt="Date Image" 
                                    className="thumbnails responsive-image"
                                />
                            </div>

                            <CardBody>
                                <CardTitle className='cardTitle'>{title}</CardTitle>
                                <Button color="info">The Details</Button>
                            </CardBody>
                        </Card>
                    </Link>
                </li>

            </div>
        ;
    }
}

export default DatePreview;
