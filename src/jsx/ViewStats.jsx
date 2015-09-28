let React = require('react');

let Panel = require('react-bootstrap').Panel;
let Table = require('react-bootstrap').Table;

class ViewStats extends React.Component {

    constructor() {
        super();
        this.state = {
            loaded: false,
            stats: {}
        };
    }

    loadStats() {

        let getStats = function(data) {
            let stats = {
                length: data.length,
                distribution: {}
            };

            data.forEach((item) => {
                for(var q in item.selected) {
                    if(!stats.distribution[q])
                        stats.distribution[q] = {
                            0: 0,
                            1: 0,
                            2: 0,
                            3: 0,
                            4: 0,
                            5: 0,
                            6: 0,
                            7: 0
                        };

                    stats.distribution[q][item.selected[q]]++;
                }
            });

            this.setState({
                stats: stats
            });

        }.bind(this);

        $.ajax({
            url: '/json/attempt/' + this.props.qid,
            dataType: 'json',
            success: (data) => {
                getStats(data);
                this.setState({ loaded: true });
            },
            error: (err) => {
                console.error(err);
            }
        });
    }

    componentDidMount() {
        this.loadStats();
    }

    render() {

        if(this.state.loaded) {

            let content = [];
            for(var i in this.state.stats.distribution) {
                let curr = this.state.stats.distribution[i];
                let option = [];
                for(var j in curr) {
                    option.push(
                        <td>
                            {curr[j] > 0? curr[j]: null}
                        </td>
                    );
                }

                content.push(
                    <tr>
                        <td><b>{i}</b></td>
                        {option}
                    </tr>
                );
            }

            return (
                <Panel header='Stats'>
                    <span>Total number of attempt: {this.state.stats.length}</span>
                    <hr />
                    <Table striped bordered hover className='page-table'>
                        <thead>
                            <th>#</th>
                            <th>A</th>
                            <th>B</th>
                            <th>C</th>
                            <th>D</th>
                            <th>E</th>
                            <th>F</th>
                            <th>G</th>
                            <th>H</th>
                        </thead>

                        <tbody>
                            {content}
                        </tbody>
                    </Table>
                </Panel>
            );
        } else
            return null;
    }
}

module.exports = ViewStats;
