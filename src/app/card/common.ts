
export const handleExternalLinkClick = (event: any, externalUrl: string) => {
  event.preventDefault();
  if (externalUrl && externalUrl.length)
    window.top.location.href = externalUrl;
};
