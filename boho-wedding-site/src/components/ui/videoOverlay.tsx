import React, { useRef, useEffect, useState } from 'react';

type VideoOverlayProps = {
  onClose: () => void;
};

const FADE_DURATION = 500; // ms

const VideoOverlay: React.FC<VideoOverlayProps> = ({ onClose }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => console.warn('Autoplay blocked:', err));
    }

    const handleEnded = () => {
      setIsFadingOut(true);
      setTimeout(() => {
        onClose();
      }, FADE_DURATION);
    };

    video.addEventListener('ended', handleEnded);
    document.body.style.overflow = 'hidden';

    return () => {
      video.removeEventListener('ended', handleEnded);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-opacity duration-500 ${
        isFadingOut ? 'opacity-0' : 'opacity-100'
      }`}
      style={{ pointerEvents: isFadingOut ? 'none' : 'auto' }}
    >
      {/* Dark overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-70"
        aria-hidden="true"
      />

      {/* Responsive video container */}
      <div
        className="relative rounded overflow-hidden"
        style={{
          width: '90vw',
          maxWidth: '360px',
          maxHeight: '90vh',
          aspectRatio: '9 / 16',
          padding: '8px',
          boxSizing: 'content-box',
          backgroundColor: 'transparent',
        }}
      >
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full bg-black bg-opacity-60 text-white text-xl flex items-center justify-center leading-none hover:bg-black hover:bg-opacity-80 transition"
          onClick={onClose}
          aria-label="Close"
          style={{ pointerEvents: 'auto' }}
        >
          &times;
        </button>

        {/* Video */}
        <video
          ref={videoRef}
          className="w-full h-full object-cover rounded relative"
          playsInline
          muted
          controls
          style={{
            backgroundColor: 'transparent',
            display: 'block',
            position: 'relative',
            zIndex: 10,
          }}
        >
          <source src="/videos/cats.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default VideoOverlay;