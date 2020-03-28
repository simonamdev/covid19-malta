import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const HeaderLink = ({ to, title }) => (
  <h3 style={{ margin: 0 }}>
    <Link
      to={to}
      style={{
        color: `white`,
        textDecoration: `none`,
      }}
    >
      {title}
    </Link>
  </h3>
)

const Header = ({ siteTitle }) => (
  <header
    style={{
      background: `rebeccapurple`,
      marginBottom: `1.45rem`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: "100%",
        padding: `1.45rem 1.0875rem`,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "end",
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </h1>
      <HeaderLink to="/nationality" title="By Nationality" />
      <HeaderLink to="/gender" title="By Gender" />
      <HeaderLink to="/age" title="By Age" />
      <HeaderLink to="/data" title="Source Data" />
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
