import { useEffect } from 'react';
import { shareWelcome, shareCard } from '../utils/set-share';
import { Steps, CardMode } from '../constants';

export function useWechatShare({
  step,
  cardMode,
  userInfo,
  cardInfo,
}) {
  useEffect(() => {
    if (step !== Steps.Card) {
      shareWelcome();
      return;
    }

    switch (cardMode) {
      case CardMode.Edit:
        shareWelcome();
        break;
      case CardMode.Show:
        userInfo ? shareCard(userInfo) : shareWelcome();
        break;
      case CardMode.Share:
        cardInfo && cardInfo.userInfo
          ? shareCard(cardInfo.userInfo)
          : shareWelcome();
        break;
      default: return;
    }
  }, [cardMode, step, cardInfo, userInfo]);
}
