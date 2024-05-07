// @ts-nocheck

export default class ApexChart extends React.Component {
  constructor(props: any) {
    super(props)

    this.state = {
      series: [44, 55, 41, 17, 15],
      options: {
        chart: {
          width: 380,
          type: 'donut',
        },
        plotOptions: {
          pie: {
            startAngle: -90,
            endAngle: 270,
          },
        },
        dataLabels: {
          enabled: false,
        },
        fill: {
          type: 'gradient',
        },
        legend: {
          formatter: function (val: any, opts: any) {
            return val + ' - ' + opts.w.globals.series[opts.seriesIndex]
          },
        },
        title: {
          text: 'Gradient Donut with custom Start-angle',
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: 'bottom',
              },
            },
          },
        ],
      },
    }
  }

  render() {
    return (
      <div>
        <div id="chart">
          <ReactApexChart
            options={this.state.options}
            series={this.state.series}
            type="donut"
            width={380}
          />
        </div>
        <div id="html-dist"></div>
      </div>
    )
  }
}
