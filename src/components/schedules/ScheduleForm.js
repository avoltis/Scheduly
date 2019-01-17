import React from 'react';
import { Field, reduxForm } from 'redux-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

class ScheduleForm extends React.Component {

    renderError({ error, touched }) {
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            )
        }
    }

    renderInput = ({ input, label, meta }) => {
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`

        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete="off" />
                {this.renderError(meta)}
            </div>
        )
    }

    renderDatePicker = ({ input, label, meta }) => {

        const className = `field ${meta.error && meta.touched ? 'error' : ''}`

        return (
            <div className={className}>
                <label>{label}</label>
                <DatePicker
                    selected={input.value || null}
                    onChange={input.onChange}
                    dateFormat='DD/MM/YYYY'
                />
                {this.renderError(meta)}
            </div>
        )
    }

    onSubmit = (formValues) => {
        this.props.onSubmit(formValues);
    }

    render() {
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                <Field
                    name="Date"
                    component={this.renderDatePicker}
                    label="Enter Date"
                    format={(value, name) => value === '' ? null : (typeof value === 'string') ? new Date(value) : value}
                />
                <Field name="Hours" component={this.renderInput} label="Enter Hours" />
                <button className="ui button primary">Submit</button>
            </form>
        )
    }
}

const validate = (formValues) => {
    const errors = {};

    if (!formValues.Hours) {
        errors.Hours = 'You must enter hours';
    }

    if (!formValues.Date) {
        errors.Date = 'You must enter a date';
    }
    return errors;
}

export default reduxForm({
    form: 'scheduleForm',
    initialValues: {
        Date: new Date(),
    },
    validate
})(ScheduleForm);
