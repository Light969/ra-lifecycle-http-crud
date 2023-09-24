import './NewNote.css';
import React from 'react'

class NewNote extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <div id={this.props.id} className="note">Note
                <div className="note-message">
                        <div className="note-text">{this.props.message}
                        <div className="note-remove" onClick={(id) => this.props.removeMessage(this.props.id)}>&#10060;
                      </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewNote