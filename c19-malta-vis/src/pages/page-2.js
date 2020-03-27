import React from "react"
import { Link } from "gatsby"

import { ResponsiveBar } from "@nivo/bar"

import Layout from "../components/layout"
import SEO from "../components/seo"
import GenderProportionPieChart from "../components/charts/gender-propotion-pie"

import cases from "../../content/cases.json"

const SecondPage = () => {
  const countByNationality = {}
  cases.forEach(({ nationality }) => {
    nationality = nationality ? nationality : "Unknown"
    nationality = nationality.toUpperCase()
    if (countByNationality[nationality]) {
      countByNationality[nationality] += 1
    } else {
      countByNationality[nationality] = 1
    }
  })
  const nationalities = Object.keys(countByNationality)

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
      <SEO title="Statistics" />
      <h1>Gender Proportion of Cases</h1>
      <div style={{ height: 300 }}>
        <GenderProportionPieChart />
      </div>
      <h1>Nationalities</h1>
      <div style={{ height: 500 }}>
        <MyResponsiveBar data={data} />
      </div>
      <Link to="/">Go back to the homepage</Link>
    </Layout>
  )
}

export default SecondPage
