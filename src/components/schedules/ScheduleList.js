import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchSchedules } from '../../actions';

class ScheduleList extends React.Component {
    componentDidMount() {
        this.props.fetchSchedules(this.props.currentUserId);
    }

    renderAdmin(schedule) {
        if (this.props.currentUserId) {
            return (
                <div className="right floated content">
                    <Link to={'/schedules/edit/' + schedule.Id} className="ui button primary">Edit</Link>
                    <Link to={'/schedules/delete/' + schedule.Id} className="ui button negative">Delete</Link>
                </div>
            );
        }
    }

    renderList() {
        return this.props.schedules.map(schedule => {
            return (
                <div className="item" key={schedule.Id}>
                    {this.renderAdmin(schedule)}
                    <i className="large middle aligned icon video" />
                    <div className="content">
                        <Link to={'/schedules/' + schedule.Id} className="header">
                            {schedule.Date}
                        </Link>
                        <div className="date">
                            {schedule.Hours}
                        </div>
                    </div>
                </div>
            );
        });
    }

    renderCreate() {
        if (this.props.isSignedIn) {
            return (
                <div style={{ textAlign: 'right' }}>
                    <Link to="/schedules/new" className="ui button primary">
                        Create schedule
                    </Link>
                </div>
            );
        }
    }

    render() {
        return (
            <div>
                <h2>Schedules</h2>
                <div className="ui celled list">
                    {this.renderList()}
                </div>
                {this.renderCreate()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        schedules: Object.values(state.schedules),
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn
    };
}

export default connect(mapStateToProps, { fetchSchedules })(ScheduleList);