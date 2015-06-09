var HrmSessionButton = React.createClass({
  drawDataVisualization: function() {
      /* implementation heavily influenced by http://bl.ocks.org/1166403 */

    // define dimensions of graph
    var m = [80, 80, 80, 80]; // margins
    var w = 1000 - m[1] - m[3]; // width
    var h = 400 - m[0] - m[2]; // height

    var zone1Min = this.props.zone_one_min;
    var zone1Max = this.props.zone_one_max;

    // Simple data array, from first heart rate till last heart rate during the time period. This data was extracted using the php file
    // var data = this.state.hrm_data_points;
    var bpmData = [];
    var durationData = [];
    this.state.hrm_data_points.map(function(data_point){
      bpmData.push(data_point.bpm);
      durationData.push(data_point.duration);
    });

    // debugger;
    var padding = 50;

    // X scale will fit all values from data[] within pixels 0-w
    var x = d3.scale.linear().domain([0, bpmData.length]).range([0, w]);

    // Y scale will fit values from 0-10 within pixels h-0 (Note the inverted domain for the y-scale: bigger is up!)
    // automatically determining max range can work something like this
    var y = d3.scale.linear().domain([d3.min(bpmData), d3.max(bpmData)]).range([h, 0]);

    // create a line function that can convert bpmData[] into x and y points
    var line = d3.svg.line()
    // assign the X function to plot our line as we wish
    .x(function(d,i) {
      return x(i);
    })
    .y(function(d) {
      return y(d);
    })

    // Add an SVG element with the desired dimensions and margin.
    var graph = d3.select("#graph").append("svg:svg")
                  .attr("width", w + m[1] + m[3])
                  .attr("height", h + m[0] + m[2])
                  .append("svg:g")
                  .attr("transform", "translate(" + m[3] + "," + m[0] + ")");

    // create left yAxis
    var yAxisLeft = d3.svg.axis().scale(y).ticks(4).orient("left");
    // Add the y-axis to the left
    graph.append("svg:g")
         .attr("class", "y axis")
         .attr("transform", "translate(-25,0)")
         .call(yAxisLeft);

    var xAxisBottom = d3.svg.axis().scale(x).ticks(16).orient("bottom");
    //    .tickFormat(format);
    //    .ticks(d3.time.days, 1);

    graph.append("svg:g")
         .attr("class", "x axis")
         .attr("transform", "translate(0," + (h) + ")")
         .call(xAxisBottom)
         .append("text")
         .attr("x", w / 2)
         .attr("y", 50)
         .style("text-anchor", "middle")
         .text(this.props.session_duration + " minutes" + " | " + bpmData.length + " total sessions" );


    // Add the line by appending an svg:path element with the bpmData line we created above
    // do this AFTER the axes above so that the line is above the tick-lines
    graph.append("svg:path").attr("d", line(bpmData));

  },
  getInitialState: function() {
    return {hrm_data_points: [], total_time: "", loading: false};
  },
  componentDidMount: function() {
    user_id = document.location.href.split('/').pop(-1);
  },
  handleClick: function() {
    session_id = this.props.session_id;
    this.getAllHrmSessions();
    this.setState({loading: true});
  },
  getAllHrmSessions: function() {
    that = this;

    $.ajax({
      url: "http://localhost:3000/users/"+user_id+"/hrm_sessions/"+session_id+".json",
      dataType: 'json',
      success: function(hrm_sessions) {
        this.setState({hrm_data_points: hrm_sessions.hrm_session.hrm_data_points});
        console.log(hrm_sessions.hrm_session.hrm_data_points);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(xhr, status, err.toString());
      }.bind(this)
    }).done(function() {
      that.drawDataVisualization();
      that.setState({loading:false});
    });

  },
  render: function() {
    return (
      <div>
      <div id="loader" className={this.state.loading? "is-loading" : ""}><h1>Loading...</h1></div>
      <div id="graph" className="aGraph"></div>
        <button onClick={this.handleClick}>DataPonts</button>
      </div>
    );
  }
});


