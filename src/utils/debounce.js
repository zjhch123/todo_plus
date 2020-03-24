export const debounce = (func, timeout = 1000) => {
  let flag = false;

  return (...args) => {
    if (flag) { return; }
    flag = true;
    func(...args);
    setTimeout(() => {
      flag = false;
    }, timeout);
  };
};
