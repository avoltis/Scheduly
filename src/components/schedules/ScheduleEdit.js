import React from 'react';
import { connect } from 'react-redux';
import { fetchSchedule, editSchedule } from '../../actions';
import ScheduleForm from './ScheduleForm';

class ScheduleEdit extends React.Component {

    componentDidMount() {
        this.props.fetchSchedule(this.props.match.params.id);
    }

    onSubmit = (formValues) => {
        this.props.editSchedule(this.props.match.params.id, formValues);
    };

    render() {
        if (!this.props.schedule) {
            return <div>Loading ..</div>
        }
        return (
            <div>
                <h3>Edit a Schedule</h3>
                <ScheduleForm initialValues={{ Date: this.props.schedule.Date, Hours: this.props.schedule.Hours }} onSubmit={this.onSubmit} />
            </div>
        );
    };
};

const mapStatetoProps = (state, onwProps) => {

    return { schedule: state.schedules[onwProps.match.params.id] };
};

export default connect(
    mapStatetoProps,
    { fetchSchedule, editSchedule }
)(ScheduleEdit);