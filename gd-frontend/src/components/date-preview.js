import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Card, CardImg, CardText, CardBody,
  CardTitle, Button } from 'reactstrap';

class DatePreview extends Component {
    render() {
        return (
            <div className="date-preview hvr-grow-shadow">

              <li className="datePreview cell" key={this.props.id}>
                <Link to={`/activities/${this.props.id}`}>

                  <Card className="previewCard">
                    <CardImg top width='100%' src={this.props.image} alt="Date Image" className="thumbnails responsive-image" />

                    <CardBody>
                      <CardTitle className='cardTitle'>{this.props.title}</CardTitle>
                      <Link to={`/activities/${this.props.id}`}><Button color="info">The Details</Button></Link>
                    </CardBody>
                  </Card>

                </Link>
              </li>

            </div>
        );
    }
}

export default DatePreview;
