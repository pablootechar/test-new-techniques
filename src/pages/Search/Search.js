import React, { useState, useEffect, memo } from "react";
import Api from "../../shared/Api";
import { Loading } from "../../shared/components";
import { useNavigate } from "react-router-dom";

// Custom hook for fetching data
const useFetch = (query) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (query) {
            setLoading(true);
            Api.search(query, 20)
                .then((response) => {
                    setData(response);
                    setLoading(false);
                })
                .catch((error) => {
                    setError(error);
                    setLoading(false);
                });
        }
    }, [query]);

    return { data, loading, error };
};

// Custom component for rendering each item
const ResultItem = memo(({ infoCard, redirectPage }) => {
    return (
        <div
            key={infoCard.attributes.id}
            className="animeHome__slidesPadrao__item"
        >
            <div
                className="animeHome__slidesPadrao__box"
                onClick={() =>
                    redirectPage(infoCard?.id, infoCard.attributes.slug, infoCard.attributes.canonicalTitle)
                }
            >
                <div className="animeHome__slidesPadrao__slide-img">
                    <img
                        src={infoCard.attributes?.posterImage.small}
                        alt={infoCard.attributes?.canonicalTitle}
                        draggable="false"
                    />
                </div>
            </div>
        </div>
    );
});

export const SearchPage = () => {
    const patternTextSearch = localStorage.getItem("@animatrix/text_search");

    const navigate = useNavigate();

    // Use the custom hook for debouncing

    // Use the custom hook for fetching data
    const { data: dataToBeRendering, loading } = useFetch(patternTextSearch);

    const redirectPage = async (animeId, animeSlug, animeName) => {

        await Api.getIdInGogoAnimeApi(animeName, 0)
                .then((response) => {
                    const theRealAnimeSlug = response?.results[0].id;
                    navigate(`/anime-page/${animeId}/${theRealAnimeSlug}/`);
                })
                .catch((error) => {
                    console.log(error)
                });
    };

    return (
        <div>
            <div className="grid-container-search">
                {loading ? (
                    <Loading />
                ) : Array.isArray(dataToBeRendering) ? (
                    dataToBeRendering.map((infoCard) => (
                        // Use the custom component for rendering each item
                        <ResultItem
                            key={infoCard.id}
                            infoCard={infoCard}
                            redirectPage={redirectPage}
                        />
                    ))
                ) : null}
            </div>
        </div>
    );
};