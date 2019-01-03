import React from 'react';
import { connect } from 'react-redux';
import { fetchSchedule } from '../../actions';

class ScheduleShow extends React.Component {

    componentDidMount() {
        const id = String(this.props.match.params.id)
        this.props.fetchSchedule(id);
    }

    componentDidUpdate() {

    }

    render() {
        if (!this.props.schedule) {
            return <div>Loading..</div>
        }

        return (
            <div>
                <h1>{this.props.schedule.Date}</h1>
                <h5>{this.props.schedule.Hours}</h5>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
   
    return { schedule: state.schedules[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchSchedule })(ScheduleShow);