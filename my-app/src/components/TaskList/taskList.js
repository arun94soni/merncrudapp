import React from 'react';
import axios from 'axios' ;
import Moment from 'react-moment';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { Link } from 'react-router-dom';
export default class TaskList extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            taskList:[],
            error:{}
      }
    }
    componentDidMount()
    {
        axios.defaults.headers.common["Authorization"] = localStorage.getItem('token');
        axios.get("http://localhost:9000/api/task").then(res => {
            if(res.data.success)
                this.setState({taskList:res.data.tasks});
        }).catch(error => {
            if(error.response.status && error.response.status===400)
            NotificationManager.error("Bad Request");
            else NotificationManager.error("Something Went Wrong");
            this.setState({ errors: error })
        });
    }
    render() {
        return (
            <div className="content">
                <NotificationContainer/>
                <form onSubmit={this.handleSubmit} onChange={this.handleChange} >
                    <div className="row" style={{ marginTop: 20 }}>
                        <div className="col-sm-1"></div>
                        <div className="col-sm-10">
                            <div className="card">
                                <div className="card-header text-center">Add Your Daily Task</div>
                                <div className="card-body">
                                   
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>User Name</th>
                                                <th>Email Id</th>
                                                <th>Date</th>
                                                <th>Description</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.taskList.map((data, idx)=>
                                            <tr key={data._id} >
                                                <td>{data.userId.name}</td>
                                                <td>{data.userId.email}</td>
                                                <td><Moment format="YYYY/MM/DD">{data.date}</Moment></td>
                                                <td>{data.descripition}</td>
                                                <td>
                                                    <Link className="btn btn-primary" to={"/task-detail/"+data._id}><i className="fa fa-eye" aria-hidden="true"></i></Link>
                                                </td>
                                            </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-1"></div>
                    </div>
                </form>
            </div>
        );
    }
}
