import { styled } from "styled-components";

const Card = styled.div`
  display: flex;
  flex-direction: row;
  height: 100px;
  margin-bottom: 20px;
  background: rgba(61, 61, 61, 0.15);
  padding: 10px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.representativeColor};
  width: 100%;
`;

const CardDescription = styled.div`
  margin-left: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CardImage = styled.img`
  border-radius: 10px;
  max-width: 33%;
`;

const DescriptionTitle = styled.h1`
  font-size: 20px;
  font-weight: bold;
  font-style: normal;
  text-decoration: none !important;
  outline: none;
  color: #f5f5f5;
`;

const DescriptionSynopsis = styled.p`
  font-style: normal;
  text-decoration: none !important;
  outline: none;
  color: #f5f5f5;
  cursor: pointer;
`;

export const AnimeOrMangaCard = ({
  imgUrl,
  title,
  description = "",
}) => {

  return (
      <Card>
        <CardImage src={imgUrl} alt={title} />
        <CardDescription>
          <DescriptionTitle>{title}</DescriptionTitle>
          <DescriptionSynopsis>{description}</DescriptionSynopsis>
        </CardDescription>
      </Card>
  );
};
