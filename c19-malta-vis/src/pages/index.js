import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import cases from "../../content/cases.json"

const IndexPage = () => (
  <Layout>
    <SEO title="COVID-19 Malta" />
    <h1>Malta Covid-19 Data</h1>
    <p>{cases.length} Cases so far</p>
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Link to="/nationality/">Nationality</Link>
      <Link to="/gender/">Gender</Link>
    </div>
  </Layout>
)

export default IndexPage
