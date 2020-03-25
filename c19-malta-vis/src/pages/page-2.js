import React from "react"
import { Link } from "gatsby"

import { ResponsiveBar } from "@nivo/bar"

import Layout from "../components/layout"
import SEO from "../components/seo"

import Data from "../../content/output.json"

const SecondPage = () => {
  const countByNationality = {}
  Data["cases"].forEach(({ nationality }) => {
    nationality = nationality ? nationality : "Unknown"
    nationality = nationality.toUpperCase()
    if (countByNationality[nationality]) {
      countByNationality[nationality] += 1
    } else {
      countByNationality[nationality] = 1
    }
  })
  const nationalities = Object.keys(countByNationality)
  // const data = [
  //   {
  //     country: "AD",
  //     "hot dog": 58,
  //     "hot dogColor": "hsl(344, 70%, 50%)",
  //     burger: 5,
  //     burgerColor: "hsl(109, 70%, 50%)",
  //     sandwich: 16,
  //     sandwichColor: "hsl(213, 70%, 50%)",
  //     kebab: 49,
  //     kebabColor: "hsl(213, 70%, 50%)",
  //     fries: 82,
  //     friesColor: "hsl(56, 70%, 50%)",
  //     donut: 197,
  //     donutColor: "hsl(115, 70%, 50%)",
  //   },
  //   {
  //     country: "AE",
  //     "hot dog": 146,
  //     "hot dogColor": "hsl(89, 70%, 50%)",
  //     burger: 24,
  //     burgerColor: "hsl(155, 70%, 50%)",
  //     sandwich: 63,
  //     sandwichColor: "hsl(217, 70%, 50%)",
  //     kebab: 185,
  //     kebabColor: "hsl(155, 70%, 50%)",
  //     fries: 198,
  //     friesColor: "hsl(133, 70%, 50%)",
  //     donut: 139,
  //     donutColor: "hsl(199, 70%, 50%)",
  //   },
  //   {
  //     country: "AF",
  //     "hot dog": 126,
  //     "hot dogColor": "hsl(145, 70%, 50%)",
  //     burger: 198,
  //     burgerColor: "hsl(47, 70%, 50%)",
  //     sandwich: 11,
  //     sandwichColor: "hsl(273, 70%, 50%)",
  //     kebab: 65,
  //     kebabColor: "hsl(11, 70%, 50%)",
  //     fries: 138,
  //     friesColor: "hsl(216, 70%, 50%)",
  //     donut: 14,
  //     donutColor: "hsl(67, 70%, 50%)",
  //   },
  //   {
  //     country: "AG",
  //     "hot dog": 194,
  //     "hot dogColor": "hsl(119, 70%, 50%)",
  //     burger: 186,
  //     burgerColor: "hsl(117, 70%, 50%)",
  //     sandwich: 156,
  //     sandwichColor: "hsl(301, 70%, 50%)",
  //     kebab: 167,
  //     kebabColor: "hsl(18, 70%, 50%)",
  //     fries: 30,
  //     friesColor: "hsl(36, 70%, 50%)",
  //     donut: 113,
  //     donutColor: "hsl(353, 70%, 50%)",
  //   },
  //   {
  //     country: "AI",
  //     "hot dog": 182,
  //     "hot dogColor": "hsl(68, 70%, 50%)",
  //     burger: 155,
  //     burgerColor: "hsl(343, 70%, 50%)",
  //     sandwich: 98,
  //     sandwichColor: "hsl(288, 70%, 50%)",
  //     kebab: 136,
  //     kebabColor: "hsl(71, 70%, 50%)",
  //     fries: 38,
  //     friesColor: "hsl(180, 70%, 50%)",
  //     donut: 59,
  //     donutColor: "hsl(293, 70%, 50%)",
  //   },
  //   {
  //     country: "AL",
  //     "hot dog": 173,
  //     "hot dogColor": "hsl(239, 70%, 50%)",
  //     burger: 174,
  //     burgerColor: "hsl(148, 70%, 50%)",
  //     sandwich: 15,
  //     sandwichColor: "hsl(268, 70%, 50%)",
  //     kebab: 144,
  //     kebabColor: "hsl(51, 70%, 50%)",
  //     fries: 54,
  //     friesColor: "hsl(356, 70%, 50%)",
  //     donut: 55,
  //     donutColor: "hsl(20, 70%, 50%)",
  //   },
  //   {
  //     country: "AM",
  //     "hot dog": 135,
  //     "hot dogColor": "hsl(8, 70%, 50%)",
  //     burger: 22,
  //     burgerColor: "hsl(258, 70%, 50%)",
  //     sandwich: 168,
  //     sandwichColor: "hsl(127, 70%, 50%)",
  //     kebab: 14,
  //     kebabColor: "hsl(77, 70%, 50%)",
  //     fries: 116,
  //     friesColor: "hsl(50, 70%, 50%)",
  //     donut: 171,
  //     donutColor: "hsl(334, 70%, 50%)",
  //   },
  // ]
  // make sure parent container have a defined height when using
  // responsive component, otherwise height will be 0 and
  // no chart will be rendered.
  // website examples showcase many properties,
  // you'll often use just a few of them.

  const data = nationalities
    .map(nationality => ({
      nationality,
      count: countByNationality[nationality],
    }))
    .sort((a, b) => (a.count > b.count ? -1 : 1))

  const MyResponsiveBar = ({ data /* see data tab */ }) => (
    <ResponsiveBar
      data={data}
      keys={["count"]}
      indexBy="nationality"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      colors={{ scheme: "nivo" }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#38bcb2",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 90,
        legend: "Nationality",
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Number of People",
        legendPosition: "middle",
        legendOffset: -40,
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      animate={true}
      motionStiffness={90}
      motionDamping={15}
    />
  )
  return (
    <Layout>
      <SEO title="Page two" />
      <p>{JSON.stringify(data)}</p>
      <h1>Nationalities</h1>
      <div style={{ height: 500 }}>
        <MyResponsiveBar data={data} />
      </div>
      <Link to="/">Go back to the homepage</Link>
    </Layout>
  )
}

export default SecondPage
