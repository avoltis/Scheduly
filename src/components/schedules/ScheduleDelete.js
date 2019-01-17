import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Modal from '../Modal';
import history from '../../history';
import { fetchSchedule, deleteSchedule } from '../../actions';

class ScheduleDelete extends React.Component {

    componentDidMount() {
        this.props.fetchSchedule(this.props.match.params.id);
    }

    renderActions() {
        const id = this.props.match.params.id;
    
        return (
            //same as div, but does not show any html, keeps all element into 1 root for jsx render
            <React.Fragment>
                <button onClick={() => this.props.deleteSchedule(id)} className="ui button negative" >Delete</button>
                <Link to="/" className="ui button">Cancel</Link>
            </React.Fragment>
        );
    }

    renderContent() {
        if (!this.props.schedule) {
            return 'Are you sure you want to delete this schedule?'
        }

        const formatedDate = moment(this.props.schedule.Date).format('DD/MM/YYYY');

        return 'Are you sure want to delete the schedule: Date:' + formatedDate + '  Hours: ' + this.props.schedule.Hours
    }

    render() {
        return (
            <Modal
                title="Delete Schedule"
                content={this.renderContent()}
                actions={this.renderActions()}
                onDismiss={() => history.push('/')}
            />
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return { schedule: state.schedules[ownProps.match.params.id] }
};

export default connect(mapStateToProps, { fetchSchedule, deleteSchedule })(ScheduleDelete);