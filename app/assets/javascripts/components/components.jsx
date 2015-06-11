var setDementions = function(){
  // define dimensions of graph
  m = [80, 80, 80, 80]; // margins
  w = 1000 - m[1] - m[3]; // width
  h = 400 - m[0] - m[2]; // height
  p = 50; //padding
}

var userZones = [];

var setUserZones = function() {
  var zones = document.getElementsByClassName("zone");
  for(var i = 0;i < zones.length; i++) {
    userZones.push(zones[i].innerHTML);
  };
  return userZones;
};

var HrZoneChart = React.createClass({
  drawDataVisualization: function() {

    setDementions();
    setUserZones();

    // Add an SVG element with the desired dimensions and margin.
    var barGraph = d3.select("#barGraph").append("svg:svg")
                     .attr("width", w + m[1] + m[3])
                     .attr("height", h + m[0] + m[2])
                     .append("svg:g")
                     .attr("transform", "translate(" + m[3] + "," + m[0] + ")");

    var xAxis = d3.scale.linear()
                  .domain([0, d3.max(userZones)])
                  .range([0, w]);

    var yAxis = d3.scale.ordinal().domain(userZones).rangeBands([0, h]);

    // var y = d3.scale.linear().domain([d3.min(userZones), d3.max(userZones)]).range([h, 0]);

    barGraph.selectAll("rect")
            .data(userZones)
            .enter().append("rect")
            .attr("y", yAxis)
            .attr("width", xAxis)
            .attr("height", yAxis.rangeBand())
            .attr("fill", function(d) { return "rgba(0, 100, " + (d ) + ", 0.5)"});

    barGraph.selectAll("text")
            .data(userZones)
            .enter().append("text")
            .attr("x", xAxis)
            .attr("y", function(d) { return yAxis(d) + yAxis.rangeBand() / 2; })
            .attr("dx", -3) // padding-right
            .attr("dy", ".35em") // vertical-align: middle
            .attr("text-anchor", "end") // text-align: right
            .text(String);


    // // create left yAxis
    // var yAxisLeft = d3.svg.axis().scale(yAxis).orient("left");

    // barGraph.append("svg:g")
    //      .attr("class", "y axis")
    //      .attr("transform", "translate(-25,0)")
    //      .call(yAxisLeft);

  },
  componentDidMount: function() {
    this.drawDataVisualization();
  },
  render: function() {
    return <div id="barGraph" className="aGraph"></div>;
  }
});




var HrmSessionButton = React.createClass({
  drawDataVisualization: function() {
    that = this;
    var bpmData = [];
    var durationData = [];

    setDementions();
    setUserZones();

    d3.json("http://localhost:3000/users/"+user_id+"/hrm_sessions/"+session_id+".json", function(data){
      that.setState({loading:false});
      data_points = data.hrm_session.hrm_data_points;

      data_points.map(function(data_point){
        bpmData.push(data_point.bpm);
        durationData.push(data_point.duration);
      });
// debugger;
      // X scale will fit all values from data[] within pixels 0-w
      var x = d3.scale.linear().domain([0, bpmData.length]).range([0, w]);

      // Y scale will fit values from 0-10 within pixels h-0 (Note the inverted domain for the y-scale: bigger is up!)
      // automatically determining max range can work something like this
      // var y = d3.scale.linear().domain(data_points).range([h, 0]);
      var y = d3.scale.linear().domain([d3.min(bpmData), d3.max(bpmData)]).range([h, 0]);





      // create a line function that can convert data[] into x and y points
      var line = d3.svg.line()
      // .interpolate("cardinal") //smooth out points
      // assign the X function to plot our line as we wish
      .x(function(d,i) {
        // debugger;
        return x(i);
      })
      .y(function(d) {
        return y(d);
      })

      // .x(function(d) { return d.bpm; })
      // .y(function(d) { return d.duration; });
      // .interpolate("linear");




      // Add an SVG element with the desired dimensions and margin.
      var lineGraph = d3.select("#lineGraph").append("svg:svg")
                    .attr("width", w + m[1] + m[3])
                    .attr("height", h + m[0] + m[2])
                    .append("svg:g")
                    .attr("transform", "translate(" + m[3] + "," + m[0] + ")");

      // create left yAxis
      var yAxisLeft = d3.svg.axis().scale(y).ticks(6).orient("left");

      // Add the y-axis to the left
      lineGraph.append("svg:g")
           .attr("class", "y axis")
           .attr("transform", "translate(-25,0)")
           .call(yAxisLeft);

      // crate bottom xAxis
      var xAxisBottom = d3.svg.axis().scale(x).ticks(16).orient("bottom");

      // Add the x-axis to the bottom
      lineGraph.append("svg:g")
           .attr("class", "x axis")
           .attr("transform", "translate(0," + (h) + ")")
           .call(xAxisBottom)
           .append("text")
           .attr("x", w / 2)
           .attr("y", 50)
           .style("text-anchor", "middle")
           .text(that.props.session_duration + " minutes" + " | " + data_points.length + " total sessions" );


      // Add the line by appending an svg:path element with the data line we created above
      // do this AFTER the axes above so that the line is above the tick-lines
      var linePath = lineGraph.append("svg:path")
                              .attr("d", line(bpmData));

      var totalLength = linePath.node().getTotalLength();
      // debugger;

      linePath.attr("stroke-dasharray", totalLength + " " + totalLength)
              .attr("stroke-dashoffset", totalLength)
              .transition()
                .duration(2000)
                .ease("linear")
                .attr("stroke-dashoffset", 0);


    });
  },
  getInitialState: function() {
    return {hrm_data_points: [], total_time: "", loading: false};
  },
  componentDidMount: function() {
    user_id = document.location.href.split('/').pop(-1);
  },
  handleClick: function() {
    session_id = this.props.session_id;
    // this.getAllHrmSessions();
    this.drawDataVisualization();
    this.setState({loading: true});
  },
  getAllHrmSessions: function() {
    that = this;

    $.ajax({
      url: "http://localhost:3000/users/"+user_id+"/hrm_sessions/"+session_id+".json",
      dataType: 'json',
      success: function(hrm_sessions) {
        this.setState({hrm_data_points: hrm_sessions.hrm_session.hrm_data_points});
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
      <div id="lineGraph" className="aGraph"></div>
        <button onClick={this.handleClick}>DataPonts</button>
      </div>
    );
  }
});


