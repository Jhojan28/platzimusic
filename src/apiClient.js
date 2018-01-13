const API_KEY = '75511c14df9ed6fea661b8982a0148ff'
async function getArtist(){
    try{
        const URL = `https://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=spain&api_key=${API_KEY}&format=json`
        const res = await fetch(URL)
        const data = await res.json()
        const artists = data.topartists.artist
        return artists.map(artist=>{
            return {
                id: artist.mbid,
                name: artist.name,
                image: artist.image[3]['#text'],
                likes: 200,
                comments: 140
            }
        })
    }catch(err){
        handleError(err)
    }
}

function handleError(err){
    console.log('error obteniendo el API: '+err.message)
}

export {
    getArtist
}