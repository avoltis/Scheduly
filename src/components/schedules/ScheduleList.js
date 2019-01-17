import React from 'react';
import { connect } from 'react-redux';
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Link } from 'react-router-dom';
import { fetchSchedules } from '../../actions';
import moment from 'moment';

moment.locale('en-GB');

class ScheduleList extends React.Component {
    componentDidMount() {

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

    renderCalendarEvents() {
        const renderList = this.props.schedules.map(schedule => {
            
            const formatedDate = moment.utc(schedule.Date).toDate();

            const dayEvent = {
                title: schedule.Hours + " Hours",
                start: formatedDate,
                end: formatedDate,
                allDay: false
              }

            return (
                dayEvent
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
                        {this.renderCalendar()}
                        {/* {this.renderList()} */}
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


    renderCalendar() {
        const calendarEvents = this.renderCalendarEvents();

        return (
            <div>
                <div style={{ height: 500 }}>
                    <BigCalendar
                        events={calendarEvents}
                        views={['month','week','day']}
                        step={60}
                        showMultiDayTimes
                        defaultDate={new Date()}
                        localizer={BigCalendar.momentLocalizer(moment)}
                    />
                </div>
            </div>
        );
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