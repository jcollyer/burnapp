var setDementions = function(){
  // define dimensions of graph
  m = [80, 80, 80, 80]; // margins
  w = 1000 - m[1] - m[3]; // width
  h = 400 - m[0] - m[2]; // height
  p = 50; //padding
}

var userZones = [];
var lineAnimationTime = 10000;

var setUserZones = function() {
  var zones = document.getElementsByClassName("zone");
  for(var i = 0;i < zones.length; i++) {
    userZones.push(zones[i].innerHTML);
  };
  return userZones;
};

var CountDown = React.createClass({
  render: function(){
    return <div className="timer"></div>;
  }
});

// 250 * x = 10000

var HrmSessionButton = React.createClass({

  startCountDown: function(duration) {
    that = this;
    console.log(duration)
    // debugger;
    var timer = duration, minutes, seconds;
    // var milliseconds = duration/10;
    var milliseconds = 8.5;
    var timeInterval = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        that.setState({time: minutes + ":" + seconds});
        // console.log(that.state.time);

        if (--timer < 0) {
            timer = 0;
            clearInterval(timeInterval);
        }
    },milliseconds);
  },
  drawDataVisualization: function() {
    that = this;
    var bpmData = [];
    var durationData = [];
    var sessionDuration = that.props.session_duration;



    setDementions();
    setUserZones();
    $("#lineGraph").html("");

    d3.json("http://localhost:3000/users/"+user_id+"/hrm_sessions/"+session_id+".json", function(data){
      // hide loading overlay
      that.setState({loading:false});
      //start count-down
      that.startCountDown(sessionDuration);
      //set data point object array
      data_points = data.hrm_session.hrm_data_points;

      // make arrays of session bpm and duration
      data_points.map(function(data_point){
        bpmData.push(data_point.bpm);
        durationData.push(data_point.duration);
      });

      // X scale will fit all values from data[] within pixels 0-w
      var x = d3.scale.linear().domain([0, bpmData.length]).range([0, w]);

      // Y scale will fit values from 0-10 within pixels h-0 (Note the inverted domain for the y-scale: bigger is up!)
      // automatically determining max range can work something like this
      var y = d3.scale.linear().domain([d3.min(bpmData), d3.max(bpmData)]).range([h, 0]);

      // create a line function that can convert data[] into x and y points
      var line = d3.svg.line()
      // .interpolate("cardinal") //smooth out points
      .x(function(d,i) {
        return x(i);
      })
      .y(function(d) {
        return y(d);
      })

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
           .text(sessionDuration + " minutes" + " | " + data_points.length + " total sessions" );

      // Add the line by appending an svg:path element with the data line we created above
      // do this AFTER the axes above so that the line is above the tick-lines
      var linePath = lineGraph.append("svg:path").attr("d", line(bpmData));

      var totalLength = linePath.node().getTotalLength();

      linePath.attr("stroke-dasharray", totalLength + " " + totalLength)
              .attr("stroke-dashoffset", totalLength)
              .transition()
                .duration(sessionDuration * 10)
                .ease("linear")
                .attr("stroke-dashoffset", 0);

                // 22 36:41
    });
  },
  getInitialState: function() {
    return {hrm_data_points: [], total_time: "", loading: false, time: ""};
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
        <div className="count-down">{this.state.time}</div>
        <div id="loader" className={this.state.loading? "is-loading" : ""}><h1>Loading...</h1></div>
        <div id="lineGraph" className="aGraph"></div>
        <button onClick={this.handleClick}>DataPonts</button>
      </div>
    );
  }
});


