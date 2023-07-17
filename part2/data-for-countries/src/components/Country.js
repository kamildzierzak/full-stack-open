export const Country = ({ name, capital, area, languages, flag }) => {
  return (
    <>
      <h2>{name}</h2>
      <p>capital {capital}</p>
      <p>area {area}</p>
      <h3>languages</h3>
      <ul>
        {languages.map(language => {
          return <li key={language}>{language}</li>
        })}
      </ul>
      <img src={flag} alt={name + ' flag'} width="100" height="100" />
    </>
  )
}
