// Credit line for a photo from the API ({ copyright, source, link }), e.g.
// "© Siddarth Bhandary · Jetphotos.com". Photographers' credit should stay
// visible wherever their photo is shown.
const PhotoCredit = ({ photo, className = '' }) => {
  if (!photo?.copyright && !photo?.source) return null;
  return (
    <p className={`text-[11px] leading-[14px] ${className}`}>
      {photo.copyright && <>© {photo.copyright}</>}
      {photo.copyright && photo.source && ' · '}
      {photo.source &&
        (photo.link ? (
          <a href={photo.link} target='_blank' rel='noopener noreferrer' className='underline'>
            {photo.source}
          </a>
        ) : (
          photo.source
        ))}
    </p>
  );
};

// First photo with a src from an API image set
// ({ large|medium|thumbnails: [{ src, copyright, source, link }] }).
export const firstPhoto = (images, sizes = ['medium', 'large', 'thumbnails']) =>
  sizes.map((size) => images?.[size]?.[0]).find((photo) => photo?.src) ?? null;

export default PhotoCredit;
