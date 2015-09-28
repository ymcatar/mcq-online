let React = require('react');

let Input = require('react-bootstrap').Input;

class Question extends React.Component {

    render() {

        let options = [];
        let alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

        if(this.props.length > 8)
            throw('Error in option length!');

        for(var i = 0; i < this.props.length; i++) {
            options.push(
                <div
                    className='page-option'
                    key={i} >
                    <Input
                        type='radio'
                        name={this.props.count + '_group'}
                        checked={this.props.selected === i}
                        disabled={this.props.submitted}
                        label={alphabet[i]}
                        onChange={this.props.handleOptionChange.bind(this, this.props.count, i)}
                    />
                </div>
            );
        }

        return (
            <div className='page-options'>
                <label>{this.props.count}.</label>
                {options}
            </div>
        );
    }
}
module.exports = Question;
