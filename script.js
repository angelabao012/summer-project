// !! IMPORTANT SECURITY WARNING FOR PUBLIC WEBSITES !!
// This token is derived from your Client Secret and grants access to Spotify's API.
// NEVER expose your Client Secret or a long-lived Access Token directly in
// client-side code on a public website (like GitHub Pages).
// For this LOCAL test, we are hardcoding a *temporarily generated* token.
// This token will expire (usually in 1 hour). You'll need to re-generate it to test again later.
const SPOTIFY_ACCESS_TOKEN = "BQCw4aq71mvMRxfEEE7Hy4tbL_GNSXJCzYb76C_PemPbUccNKda4Bq5ILpd2TELJpU8dnrq1Mu3rrOb_cWj3PaR2JuIXpLI0UpKfcSeelrxH_9_unEq5UwO87CtVQ7DlKdaXN5pLhdY"; // <<< REPLACE THIS WITH YOUR CURRENT VALID TOKEN!

async function getArtistInfo(artistId) {
    try {
        // Making a request to Spotify's API to get artist details
        const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
            headers: {
                'Authorization': `Bearer ${SPOTIFY_ACCESS_TOKEN}` // Attach the access token
            }
        });

        if (!response.ok) { // Check if the request was successful
            // If not, throw an error with more details
            throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText} - Check console for Spotify API error response.`);
        }

        const data = await response.json(); // Parse the JSON response
        return data;
    } catch (error) {
        console.error("Error fetching Spotify artist info:", error);
        document.getElementById('spotify-info').innerHTML = `<p style="color: red;">Error fetching Spotify data. Check console (F12) for details. (Token might be expired or invalid).</p>`;
        return null;
    }
}

async function displaySpotifyArtist() {
    const spotifyInfoDiv = document.getElementById('spotify-info');
    const artistId = '20wkVLutqVOYrc0kxFs7rA'; // Spotify ID for the band "Queen" - a public example

    // Check if the token is still the placeholder or empty
    if (!SPOTIFY_ACCESS_TOKEN || SPOTIFY_ACCESS_TOKEN === "YOUR_GENERATED_ACCESS_TOKEN_HERE") { // Keep this check for new tokens
        spotifyInfoDiv.innerHTML = `<p style="color: red;">Error: Spotify Access Token not set or expired for local testing.</p>`;
        console.error("Spotify Access Token is missing or placeholder. Please generate one from Step 2.");
        return;
    }

    spotifyInfoDiv.innerHTML = "Fetching Spotify artist info..."; // Show loading message
    const artist = await getArtistInfo(artistId); // Call the function to get artist data

    if (artist) {
        // If data is successfully fetched, update the div with artist info
        // *** THIS IS THE CORRECTED TEMPLATE LITERAL SYNTAX ***
        spotifyInfoDiv.innerHTML = `
            <h3>${artist.name}</h3>
            <p>Followers: ${artist.followers.total.toLocaleString()}</p>
            <p>Genres: ${artist.genres.join(', ')}</p>
            <a href="${artist.external_urls.spotify}" target="_blank">Listen on Spotify</a>
            <img src="${artist.images[0].url}" alt="${artist.name}" style="width:150px; border-radius: 50%;">
        `;
    } else {
        // Handle cases where data couldn't be loaded
        spotifyInfoDiv.innerHTML = `<p style="color: red;">Could not load Spotify artist info. Please check your Access Token's validity and your browser's console (F12) for errors.</p>`;
    }
}

// Run the function when the entire page is loaded
document.addEventListener('DOMContentLoaded', displaySpotifyArtist);