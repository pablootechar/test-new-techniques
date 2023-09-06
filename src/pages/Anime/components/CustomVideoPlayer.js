import { backgrounds } from 'polished';
import React, { useState } from 'react';
import ReactPlayer from 'react-player';

const CustomVideoPlayer = ({adVideo, principalVideo}) => {
  const [showAd, setShowAd] = useState(true);
  const [watchedAds, setWatchedAds] = useState(0);

  const handleAdEnded = () => {
    setShowAd(false);
    setWatchedAds(watchedAds + 1);
  };

  return (
    <div className="video-player-container">
      {showAd ? (
        <div className="ad-container">
          {/* Anúncio Pré-Rolagem */}
          <ReactPlayer
            url={adVideo}
            width="100%"
            height="40%"
            onEnded={handleAdEnded}
            muted
          />
        </div>
      ) : (
        <div className="main-video-container">
          {/* Vídeo principal com anúncios Mid-Roll e Post-Roll */}
          <ReactPlayer
            url={principalVideo}
            controls
            width="100%"
            height="40%"
            progress-bar-styles={{ backgroundColor: '#a906c9' }}
            config={{
              file: {
                attributes: {
                  crossOrigin: 'anonymous',
                },
              },
            }}
            onProgress={(state) => {
                // let progress = state.loaded * 100;
                // if (progress >= 50 && watchedAds === 1) {
                //     setShowAd(true)
                // }
                // Manipular exibição de anúncios Mid-Roll aqui com base no progresso do vídeo
            }}
            onEnded={() => {
              // Exibir anúncio Post-Roll ao final do vídeo principal
              setShowAd(true)
            }}
          />
        </div>
      )}
    </div>
  );
};

export default CustomVideoPlayer;
