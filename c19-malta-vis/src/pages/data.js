import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

import pressConferences from "../../content/press_conferences.json"

const Nationality = () => {
  return (
    <Layout>
      <SEO title="Data Sources" />
      <h1>Press Conferences</h1>
      <table>
        <tr>
          <th>Number</th>
          <th>Date</th>
          <th>Link</th>
        </tr>
        {pressConferences.map(pressConference => (
          <tr>
            <td>{pressConference.number}</td>
            <td>{pressConference.date}</td>
            <td>
              <a href={pressConference.link}>PC #{pressConference.number}</a>
            </td>
          </tr>
        ))}
      </table>
    </Layout>
  )
}

export default Nationality
