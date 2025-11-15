export const useCopyUrlWithHash = () => {
  const copyToClipboard = (hash: string) => {
    const url = `${window.location.origin}${window.location.pathname}#${hash}`;
    navigator.clipboard.writeText(url);
    
    const element = document.getElementById(hash);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      window.location.hash = hash;
    }
  };

  return { copyToClipboard };
};

