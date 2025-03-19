import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsTreeMap from "highcharts/modules/treemap";

try {
  HighchartsTreeMap(Highcharts);
} catch (e) {}

export default function TreeMapChart() {
  const options: Highcharts.Options = {
    chart: {
      type: "treemap",
      backgroundColor: "transparent",
    },
    credits: {
      enabled: false,
    },
    title: {
      text: undefined,
    },
    series: [
      {
        type: "treemap",
        data: [
          {
            name: "A",
            value: 6,
          },
          {
            name: "B",
            value: 6,
          },
          {
            name: "C",
            value: 4,
          },
          {
            name: "D",
            value: 3,
          },
          {
            name: "E",
            value: 2,
          },
          {
            name: "F",
            value: 2,
          },
          {
            name: "G",
            value: 1,
          },
        ],
      },
    ],
  };
  return <HighchartsReact highcharts={Highcharts} options={options} />;
}
