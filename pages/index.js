import { gql, GraphQLClient } from "graphql-request";
import Section from "../components/Section";
import Navbar from "../components/Navbar";

export const getStaticProps = async () => {
  const url = process.env.ENDPOINT;
  const client = new GraphQLClient(url, {
    headers: {
      Authorization: process.env.GRAPH_CMS_TOKEN,
    },
  });
  const query = gql`
    query {
      videos {
        createdAt
        id
        title
        description
        seen
        slug
        tags
        thumbnail {
          url
        }
        mp4 {
          url
        }
      }
    }
  `;

  const data = await client.request(query);
  const { videos } = data;
  return {
    props: {
      videos,
    },
  };
};

export default function Home({ videos }) {
  const randomVideo = videos[Math.floor(Math.random() * videos.length)];

  const filterVideos = (videos, genre) => {
    return videos.filter((video) => video.tags.includes(genre));
  };

  const unSeenVideos = (videos) => {
    return videos.filter((video) => video.seen == false || video.seen == null);
  };

  return (
    <>
      <Navbar />
      <div className="app">
        <div className="main-video">
          <img src={randomVideo.thumbnail.url} alt={randomVideo.title} />
        </div>
        <div className="video-feed">
          <Section
            genre={"Recommended for you"}
            videos={unSeenVideos(videos)}
          />
          <Section genre="Family" videos={filterVideos(videos, "family")} />
          <Section genre="Thriller" videos={filterVideos(videos, "thriller")} />
          <Section genre="Classic" videos={filterVideos(videos, "classic")} />
          <Section genre="Pixar" videos={filterVideos(videos, "pixar")} />
          <Section genre="Marvel" videos={filterVideos(videos, "marvel")} />
          <Section
            genre="Star Wars"
            videos={filterVideos(videos, "starwars")}
          />
        </div>
      </div>
    </>
  );
}
