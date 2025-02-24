import React, { Component } from 'react';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			tasks: []
		};
		// bind
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.renderTasks = this.renderTasks.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
	}
	// handle change
	handleChange(e) {
		this.setState({
			name: e.target.value
		});
		//console.log(e.target.value);
	}
	// handle submit
	handleSubmit(e) {
		e.preventDefault();
		axios
		  .post('/tasks', {
		    name: this.state.name	
		   }).then(response => {
			//console.log('from handle submit', response);
			     this.setState({
					 tasks: [response.data, ...this.state.tasks],
					 name: ''
				 });
		});
	}
	// render tasks
	renderTasks() {
	  return this.state.tasks.map(task => (
	    <div key={task.id} className="media">
		     <div className="media-body">
			     <div>
			       <div>{task.name} 
				      <button onClick={() => this.handleDelete(task.id)} 
				      className="btn btn-sm btn-warning float-right"
					  >
					    Delete
					  </button>
					  </div>
				 </div>
			 </div>
		</div>
	  ));
	}
	// get all the tasks from the backend
	getTasks() {
		axios.get('/tasks').then(response => this.setState({
			tasks: [...response.data.tasks]
		}));
	}
	
	componentWillMount() {
		this.getTasks();
	}
	
	// handle delete
	handleDelete(id) {
		// remove from local state
		const isNotId = task => task.id !== id;
		const updatedTasks = this.state.tasks.filter(isNotId);
		this.setState({tasks: updatedTasks});
		// make delete request to the backend
		axios.delete(`/tasks/${id}`);
	}
	
    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">React Component</div>

                            <div className="card-body">
                                <form onSubmit={this.handleSubmit}>
								  <div className="form-group">
								    <textarea 
									  onChange={this.handleChange}
									  value={this.state.name}
									  className="form-control" 
									  rows="5" 
									  maxLength="255"
									  placeholder="Create a new task"
									  required
									  />
								  </div>
								  <button className="btn btn-primary" type="submit">
									Submit
								  </button>
								</form>
								<hr />
								{this.renderTasks()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
