export const facebookReels = [
  "https://www.facebook.com/reel/1622783268783745",
  "https://www.facebook.com/reel/1529964088921173",
  "https://www.facebook.com/reel/1076405425364255",
  "https://www.facebook.com/reel/1308712487680033",
  "https://www.facebook.com/reel/27040195182280478",
  "https://www.facebook.com/reel/1945697012821238",
] as const;

export const homepageReels = [
  facebookReels[0],
  facebookReels[2],
] as const;

export function facebookEmbedUrl(url: string) {
  return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=false&width=360&t=0`;
}
