import { useEffect } from 'react';
import { renderError } from '../components/floating-banner';

export function useAuthError() {
  useEffect(() => {
    const authError = new URL(document.location).searchParams.get('authError');
    if (authError === '') {
      renderError('获取用户信息失败..');
      window.history.pushState(null, null, '/');
    }
  }, []);
}
