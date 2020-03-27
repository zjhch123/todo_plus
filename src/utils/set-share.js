export const shareWelcome = () => {
  window.wxShare.setShareData({
    title: '我们想和你打个赌，一年为期，你敢吗？',
    desc: '你嘲笑每一年的新年计划就是复制上一年未完成的计划。不服？ 那我们打一个赌呗！',
    link: window.location.href,
  });
};

export const shareCard = ({ _id: id, nickname }) => {
  const origin = new URL(window.location.origin);
  origin.searchParams.append('id', id);

  window.wxShare.setShareData({
    title: `这是${nickname}的赌约，你敢赌吗？`,
    desc: '你每天都有新的想法，却总有借口不去开始。',
    link: origin.toString(),
  });
};
