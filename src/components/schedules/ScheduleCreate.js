import React from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader';
import { createSchedule } from '../../actions'
import ScheduleForm from './ScheduleForm';

class ScheduleCreate extends React.Component {
    state = { loaded: true }

    onSubmit = async (formValues) => {
        this.setState({ loaded: false });
        await this.props.createSchedule(formValues);
        this.setState({ loaded: true });
    }

    render() {
        return (
            <div>
                <Loader loaded={this.state.loaded}>
                    <h3>Create a Schedule</h3>
                    <ScheduleForm onSubmit={this.onSubmit} />
                </Loader>
            </div>
        );
    }
}

export default connect(null, { createSchedule })(ScheduleCreate);