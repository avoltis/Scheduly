import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Loader from 'react-loader';
import Modal from '../Modal';
import history from '../../history';
import { fetchSchedule, deleteSchedule } from '../../actions';

class ScheduleDelete extends React.Component {
    state = { loaded: true }

    componentDidMount() {
        this.props.fetchSchedule(this.props.match.params.id);
    }

    deleteSchedule = async () => {
        this.setState({ loaded: false });

        const id = this.props.match.params.id;
        await this.props.deleteSchedule(id);

        this.setState({ loaded: true });
    }

    renderActions() {

        return (
            //same as div, but does not show any html, keeps all element into 1 root for jsx render
            <React.Fragment>
                <button onClick={() => this.deleteSchedule()} className="ui button negative" >Delete</button>
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
            <Loader loaded={this.state.loaded}>
                <Modal
                    title="Delete Schedule"
                    content={this.renderContent()}
                    actions={this.renderActions()}
                    onDismiss={() => history.push('/')}
                />
            </Loader>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return { schedule: state.schedules[ownProps.match.params.id] }
};

export default connect(mapStateToProps, { fetchSchedule, deleteSchedule })(ScheduleDelete);