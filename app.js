const express = require('express');
const app = express();
const route = require('./router/route');
const ipl = require('./ipl/iplroute');

const Highcharts = require('highcharts');

app.use(express.static('./static'));
app.use('/', route);
app.use('/ipl', ipl);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'hbs');

app.post('/ans', (req, res) => {
  let { name, value } = req.body;
  console.log(name);
  console.log(value);
});

app.use((err, req, res, next) => {
  res.status(500).redirect('/');
});

app.listen(3000, () => {
  console.log('connect');
});

const data = express();

data.get('/extras', (req, res) => {
  fetch('http://localhost:3000/ipl/Extras2016')
    .then((data) => {
      return data.json();
    })
    .then((jsonData) => {
      const chartData = {
        chart: {
          type: 'column',
        },
        title: {
          text: 'EXTRA CONSIDERED IN EACH SEASON',
        },
        xAxis: {
          categories: jsonData.map((item) => item.bowling_team),
          title: {
            text: 'Team',
          },
        },
        yAxis: {
          min: 0,
          title: {
            text: 'extra',
          },
        },
        series: [
          {
            name: 'extras',
            data: jsonData.map((item) => parseInt(item.extra)),
          },
        ],
      };

      res.render('index', { chartData: JSON.stringify(chartData) });
    });
});

data.get('/wontoss', (req, res) => {
  fetch('http://localhost:3000/ipl//wontoss')
    .then((data) => {
      return data.json();
    })
    .then((jsonData) => {
      const chartData = {
        chart: {
          type: 'column',
        },
        title: {
          text: 'NUMBER OF TIMES TEAM WON MATCH AND TOSS',
        },
        xAxis: {
          categories: jsonData.map((item) => item.winner),
          title: {
            text: 'Team',
          },
        },
        yAxis: {
          min: 0,
          title: {
            text: 'times',
          },
        },
        series: [
          {
            name: 'times',
            data: jsonData.map((item) => parseInt(item.times)),
          },
        ],
      };

      res.render('index', { chartData: JSON.stringify(chartData) });
    });
});

data.get('/strikerate', (req, res) => {
  fetch('http://localhost:3000/ipl/strikerate')
    .then((data) => {
      return data.json();
    })
    .then((jsonData) => {
      const chartData = {
        chart: {
          type: 'column',
        },
        title: {
          text: 'STRIKE RATE OF BATSMAN EACH SEASON',
        },
        xAxis: {
          categories: jsonData.map((item) => item.year),
          title: {
            text: 'SEASON',
          },
        },
        yAxis: {
          min: 0,
          title: {
            text: 'STRIKE RATE',
          },
        },
        series: [
          {
            name: 'STRIKE RATE',
            data: jsonData.map((item) => parseInt(item.strike)),
          },
        ],
      };
      res.render('index', { chartData: JSON.stringify(chartData) });
    });
});
data.set('view engine', 'hbs');
data.get('/eachseason', (req, res) => {
  fetch('http://localhost:3000/ipl/eachseason')
    .then((data) => {
      return data.json();
    })
    .then((jsonData) => {
      const chartData = {
        chart: {
          type: 'column',
        },
        title: {
          text: 'MATCHES PLAYEDIN EACH SEASON OF IPL',
        },
        xAxis: {
          categories: jsonData.map((item) => item.season),
          title: {
            text: 'SEASON',
          },
        },
        yAxis: {
          min: 0,
          title: {
            text: 'COUNT',
          },
        },
        series: [
          {
            name: 'COUNT',
            data: jsonData.map((item) => parseInt(item.count)),
          },
        ],
      };

      res.render('index', { chartData: JSON.stringify(chartData) });
    });
});

data.get('/eachseason', (req, res) => {
  fetch('http://localhost:3000/ipl/eachseason')
    .then((data) => {
      return data.json();
    })
    .then((jsonData) => {
      const chartData = {
        chart: {
          type: 'bar',
        },
        title: {
          text: 'MATCHES PLAYEDIN EACH SEASON OF IPL',
        },
        xAxis: {
          categories: jsonData.map((item) => item.season),
          title: {
            text: 'SEASON',
          },
        },
        yAxis: {
          min: 0,
          title: {
            text: 'COUNT',
          },
        },
        series: [
          {
            name: 'COUNT',
            data: jsonData.map((item) => parseInt(item.count)),
          },
        ],
      };

      res.render('index', { chartData: JSON.stringify(chartData) });
    });
});

data.get('/top10', (req, res) => {
  fetch('http://localhost:3000/ipl/top10eco')
    .then((data) => data.json())
    .then((jsonData) => {
      const bowlers = [
        ...new Set(jsonData.map((item) => item.bowler)),
      ];

      const seriesData = bowlers.map((bowler) => ({
        name: bowler,
        data: jsonData.map((item) => {
          if (bowler == item.bowler) {
            return parseFloat(item.economy);
          } else {
            return 0;
          }
        }),
      }));

      const chartData = {
        chart: {
          type: 'column',
        },
        title: {
          text: 'Top 10 Economy Rates of Bowlers in IPL',
        },
        xAxis: {
          categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          title: {
            text: 'POSITION',
          },
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Economy Rate',
          },
        },
        plotOptions: {
          series: {
            stacking: 'normal',
            pointWidth: 50, // Adjust the width of the bars as needed
          },
        },
        series: seriesData,
      };
      res.render('index', { chartData: JSON.stringify(chartData) });
    });
});

data.listen(5050, () => {
  console.log('server2 connected');
});
