import React from 'react'

export interface SqliteProps {}

const Sqlite: React.FC<SqliteProps> = () => {
  React.useEffect(() => {
    $.sqlite.open()
  }, [])

  return (
    <div className="sqlite p-md">
      <p>component sqlite is created</p>
      <button onClick={()=>{
        $.sqlite.execute('select * from settings')
      }}>get-inst</button>
    </div>
  )
}

export default Sqlite
