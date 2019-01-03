import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchSchedules } from '../../actions';
import moment from 'moment';

class ScheduleList extends React.Component {
    componentDidMount() {
        // this.props.fetchSchedules(this.props.currentUserId);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.schedules.length === 0 && this.props.currentUserId && this.props.schedules.length === 0) {
            this.props.fetchSchedules(this.props.currentUserId);
        }
    }

    renderList() {
        const renderList = this.props.schedules.map(schedule => {
        const formatedDate = moment(schedule.Date).format('DD/MM/YYYY');

            return (
                <div className="item" key={schedule.Id}>
                    <div className="right floated content">
                        <Link to={'/schedules/edit/' + schedule.Id} className="ui button primary">Edit</Link>
                        <Link to={'/schedules/delete/' + schedule.Id} className="ui button negative">Delete</Link>
                    </div>
                    <i className="large middle aligned icon video" />
                    <div className="content">
                        <Link to={'/schedules/' + schedule.Id} className="header">
                            {formatedDate}
                        </Link>
                        <div className="date">
                            {schedule.Hours}
                        </div>
                    </div>
                </div>
            );
        });

        return renderList;
    }

    renderAdmin() {
        if (this.props.isSignedIn && this.props.currentUserId) {
            return (
                <div>
                    <div style={{ textAlign: 'right' }}>
                        <Link to="/schedules/new" className="ui button primary">
                           Insert Hours
                        </Link>
                    </div>
                    <div className="ui celled list">
                        {this.renderList()}
                    </div>
                </div>
            );
        } 
        else {
            return (
                <h3> Not logged in </h3>
            );
        }
    }

    render() {
        return (this.renderAdmin());
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