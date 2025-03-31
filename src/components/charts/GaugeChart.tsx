import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsMore from "highcharts/highcharts-more";
import SolidGauge from "highcharts/modules/solid-gauge";

// Initialize the required modules
try {
  HighchartsMore(Highcharts);
} catch (e) {}
try {
  SolidGauge(Highcharts);
} catch (e) {}

const GaugeChart = ({ value }: { value: number }) => {
  const finalValue = value === -1 ? "NAN" : value;
  const options = {
    chart: {
      type: "solidgauge",
      backgroundColor: "transparent",
      height: 200,
      width: null,
      spacing: [0, 0, 0, 0],
      margin: [0, 0, 0, 0],
    },
    title: {
      text: null,
    },
    pane: {
      startAngle: -90,
      endAngle: 90,
      center: ["50%", "70%"],
      size: "100%",
      background: {
        outerRadius: "100%",
        innerRadius: "60%",
        shape: "arc",
        borderWidth: 0,
        backgroundColor: "#E0E0E0",
      },
    },
    tooltip: { enabled: false },
    yAxis: {
      min: 0,
      max: 100,
      lineWidth: 0,
      tickPositions: [],
      stops: [
        [0.1, "#DF5353"], // Red
        [0.5, "#DDDF0D"], // Yellow
        [0.9, "#55BF3B"], // Green
      ],
    },
    plotOptions: {
      solidgauge: {
        dataLabels: {
          format: '<span style="font-size:22px">{y}%</span>',
          color: "white",
          borderWidth: 0,
          backgroundColor: "none",
        },
      },
    },
    series: [
      {
        data: [finalValue],
        innerRadius: "60%",
        radius: "100%",
      },
    ],
    credits: {
      enabled: false,
    },
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default GaugeChart;
