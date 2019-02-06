import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import ScheduleCreate from './schedules/ScheduleCreate';
import ScheduleEdit from './schedules/ScheduleEdit';
import ScheduleDelete from './schedules/ScheduleDelete';
import ScheduleList from './schedules/ScheduleList';
import ScheduleShow from './schedules/ScheduleShow';
import Header from './Header';
import history from '../history';

const App = () => {
  return (
    <div className="ui container">
      <Router history={history}>
        <div>
          <Header />
          <Switch>
            <Route path="/" exact component={ScheduleList} />
            <Route path="/schedules/new" exact component={ScheduleCreate} />
            <Route path="/schedules/edit/:id" exact component={ScheduleEdit} />
            <Route
              path="/schedules/delete/:id"
              exact
              component={ScheduleDelete}
            />
            <Route path="/schedules/:id" exact component={ScheduleShow} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
