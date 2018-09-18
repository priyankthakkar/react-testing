import React, { Component } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';
import Note from './Note';

const cookie_key = 'NOTES';

class App extends Component {

    constructor() {
        super();
        this.state = {
            text: '',
            notes: []
        };
    }

    componentDidMount() {
        const notes = read_cookie(cookie_key);
        this.setState({ notes });
    }

    submitNote = () => {
        const { notes, text } = this.state;
        notes.push({ text });
        this.setState({ notes }, () => {
            bake_cookie(cookie_key, this.state.notes);
        });
    }

    renderNotes = () => {
        return this
                .state
                .notes
                .map((note, index) => {
                    return <Note key={index} note={note} />
                });
    }

    clearNotes = () => {
        delete_cookie(cookie_key);
        this.setState({ notes: [] });
    }
    
    render() {
        return (
            <div>
                <h2>Note to Self</h2>
                <Form inline>
                    <FormControl onChange={event => this.setState({ text: event.target.value })} />
                    {' '}
                    <Button onClick={this.submitNote}>Submit</Button>
                </Form>
                {this.renderNotes()}
                <hr />
                <Button onClick={this.clearNotes}>Clear the Notes</Button>
            </div>
        );
    }
}

export default App;