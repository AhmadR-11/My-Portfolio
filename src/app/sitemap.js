export default function sitemap() {
  const baseUrl = 'https://ahmadraza-dev.netlify.app';
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
  ];
}
