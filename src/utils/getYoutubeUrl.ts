interface YoutubeItemId {
  kind: string;
  videoId?: string | null;
  playlistId?: string | null;
  channelId?: string | null;
}

export function getYoutubeUrl (item: YoutubeItemId) {
  switch (item.kind.split('#').pop()) {
  case 'video':
    return `https://youtube.com/watch?v=${item.videoId}`
  case 'playlist':
    return `https://youtube.com/playlist?list=${item.playlistId}`
  case 'channel':
    return `https://youtube.com/channel/${item.channelId}`
  default:
    return ''
  }
}
