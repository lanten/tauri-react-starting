import React from 'react'

const PageParams: React.FC<PageProps> = (props) => {
  const pageParams = JSON.stringify(props.params)
  const pageQuery = JSON.stringify(props.query)

  return (
    <div className="page-params flex col gap-md p-md">
      <p>url: {location.href}</p>
      <p>params: {pageParams}</p>
      <p>query: {pageQuery}</p>
    </div>
  )
}

export default PageParams
