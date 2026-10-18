// Media manifest. Every product photo is 2:3 and lives in public/media/products as
// <id>.webp (800 x 1200) and <id>-sm.webp (400 x 600). `-1` is the full look,
// `-2` a closer crop of the same photo. tones.json holds each photo's average colour,
// shown as a placeholder while the file loads.
import tones from './tones.json'

export const imageSet = (id) => ({
  id,
  src: `/media/products/${id}.webp`,
  srcSm: `/media/products/${id}-sm.webp`,
  tone: tones[id] ?? 'var(--color-stone)',
})

export const film = {
  src: '/media/film.mp4',
  poster: '/media/products/k44-1.webp',
}
