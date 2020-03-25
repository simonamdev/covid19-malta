import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import Data from "../../content/output.json"

const IndexPage = () => (
  <Layout>
    <SEO title="COVID-19 Malta" />
    <h1>Malta Covid-19 Data</h1>
    <p>{Data["case_count"]} Cases so far</p>
    <Link to="/page-2/">See Statistics Here</Link>
  </Layout>
)

export default IndexPage
