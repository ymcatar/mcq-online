let React = require('react');

let Panel = require('react-bootstrap').Panel;
let ListGroup = require('react-bootstrap').ListGroup;
let ListGroupItem = require('react-bootstrap').ListGroupItem;

class Selector extends React.Component {

    constructor() {
        super();
        this.state = {
            papers: [],
            loaded: false
        };

        this.loadPapers = this.loadPapers.bind(this);
    }

    loadPapers() {
        $.ajax({
            url: '/json/paper',
            dataType: 'json',
            success: (data) => {
                this.setState({
                    papers: data,
                    loaded: true
                });
            }
        });
    }

    componentDidMount() {
        this.loadPapers();
    }

    render() {

        if(this.state.loaded) {
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
        } else {
            return(
                <span className='fa fa-2x fa-spin fa-spinner' />
            );
        }
    }
}

module.exports = Selector;
