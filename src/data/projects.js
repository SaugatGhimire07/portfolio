import quizCraftImage from "../assets/02.jpg";
import maplyticsImage from "../assets/03.jpg";
import spotifyProfileImage from "../assets/04.jpg";
import debunkerImage from "../assets/05.jpg";
import nostalgiaRadioImage from "../assets/6.jpeg";

// Single source of truth for all projects. ProjectsSection shows the first
// 4 entries as featured cards; ProjectArchive lists every entry in a table.
export const projects = [
  {
    title: "Nostalgia Radio",
    year: 2025,
    madeAt: "Personal Project",
    description:
      "A nostalgic Nepali music radio web app that blends cinematic visuals, a custom music player, and Nepal-inspired design to recreate the feeling of old Kathmandu streets and classic Nepali melodies.",
    link: "https://nostalgia-radio-alpha.vercel.app/",
    image: nostalgiaRadioImage,
    imageAlt: "Nostalgia Radio application",
    technologies: ["Next.js", "React", "TypeScript", "CSS", "YouTube API"],
  },
  {
    title: "Quiz Craft",
    year: 2025,
    madeAt: "Lambton College",
    description:
      "Interactive quiz platform for educators, teachers, and students to create, manage, and participate in quizzes. It offers real-time engagement, analytics, and personalized feedback to enhance learning.",
    link: "https://github.com/SaugatGhimire07/quiz-craft",
    image: quizCraftImage,
    imageAlt: "Quiz Craft",
    technologies: ["React", "Express", "Socket.IO", "Node", "MongoDB"],
  },
  {
    title: "Maplytics",
    year: 2026,
    madeAt: "Personal Project",
    description:
      "Business intelligence service that analyzes Google Maps reviews to uncover competitive insights, customer sentiment, and market trends. It helps businesses identify strengths, weaknesses, and opportunities to stay ahead in their industry.",
    link: null,
    image: maplyticsImage,
    imageAlt: "Maplytics business intelligence service",
    technologies: ["React", "Node.js", "MongoDB"],
  },
  {
    title: "Spotify Profile",
    year: 2025,
    madeAt: "Personal Project",
    description:
      "Web app for visualizing personalized Spotify data. View your top artists, top tracks, recently played tracks, and detailed audio information about each track. Create and save new playlists of recommended tracks based on your existing playlists and more.",
    link: "https://spotify.saugat.dev/",
    image: spotifyProfileImage,
    imageAlt: "Spotify Profile application",
    technologies: ["React", "Express", "Spotify API", "Renderer"],
  },
  {
    title: "Next Academy",
    year: 2025,
    madeAt: "Lambton College",
    description:
      "eLearning platform designed to equip learners with in-demand technical skills in coding, cybersecurity, DevOps, and more.",
    link: null,
    image: null,
    imageAlt: "Next Academy eLearning platform",
    technologies: ["Java"],
  },
  {
    title: "Fake News Debunker",
    year: 2026,
    madeAt: "Personal Project",
    description:
      "Fact-checking tool that retrieves supporting evidence for a claim and shows its reasoning, rather than guessing based on writing style. Uses a retrieval pipeline with a stance-classification model to verify claims against sourced evidence.",
    link: "https://fake-news-debunker-h8byas7dbwzxnm6wy2rtl7.streamlit.app/",
    image: debunkerImage,
    imageAlt: "Fake News Debunker",
    technologies: ["Python", "scikit-learn", "Hugging Face Transformers", "pandas"],
  },
  {
    title: "Health Monitoring System",
    year: 2021,
    madeAt: "London Metropolitan University",
    description:
      "Laravel-based system that collects sensor data and presents dashboards and notifications for events like falls, abnormal heartbeats, and temperature rises.",
    link: "https://github.com/SaugatGhimire07/Health-monitoring-system",
    image: null,
    imageAlt: null,
    technologies: ["Laravel", "PHP", "MySQL", "JavaScript"],
  },
  {
    title: "Movie Recommendation System",
    year: 2021,
    madeAt: "London Metropolitan University",
    description:
      "Recommends movies using both content-based filtering (genre and tag similarity) and collaborative filtering (user rating patterns), with cosine similarity as the core matching method.",
    link: "https://github.com/SaugatGhimire07/movie-recommendation-system",
    image: null,
    imageAlt: null,
    technologies: ["Python", "pandas", "NumPy", "scikit-learn"],
  },
];

// Newest first. ProjectsSection and ProjectArchive both read from this so
// they stay in sync; edit `projects` above to add/update entries.
export const projectsByYear = [...projects].sort(
  (a, b) => (b.year ?? -Infinity) - (a.year ?? -Infinity)
);
