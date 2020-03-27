import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import NationalityBarChart from "../components/charts/nationalities-bar"

const Nationality = () => {
  return (
    <Layout>
      <SEO title="Statistics" />
      <h1>Cases by Nationality</h1>
      <div style={{ height: 500 }}>
        <NationalityBarChart />
      </div>
    </Layout>
  )
}

export default Nationality
