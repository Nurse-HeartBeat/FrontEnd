export function postal (zip: number) {
  const options = {
    method: 'GET',
    url: 'https://community-zippopotamus.p.rapidapi.com/us/' + zip,
    headers: {
      'X-RapidAPI-Key': '31a778f717msh94e1b9c31e9490ap173107jsn5f1a5cacc670',
      'X-RapidAPI-Host': 'community-zippopotamus.p.rapidapi.com'
    }
  }
  return options
}