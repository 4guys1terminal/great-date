// React Imports
import React, {Component} from 'react';
// Globals
// Modules && General Components
// Component Specfic Imports
import controller from '../../tools/controller'
// Styles
// Documentation/Notes

class DateComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount = () => {
        this.loadData();
    }

    loadData = () => {
        let activity;

        controller.fetchActivity(this.props.id).then((res) => {
            activity = res;

            if(!activity) {
              return;
            }

            this.setState({activity: activity});
        }).catch(e => console.log('mount catch:', e));
    }


    // Function to turn our Cost from database into a dollar sign. Adjust cost converter to scale the ratings
    createCostIcon = (cost) => {
        if(!cost) {
            return;
        }

        const costConverter = Math.round(cost * 3);
        switch (costConverter) {
            case 0:
                return "Free";
                break;
            case 1:
                return "$";
                break;
            case 2:
                return "$$";
                break;
            case 3:
                return "$$$";
                break;
            default:
                break;
        }
    }

    render() {
        const { activity } = this.state;

        if (!activity) {
            return (
                <div className="container">
                    <div className="grid">
                        <h1>Loading...</h1>
                    </div>
                </div>
            )
        }

        return (
            <div>
                <div className="date-page">

                    <div className='activityPicDiv'>
                        <img className="activityPic" src={`${activity.imageName}`} alt="date"/>
                    </div>

                    <h3>{activity.title}</h3>

                    <div className="date-information">
                        <h4>
                            <strong>Date Information</strong>
                        </h4>

                        <p>{activity.description}</p>
                        <p>Location: {activity.location}</p>
                        <p>Cost: {this.createCostIcon(activity.cost)}</p>
                    </div>
                </div>
            </div>
        );
    }
};

export default DateComponent;
