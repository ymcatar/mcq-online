let React = require('react');

let Header = require('./Header.jsx');
let Paper = require('./Paper.jsx');
let Selector = require('./Selector.jsx');
let ViewStats = require('./ViewStats.jsx');

let $ = require('jquery-browserify');

let ReactRouter = require('react-router');
let Router = ReactRouter.Router;
let Route = ReactRouter.Route;
let Link = ReactRouter.Link;
let IndexRoute= ReactRouter.IndexRoute;

class Index extends React.Component {

    constructor() {
        super();
        this.state = {
            paper: {},
            loaded: false
        };
    }

    loadPaper() {

        $.ajax({
            url: '/json/paper/' + this.props.params.qid,
            type: 'GET',
            dataType: 'json',
            cache: false,
            success: (data) => {
                this.setState({
                    paper: data,
                    loaded: true
                });
            },
            error: (err) => {
                window.location = '#/';
            }
        });
    }

    componentDidMount() {
        this.loadPaper();
    }

    render() {
        if(this.state.loaded)
            return (
                <div className='container page-main'>
                    <Header title={this.state.paper.title}/>
                    <Paper
                        paper={this.state.paper}
                    />
                </div>
            );
        else
            return null;
    }
}

class Main extends React.Component {
    render() {
        return (
            <div className='container page-main'>
                <Header title='Select Paper' />
                <Selector />
            </div>
        );
    }
}

class Stats extends React.Component {
    render() {
        return (
            <div className='container page-main'>
                <Header title='View Stats' />
                <ViewStats qid={this.props.params.qid}/>
            </div>
        );
    }
}

React.render((
    <Router>
        <Route path='/'>
            <Route path='paper/:qid' component={Index} />
            <Route path='stats/:qid' component={Stats} />
            <Route path='*' component={Main} />
            <IndexRoute component={Main} />
        </Route>
    </Router>
), document.body);
