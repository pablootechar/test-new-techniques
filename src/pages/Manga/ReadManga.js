import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loading } from "../../shared/components";
import DatabaseApi from "../../shared/DatabaseApi";
import styled from "styled-components";

const MangaPage = styled.img`
  max-width: 90%;
  margin: 1px 5%;
`;

const MangaReadScreen = styled.div`
  padding-bottom: 40px;
`;

export const ReadChapterOfManga = () => {
  const [allPages, setAllPages] = useState();
  const { name: MangaId, chapterNum } = useParams();
  const nameOfManga = MangaId.replace("-", "_");

  useEffect(() => {
    async function request() {
      const chapter = await DatabaseApi.getPages(nameOfManga, chapterNum);
      setAllPages(chapter);
    }
    request();
  }, []);

  function replaceURLSnippet(imageName) {
    const imagePath = `/manga_pages/${nameOfManga}/pags/${imageName}`;

    return imagePath;
  }

  return (
    <MangaReadScreen>
      {typeof allPages !== "undefined" ? (
        <ul>
          {allPages.map((page) => {
            return (
              <li key={page.idpag}>
                <MangaPage
                  src={replaceURLSnippet(page.mangapag)}
                  alt={`Page ${page.idpag} of ${MangaId}`}
                />
              </li>
            );
          })}
        </ul>
      ) : (
        <Loading />
      )}
    </MangaReadScreen>
  );
};
