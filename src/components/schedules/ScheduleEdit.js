import React from 'react';
import Loader from 'react-loader';
import { connect } from 'react-redux';
import { fetchSchedule, editSchedule } from '../../actions';
import ScheduleForm from './ScheduleForm';

class ScheduleEdit extends React.Component {
  state = { loaded: true };

  componentDidMount() {
    this.props.fetchSchedule(this.props.match.params.id);
  }

  onSubmit = async formValues => {
    this.setState({ loaded: false });
    await this.props.editSchedule(this.props.match.params.id, formValues);
    this.setState({ loaded: true });
  };

  render() {
    if (!this.props.schedule) {
      return <div>Loading ..</div>;
    }
    return (
      <div>
        <Loader loaded={this.state.loaded}>
          <h3>Edit a Schedule</h3>
          <ScheduleForm
            initialValues={{
              Date: this.props.schedule.Date,
              Hours: this.props.schedule.Hours
            }}
            onSubmit={this.onSubmit}
          />
        </Loader>
      </div>
    );
  }
}

const mapStatetoProps = (state, onwProps) => {
  return { schedule: state.schedules[onwProps.match.params.id] };
};

export default connect(
  mapStatetoProps,
  { fetchSchedule, editSchedule }
)(ScheduleEdit);
