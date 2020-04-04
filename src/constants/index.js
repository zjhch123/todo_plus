export const Steps = Object.freeze({
  Welcome: 0,
  Entrance: 1,
  Input: 2,
  Card: 3,
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

export const CardMode = Object.freeze({
  Edit: 0,
  Show: 1,
  Share: 2,
});

export const LoginURI = process.env.NODE_ENV === 'development'
  ? 'https://static.hduzplus.xyz/wxAuth?service_id=todo&redirect_uri=http%3A%2F%2F139.129.132.196%3A3333%2Fapi%2Fauth&error_uri=http://139.129.132.196:3333?error'
  : 'https://static.hduzplus.xyz/wxAuth?service_id=todo&redirect_uri=https%3A%2F%2Ftodo.hduzplus.xyz%2Fapi%2Fauth&error_uri=https%3A%2F%2Ftodo.hduzplus.xyz%3FauthError';

export const ServerURL = process.env.NODE_ENV === 'development'
  ? 'http://127.0.0.1:3000'
  : 'https://todo.hduzplus.xyz';
