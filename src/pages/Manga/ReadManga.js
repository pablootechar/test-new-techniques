import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loading } from "../../shared/components";
import DatabaseApi from "../../shared/DatabaseApi";
import styled from "styled-components";

const MangaPage = styled.img`
  max-width: 90%;
  margin: 1px 5%;
`;

export const ReadChapterOfManga = () => {
  const [allPages, setAllPages] = useState();
  const { name: MangaId, chapterNum } = useParams();

  useEffect(() => {
    async function request() {
      const chapter = await DatabaseApi.getPages(MangaId, chapterNum);

      setAllPages(chapter);
    }

    request();
  }, []);

  return (
    <div>
      {typeof allPages !== "undefined" ? (
        <ul>
          {allPages.map((page) => {
            return (
              <li key={page.idpag}>
                <MangaPage
                  src={page.mangapag}
                  alt={`Page ${page.idpag} of ${MangaId}`}
                />
              </li>
            );
          })}
        </ul>
      ) : (
        <Loading />
      )}
    </div>
  );
};
