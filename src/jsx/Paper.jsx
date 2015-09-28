let React = require('react');

let Panel = require('react-bootstrap').Panel;
let Button = require('react-bootstrap').Button;
let Input = require('react-bootstrap').Input;

let Cookies = require('js-cookie');

let Question = require('./Question.jsx');

class Paper extends React.Component {

    constructor() {
        super();
        this.state = {
            selected: {},
            answered: 0,
            name: undefined,
            submitted: false
        };

        this.handleOptionChange = this.handleOptionChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
    }

    componentWillMount() {
        let saved = Cookies.get(this.props.paper._id);

        if(!saved) return;
        saved = JSON.parse(saved);

        this.setState({
            selected: saved.selected,
            answered: saved.answered,
            name: saved.name,
            submitted: saved.submitted
        });
    }

    saveState(data) {
        this.setState(data);
        Cookies.set(this.props.paper._id, this.state);
    }

    handleOptionChange(count, option) {
        if (!(count in this.state.selected))
            this.saveState({ answered: this.state.answered + 1 });

        let temp = this.state.selected;
        temp[count] = option;

        this.saveState({ selected: temp });
    }

    handleNameChange() {
        this.saveState({ name: this.refs.name.getValue() });
    }

    handleClick() {
        let data = {
            qid: this.props.paper._id,
            user: this.state.name,
            selected: this.state.selected
        };

        $.ajax({
            url: '/json/attempt',
            data: {
                content: JSON.stringify(data),
            },
            type: 'POST',
            success: (data) => {
                this.saveState({ submitted: true });
            },
            error: (err) => {
                console.error(err);
            }
        });
    }

    render() {

        let boxes = [];

        for (var i = 0; i < this.props.paper.count; i++) {

            let length = this.props.paper.defaultLength;
            if ((i + 1).toString() in this.props.paper.specialLength)
                length = this.props.paper.specialLength[i + 1];

            boxes.push(
                <Question
                    count={i + 1}
                    handleOptionChange={this.handleOptionChange}
                    key={i+1}
                    selected={this.state.selected[i+1]}
                    submitted={this.state.submitted}
                    length={length} />
            );

            if (i % 5 == 4 || i == this.props.paper.count - 1)
                boxes.push(<hr key={'hr' + i}/>);
        }

        let completed = (this.state.answered === this.props.paper.count);

        return (
            <div className='row'>

                <div className='col-md-6'>
                    <Panel
                        bsStyle='info'
                        header='Answer Sheet'>
                        {boxes}
                    </Panel>
                </div>

                <div className='col-md-6'>
                    <Panel
                        bsStyle='info'
                        header='Information'>
                        <Input
                            value={this.state.name}
                            ref='name'
                            disabled={this.state.submitted}
                            hasFeedback={true}
                            bsStyle={!this.state.name? 'error': null}
                            label='Your name:'
                            type='text'
                            placeholder='Please enter your name.'
                            onChange={this.handleNameChange}/>

                        <Button
                            disabled={!completed || !this.state.name || this.state.submitted}
                            onClick={this.handleClick} >
                            Submit
                        </Button>

                    </Panel>

                    <label>Questions answered: </label>
                    <span>
                        {this.state.answered} / {this.props.paper.count}
                        {completed? ' ... done.' : null}
                    </span>

                    {this.state.submitted?
                        <div className='alert alert-success'>Successfully submitted.</div>:
                        null
                    }
                </div>
            </div>
        );
    }
}

module.exports = Paper;
