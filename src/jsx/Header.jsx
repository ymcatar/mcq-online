let React = require('react');

let PageHeader = require('react-bootstrap').PageHeader;

class Header extends React.Component {
    render() {
        return(
            <PageHeader className='page-header'>
                Multiple Choice
                <small>
                    {this.props.title}
                </small>
            </PageHeader>
        );
    }
}

module.exports = Header;
