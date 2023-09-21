import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import YouTubePlayer from "react-player/youtube";

const CustomVideoPlayer = ({ adVideo, principalVideo }) => {
  const [showAd, setShowAd] = useState(true);
  const [watchedAds, setWatchedAds] = useState(0);
  const [player, setPlayer] = useState()
  const playerRef = useRef();

  const handleAdEnded = () => {
    setShowAd(false);
    setWatchedAds(watchedAds + 1);
  };

  const handleOrientationChange = () => {
    const isLandscape =
      window.screen.availWidth > window.screen.availHeight &&
      !document.fullscreenElement;

    if (isLandscape) {
      // Se o dispositivo está em orientação paisagem, ative o modo tela cheia
      playerRef.current?.getInternalPlayer()?.requestFullscreen();
    } else {
      
    }
  };

  useEffect(() => {

    // Adicionar um ouvinte para o evento de mudança de orientação
    window.addEventListener("orientationchange", handleOrientationChange);

    return () => {
      // Limpar o ouvinte quando o componente for desmontado
      window.removeEventListener("orientationchange", handleOrientationChange);
    };
  }, []);

  return (
    <div className="video-player-container">
      {showAd ? (
        <div className="ad-container">
          {/* Anúncio Pré-Rolagem */}
          <YouTubePlayer
            url={adVideo}
            width="100%"
            height="40%"
            onEnded={handleAdEnded}
            muted
            playing
          />
        </div>
      ) : (
        <div className="main-video-container">
          {/* Vídeo principal com anúncios Mid-Roll e Post-Roll */}
          <ReactPlayer
            ref={playerRef}
            url={principalVideo}
            controls
            width="100%"
            height="40%"
            progress-bar-styles={{ backgroundColor: "#a906c9" }}
            config={{
              file: {
                attributes: {
                  crossOrigin: "anonymous",
                },
              },
            }}
            onProgress={(state) => {
              let progress = state.loaded;
              if (progress >= 50) {
              }
              // Manipular exibição de anúncios Mid-Roll aqui com base no progresso do vídeo
            }}
            onEnded={() => {
              // Exibir anúncio Post-Roll ao final do vídeo principal
              setShowAd(true);
            }}
            playing
          />
        </div>
      )}
    </div>
  );
};

export default CustomVideoPlayer;
