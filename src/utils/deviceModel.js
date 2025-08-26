export const getDeviceModel = () => {
    const userAgent = navigator.userAgent;
    const platform = navigator.platform;
  
    return `${platform} - ${userAgent}`;
  };