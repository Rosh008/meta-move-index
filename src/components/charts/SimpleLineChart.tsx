import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export default function SimpleLineChart() {
  const options: Highcharts.Options = {
    chart: {
      type: "line",
      backgroundColor: "transparent",
      height: 30,
      width: null,
      margin: [2, 0, 2, 0],
    },
    title: {
      text: undefined,
    },
    xAxis: {
      type: "datetime",
      visible: false,
    },
    yAxis: {
      visible: false,
    },
    legend: {
      enabled: false,
    },
    series: [
      {
        type: "line",
        data: [
          [1741716000000, 41016389.55748458],
          [1741737600000, 40536900.777984194],
          [1741759200000, 23681356.97378186],
          [1741780800000, 20411266.225375954],
          [1741802400000, 42186352.34908887],
          [1741824000000, 30750930.551339038],
          [1741867200000, 27537611.87208341],
          [1741888800000, 35162904.997493744],
          [1741910400000, 27488541.766678784],
          [1741932000000, 19573870.606659632],
          [1741953600000, 22986143.011048567],
          [1741975200000, 43137667.51957469],
          [1741996800000, 36360085.9731568],
          [1742018400000, 20254020.77777294],
          [1742040000000, 22783363.710495166],
          [1742061600000, 25596739.506376944],
          [1742083200000, 25529504.681917753],
          [1742104800000, 23238359.616941765],
          [1742126400000, 40855206.332764186],
          [1742148000000, 44703984.29067427],
          [1742169600000, 28883801.014060378],
          [1742191200000, 25831785.82163773],
          [1742212800000, 30053990.819360826],
          [1742234400000, 38269783.25854846],
          [1742256000000, 35169947.44920706],
          [1742277600000, 27998195.609309882],
          [1742299200000, 27576093.854544412],
        ],
        color: "#D54F34",
        marker: {
          enabled: false,
        },
        zIndex: 2,
      },
    ],
    credits: {
      enabled: false,
    },
    tooltip: {
      enabled: true,
      backgroundColor: "#171717",
      borderWidth: 0,
      shadow: false,
      style: {
        color: "white",
      },
      outside: true,
    },
  };
  return <HighchartsReact highcharts={Highcharts} options={options} />;
}
