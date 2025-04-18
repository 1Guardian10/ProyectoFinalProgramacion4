import { MediaDetail, Model } from "../Interface/types";

export const getGames = async (): Promise<Model[] | undefined> => {
  const accessToken = import.meta.env.VITE_REACT_ACCESSTOKEN;
  const clientId = import.meta.env.VITE_REACT_CLIENTID;
 
  try {
    const response = await fetch(
      'https://thingproxy.freeboard.io/fetch/https://api.igdb.com/v4/games',
      {
        method: "POST",
        headers: {
          "Client-ID": clientId,
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body:
          "fields name, summary, cover.image_id, first_release_date, rating; sort rating desc; limit 80;"
      }
    );

    if (!response.ok) {
      throw new Error("Error fetching games: " + response.statusText);
    }

    const data = await response.json();

    const games: Model[] = data.map((game: any) => ({
      id: game.id,
      title: game.name,
      release_date: game.first_release_date
        ? new Date(game.first_release_date * 1000).toISOString().split("T")[0]
        : "Fecha desconocida",
      summary: game.summary,
      rating: game.rating,
      img: game.cover
        ? `${game.cover.image_id}.jpg`
        : "",
    }));

    return games;
  } catch (error) {
    console.error("Error fetching games:", error);
  }
};

export const getGameById = async (gameId: string): Promise<MediaDetail | undefined> => {
  const accessToken = import.meta.env.VITE_REACT_ACCESSTOKEN;
  const clientId = import.meta.env.VITE_REACT_CLIENTID;

  try {
    const response = await fetch(
      'https://thingproxy.freeboard.io/fetch/https://api.igdb.com/v4/games',
      {
        method: "POST",
        headers: {
          "Client-ID": clientId,
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: `
          fields name, summary, cover.image_id, first_release_date, rating, genres.name, videos.video_id;
          where id = ${gameId};
        `
      }
    );

    if (!response.ok) throw new Error("Error fetching game detail");

    const [game] = await response.json(); // solo un juego

    const mediaDetail: MediaDetail = {
      id: game.id,
      title: game.name,
      overview: game.summary ?? "Sin descripción",
      poster_path: game.cover
        ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`
        : undefined,
      backdrop_path: undefined, // IGDB no tiene backdrops como películas
      rating: Math.round(game.rating ?? 0),
      category: "game",
      languages: ["en"], // No disponible en IGDB
      release_date: game.first_release_date
        ? new Date(game.first_release_date * 1000).toISOString().split("T")[0]
        : "Desconocida",
      duration: undefined, // Tampoco hay duración
      trailer_url: game.videos?.[0]?.video_id
        ? `https://www.youtube.com/watch?v=${game.videos[0].video_id}`
        : undefined,
      genres: game.genres?.map((genre: any) => genre.name) ?? []
    };

    return mediaDetail;
  } catch (error) {
    console.error("Error fetching game by ID:", error);
  }
};
