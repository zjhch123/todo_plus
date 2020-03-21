export const Steps = Object.freeze({
  Welcome: 0,
  Entrance: 1,
});

export const IsAndroid = navigator.userAgent.toLowerCase().split("android").length > 1;

export const MediaElementId = IsAndroid ? 'i_music' : 'i_video';

export const TodoContents = [
  '学会潜水，探索海底',
  '做一个爆裂鼓手',
  '逛遍京城的秘密胡同',
  '和你徒步看一场日落',
];
