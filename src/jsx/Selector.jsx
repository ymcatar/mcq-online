let React = require('react');

let Panel = require('react-bootstrap').Panel;
let ListGroup = require('react-bootstrap').ListGroup;
let ListGroupItem = require('react-bootstrap').ListGroupItem;

class Selector extends React.Component {

    constructor() {
        super();
        this.state = {
            papers: []
        };

        this.loadPapers = this.loadPapers.bind(this);
    }

    loadPapers() {
        $.ajax({
            url: '/json/paper',
            dataType: 'json',
            success: (data) => {
                this.setState({
                    papers: data
                });
            }
        });
    }

    componentDidMount() {
        this.loadPapers();
    }

    render() {

        let papers = this.state.papers.map((item, i) => (
            <ListGroupItem
                href={'/#/paper/' + item._id}>
                {item.title}
            </ListGroupItem>
        ));

        return (
            <Panel header='Select' bsStyle='info'>
                <p>Click to select a paper.</p>
                <hr />
                <ListGroup>
                    {papers}
                </ListGroup>
            </Panel>
        );
    }
}

module.exports = Selector;
