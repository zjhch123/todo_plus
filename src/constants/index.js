export const Steps = Object.freeze({
  Welcome: 0,
  Entrance: 1,
});

export const IsAndroid = navigator.userAgent.toLowerCase().split("android").length > 1;

export const MediaElementId = IsAndroid ? 'i_music' : 'i_video';
