export const Steps = Object.freeze({
  Welcome: 0,
  Entrance: 1,
  Input: 2,
});

export const IsAndroid = navigator.userAgent.toLowerCase().split("android").length > 1;

export const MediaElementId = IsAndroid ? 'i_music' : 'i_video';

export const TodoContents = [
  '学会潜水，探索海底',
  '做一个爆裂鼓手',
  '逛遍京城的秘密胡同',
  '和你徒步看一场日落',
];

export const AndroidSliderResources = [
  require('../asset/images/a_1.png'),
  require('../asset/images/a_2.png'),
  require('../asset/images/a_3.png'),
  require('../asset/images/a_4.png'),
];

export const ImageDropResources = [
  { path: require('../asset/images/img1.jpg'), content: '在插花中<br />感受四季时令' },
  { path: require('../asset/images/img2.jpg'), content: '弹一首尤克里里<br />唱给你听' },
  { path: require('../asset/images/img3.jpg'), content: '动起来<br />感受汗水与心跳' },
  { path: require('../asset/images/img4.jpg'), content: '学习剑道<br />修炼武士道的精神' },
  { path: require('../asset/images/img5.jpg'), content: '学着画一幅小画' },
  { path: require('../asset/images/img6.jpg'), content: '扬起裙摆<br />跳一曲弗拉门戈' },
];
