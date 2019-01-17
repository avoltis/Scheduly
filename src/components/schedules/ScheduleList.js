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

    renderCalendarEvents() {
        const renderList = this.props.schedules.map(schedule => {

            const formatedDate = moment.utc(schedule.Date).toDate();

            const dayEvent = {
                title: schedule.Hours + " Hours",
                start: formatedDate,
                end: formatedDate,
                allDay: false,
                id : schedule.Id
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
                        <Link to="/schedules/new" className="ui green button">
                            Insert Hours
                        </Link>
                    </div>
                    <div className="ui celled list">
                        {this.renderCalendar()}
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


    editDeleteDay({ event }) {
        return (
            <span>
                <strong>{event.title}</strong>
                <br></br>
                <Link to={'/schedules/edit/' + event.id} className="ui small blue button">Edit</Link>
                <Link to={'/schedules/delete/' + event.id} className="ui teal small button">Delete</Link>
            </span>
        )
    }

    onMonthChange() {
        // debugger;

        // this.props.schedules.foreach()

    }

    renderCalendar() {
        const calendarEvents = this.renderCalendarEvents();

        return (
            <div>
                <div style={{ height: 500 }}>
                    <BigCalendar
                        events={calendarEvents}
                        views={['month']}
                        // views={['month', 'week', 'day']}
                        step={60}
                        showMultiDayTimes
                        defaultDate={new Date()}
                        localizer={BigCalendar.momentLocalizer(moment)}
                        onNavigate={this.onMonthChange}
                        components={{
                            event: this.editDeleteDay
                        }}
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