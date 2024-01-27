import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: []
    };
    this.API_URL = "http://localhost:5072/";
  }

  componentDidMount() {
    this.refreshNotes();
  }

  async refreshNotes() {
    try {
      const response = await fetch(this.API_URL + "api/todoapp/GetNotes");
      const data = await response.json();
      // Assuming data is an array
      this.setState({ notes: data });
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  }

  async addClick() {
    var newNotes = document.getElementById("newNotes").value;
    const data = new FormData();
    data.append("newNotes", newNotes);

    fetch(this.API_URL + "api/todoapp/AddNotes", {
      method: "POST",
      body: data
    }).then(res => res.json())
      .then((result) => {
        alert(result);
        this.refreshNotes();
      })
  }

  async deleteClick(id) {
    fetch(this.API_URL + "api/todoapp/DeleteNotes?id=" + id, {
      method: "DELETE",
    }).then(res => res.json())
      .then((result) => {
        alert(result);
        this.refreshNotes();
      })
  }

  render() {
    const { notes } = this.state;
    return (
      <div className="App">
        <h2 className="title">To Do App</h2>
        <div className="input-container">
          <input id="newNotes" className="input-field" />&nbsp;
          <button onClick={() => this.addClick()} className="add-button">Add Notes</button>
        </div>
        {notes.map(note =>
          <p key={note.id} className="note">
            <span className="note-description">{note.description}</span>
            <button onClick={() => this.deleteClick(note.id)} className="delete-button">Delete Notes</button>
          </p>
        )}
      </div>
    );
  }
}

export default App;
